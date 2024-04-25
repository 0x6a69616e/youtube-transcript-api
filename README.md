# youtube-transcript-api
> A YouTube video transcript extractor based on reverse-engineered youtubetranscript.com

## Installation
```sh
$ npm install youtube-transcript-api
```

## Documentation
Import the library into your project like so. Both CJS and ESM are supported.
```js
import YouTubeTranscriptAPI from 'youtube-transcript-api';
// YouTubeTranscriptAPI.getTranscript
// YouTubeTranscriptAPI.validateID
```

### .getTranscript(*videoID*, *config*)
Gets the transcript of a YouTube video. If the provided video is inaccessible or does not have captions, an error will be thrown: **Error: transcripts disabled for that video**
- `videoID`: The YouTube video ID
- `config` (optional): Request configurations for the Axios HTTP client. See available options [here](https://axios-http.com/docs/req_config)

returns `Array`

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

### .validateID(*videoID*, *config*)
**Not of the youtubetranscript.com API. Utilizes the discontinued [video.google.com/timedtext](https://video.google.com/timedtext?lang=en-US&v=dQw4w9WgXcQ&fmt=vtt) endpoint.*

Checks if a video with the specified ID exists on YouTube. Use is recommended when it becomes necessary to differentiate between a video that does not exist and one lacking a transcript.
- `videoID`: The YouTube video ID
- `config` (optional): Request configurations for the Axios HTTP client. See available options [here](https://axios-http.com/docs/req_config)

returns `Boolean`

```js
>>> validateID('dQw4w9WgXcQ').then(console.log);

true
```
```js
>>> validateID('somenonexistentvideoid').then(console.log);

false
```