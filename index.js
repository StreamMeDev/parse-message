'use strict';
const request = require('request');
const maxRetries = 3;
const baseWaitMS = 500;

function retry (roomId, numTries, cb) {
	setTimeout(function () {
		getManifest(roomId, numTries + 1, cb);
	}, Math.pow(2, numTries) * baseWaitMS * (0.9 + Math.random() * 0.1));
}

function getManifest (roomId, numTries, cb) {
	request({
		url: `https://www.stream.me/api-web/v1/chat/room/${roomId}`,
		json: true
	}, function (err, res, body) {
		if (err) {
			if (numTries < maxRetries) {
				return retry(roomId, numTries, cb);
			}
			return cb(err);
		}
		if (res.statusCode !== 200) {
			if (numTries < maxRetries) {
				return retry(roomId, numTries, cb);
			}
			var errMessage = 'Unable to fetch parser manifest, status code: ' + res.statusCode;
			if (body && body.reasons && body.reasons[0] && body.reasons[0].message) {
				errMessage += ' reason: ' + body.reasons[0].message;
			}
			return cb(new Error(errMessage));
		}
		if (!body.parserManifests) {
			if (numTries < maxRetries) {
				return retry(roomId, numTries, cb);
			}
			return cb(new Error("Malformed response body: this parserManifest doesn't exist."));
		}
		cb(err, body.parserManifests);
	});
}

module.exports = function (roomId, cb) {
	getManifest(roomId, 0, function (err, manifest) {
		if (err) {
			return cb(err);
		}
		return cb(null, function parseMessage (msgData) {
			if (!Array.isArray(msgData)) {
				throw new Error("Could not parse message: raw Message isn't an array as expected");
			}
			// The message object we will populate
			const message = {};

			// Kick things off by parsing the top level manifest
			// TODO: Check message parser version and fetch if not available
			parseNestable(message, msgData, manifest.manifests['v2'], manifest.urlTemplates, manifest.urlTemplateTypes);

			// Create replace index
			message._index = indexReplaceableItems(message);

			// Message is now a fully hydrated object
			// and can be passed along to the stream
			return message;
		});
	});
};

// Parse a single piece of the manifest, can recurse
function parseNestable (msg, part, manifest, urlTemplates, urlTemplateTypes) {
	// Loop through the manifest keys, then based on their type
	// process the part from in the chat message.
	for (const i in manifest) {
		switch (manifest[i].type) {
			// Simple types are just assigned to their keys
			case 'int':
			case 'string':
			case 'stringArray':
			case 'intArray':
			case 'url':
				msg[i] = part[manifest[i].index];
				break;

			// urlTemplate's come in the form of `http://host.com/foo/{{n}}/{{n}}`,
			// with a corresponding vars array.  The vars are interpolated in order
			// to the bracketed n's.
			case 'urlTemplate':
				// @NOTE this is horrible code, but it works, and hopefully the comments describe it well enough
				// This line uses `part`, the chat message part, and `manifest`, the manifest section,
				// to get the template from the `urlTemplates` and process it with the vars
				// from the message part.
				// manifest[i] is the part of the manifest we are working on
				// part[manifest[i].index] is the corresponding part from the message
				// urlTemplates[part[manifest[i].index][manifest[i].nestedItems.key.index]] accesses the template specified in the message part
				// part[manifest[i].index][manifest[i].nestedItems.vars.index] accesses the variable for the template
				const _i = manifest[i].nestedItems.hasMultipleTypes.index;
				var _key = part[manifest[i].index][manifest[i].nestedItems.key.index];
				var _vars = part[manifest[i].index][manifest[i].nestedItems.vars.index];
				msg[i] = part[manifest[i].index][_i]
					? Object.keys(urlTemplateTypes[_key])
						.reduce(
							function (prev, cur) {
								prev[cur] = parseUrlTemplate(urlTemplateTypes[_key], cur, _vars);
								return prev;
							},
							{}
						)
					: parseUrlTemplate(urlTemplates, _key, _vars);
				break;

			case 'urlTemplates':
				msg[i] = [];
				for (let k1 = 0, len1 = part[manifest[i].index].length; k1 < len1; k1++) {
					const parsedUrlTemplate = parseUrlTemplate(urlTemplates, part[manifest[i].index][k1][manifest[i].nestedItems.key.index], msg[i][k1]);
					if (parsedUrlTemplate) {
						msg[i].push({
							key: part[manifest[i].index][k1][manifest[i].nestedItems.key.index],
							urlTemplate: parsedUrlTemplate
						});
					}
				}
				break;

			// A nestedObject is a complex type that we need to
			// parse from it's own level, so recurse in.  Also,
			// apparently it is nullable, so check that first.
			case 'nestedObject':
				if (!part[manifest[i].index]) {
					msg[i] = null;
				} else {
					msg[i] = {};
					parseNestable(msg[i], part[manifest[i].index], manifest[i].nestedItems, urlTemplates, urlTemplateTypes);
				}
				break;

			// A nestedArray is also complex, and it's manifest definition is
			// actually a definition of what each item in the array looks like,
			// so recurse on each item instead of the array itself.
			case 'nestedArray':
				// @TODO nestedObject is nullable, is nestedArray?
				// Haven't seen one, they just come back empty, but
				// should explore to be sure.
				msg[i] = [];
				for (let k2 = 0, len2 = part[manifest[i].index].length; k2 < len2; k2++) {
					msg[i][k2] = {};
					parseNestable(msg[i][k2], part[manifest[i].index][k2], manifest[i].nestedItems, urlTemplates, urlTemplateTypes);
				}
				break;
		}
	}
}

// Some things for use in the helper methods below
const matchNumRegexp = /{{n}}/gi;
const toReplace = [
	'mentions',
	'emoticons',
	'links',
	'tags'
];

// Matches each `{{n}}` and replaces it with the var for that index
function parseUrlTemplate (urlTemplates, templateKey, vars) {
	let matchNum = 0;
	const urlTemplate = urlTemplates[templateKey];
	if (!urlTemplate) {
		return null;
	}
	return urlTemplates[templateKey].replace(matchNumRegexp, function () {
		return vars[matchNum++];
	});
}

// Generate an index map for replicable message parts starting positions
// Takes in a parsed message object, and returns an object where
// each "replaceble part" is indexed by the character position where
// it starts
function indexReplaceableItems (message) {
	const map = {};
	toReplace.forEach(function (key) {
		if (!message[key]) {
			return;
		}
		message[key].forEach(function (replaceItem) {
			if (!replaceItem || !replaceItem.positions) {
				return;
			}
			replaceItem.positions.forEach(function (start) {
				map[start] = {
					item: replaceItem,
					type: key
				};
			});
		});
	});
	return map;
}
