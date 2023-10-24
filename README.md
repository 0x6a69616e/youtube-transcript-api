# YouTube Transcript API

A reverse engineered Node API wrapper for YouTube Transcript (youtubetranscript.com)

I built this for fun :P

## Usage/Examples

```js
const YouTubeTranscript = require('@0x6a69616e/youtube-transcript');
// YouTubeTranscript.getTranscript
// YouTubeTranscript.validateID

// alternatively..
const { getTranscript, validateID } = require('@0x6a69616e/youtube-transcript');
```

### getTranscript
To use the `getTranscript` method, you need to provide a YouTube video ID as an argument. If the video specified by the provided ID is not available or does not have captions, an error will be thrown: `Error: transcripts disabled for that video`
```js
>>> getTranscript('dQw4w9WgXcQ').then(transcript => console.log(transcript));

[
  {
    "text": "[Music]",
    "start": "0.0",
    "duration": "14.65"
  },
  {
    "text": "we're no strangers to",
    "start": "18.8",
    "duration": "7.239"
  },
  {
    "text": "love you know the rules and so do",
    "start": "21.8",
    "duration": "7.84"
  },
  {
    "text": "I I full commitments while I'm thinking",
    "start": "26.039",
    "duration": "5.201"
  },
  {
    "text": "of",
    "start": "29.64",
    "duration": "5.88"
  },
  {
    "text": "you wouldn't get this from any other guy",
    "start": "31.24",
    "duration": "8.2"
  },
  ...
]
```

### validateID
To use the `validateID` method, you need to provide a YouTube video ID as an argument. This method allows us to determine the existence of a YouTube video by returning a Boolean value.

<i>This method is not a predefined endpoint of [youtubetranscript.com](youtubetranscript.com), but it is a feature that is available within the website's functionality.</i>

```js
>>> getTranscript('dQw4w9WgXcQ').then(console.log);

true
```
```js
>>> getTranscript('somenonexistentvideoid').then(console.log);

false
```
