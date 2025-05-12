# youtube-transcript-api
> A YouTube video transcript extractor based on a reverse-engineered [Free Youtube Transcript Generator by Tactiq.io](https://tactiq.io/tools/youtube-transcript)

**previously based on youtubetranscript.com*

## Limitations
- Subtitles are unretrievable for private videos.
- ~~No multilanguage transcript support; extractor uses the default language of a given video.~~

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

#### .getTranscript(*id*, [*langCode*], [*config*])
Retrieves the transcript of a particular video.
- `id`: The YouTube video ID
- `langCode` (optional): ISO 639-1 language code. Defaults to `"en"`
- `config` (optional): Request configurations for the Axios HTTP client. See available options [here](https://axios-http.com/docs/req_config)

errors
- `"invalid video ID"`: Received status 406 from API. A video with the specified video ID does not exist.
- `"video unavailable or captions disabled"`: Received status 503 from API. Video is unavailable or has no retrievable captions.

returns `Promise<Object>`

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

#### .validateID(*id*, [*config*])
⚠️ **Deprecated**: `.validateID()` is deprecated and may be removed in a future release, should one be made available. Please use `.getTranscript()` errors instead.

**Utilizes the discontinued [video.google.com/timedtext](https://video.google.com/timedtext?lang=en-US&v=dQw4w9WgXcQ&fmt=vtt) endpoint.*

Checks if a video with the specified ID exists on YouTube.
- `id`: The YouTube video ID
- `config` (optional): Request configurations for the Axios HTTP client. See available options [here](https://axios-http.com/docs/req_config)

returns `Promise<boolean>`

```js
>>> TranscriptAPI.validateID('dQw4w9WgXcQ').then(console.log);

true
```
```js
>>> TranscriptAPI.validateID('somenonexistentvideoid').then(console.log);

false
```
