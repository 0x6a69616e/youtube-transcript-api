# youtube-transcript-api
> A YouTube video transcript extractor based on reverse-engineered youtubetranscript.com

## Limitations
- Subtitles are unretrievable for private videos.
- No multilanguage transcript support; extractor uses the default language of a given video.

## Installation
```sh
$ npm install youtube-transcript-api
```

## Documentation
Import the library into your project like so. Both CJS and ESM are supported.
```js
import TranscriptAPI from 'youtube-transcript-api';
// => TranscriptAPI
```

### class TranscriptAPI

#### .getTranscript(*videoID*, [*config*])
Gets the transcript of a YouTube video. If the provided video is inaccessible or does not have captions, error "transcripts disabled for that video" will be thrown.

- `videoID`: The YouTube video ID
- `config` (optional): Request configurations for the Axios HTTP client. See available options [here](https://axios-http.com/docs/req_config)

returns `Array`

```js
>>> TranscriptAPI.getTranscript('dQw4w9WgXcQ').then(console.log);

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

#### .validateID(*videoID*, [*config*])
**Utilizes the discontinued [video.google.com/timedtext](https://video.google.com/timedtext?lang=en-US&v=dQw4w9WgXcQ&fmt=vtt) endpoint.*

Checks if a video with the specified ID exists on YouTube. Use is recommended when it is necessary to differentiate between a video that does not exist and one that lacks a transcript.
- `videoID`: The YouTube video ID
- `config` (optional): Request configurations for the Axios HTTP client. See available options [here](https://axios-http.com/docs/req_config)

returns `boolean`

```js
>>> TranscriptAPI.validateID('dQw4w9WgXcQ').then(console.log);

true
```
```js
>>> TranscriptAPI.validateID('somenonexistentvideoid').then(console.log);

false
```
