# StreamMe Message Parser

Package to take a raw chat message from the StreamMe web socket and parse it into an object with
all necessary information stored.

### How to write a request to the package

To initialize it, you need a room ID, which can be created with the syntax of 
`user:${userPublicId}:room`

After that, you can set it up with something similar to below:

```
const getParser = require('@streammedev/parse-message');

getParser(roomId, function (err, parseMessage) {  
  // The data passed is a message from the web socket without the nameSpace and  ResultType
  // sliced off. See tests for example of raw message.
  const message = parseMessage(data);
  console.log(data);
});
```

The `parseMessage` function takes the raw data from a chat on StreamMe and returns an object 
similar to the one listed below.

```
{
  actor: 
   { appSlug: 'web',
     avatar: 'https://www.gravatar.com/avatar/2e62a29500a51597f78863d877f2d8d2?s=256&d=https://static1.stream.me/web/active/images/avatar-id-6.png',
     badges: [ [Object] ],
     color: '#913D88',
     role: 'owner',
     slug: 'cc1',
     userPublicID: 'a4001b62-46a4-4f12-9368-238de75af9d8',
     username: 'cc1'
    },
  emoticons: [],
  id: '1526499854203288168',
  links: [],
  mentions: [],
  message: 'Hello World!',
  originalRoom: null,
  tags: [],
  theme: null,
  timestamp: 1526499854,
  version: 'v2',
  _index: {}
}
```