<!-- TOC --><a name="youtube-transcript-api" id="youtube-transcript-api"></a>
# youtube-transcript-api

![npm version badge](https://img.shields.io/npm/v/youtube-transcript-api?color=4287f5&style=flat-square)
![npm downloads badge](https://img.shields.io/npm/dm/youtube-transcript-api?color=4287f5&style=flat-square)

> A YouTube video transcript extractor based on reverse-engineered [youtube-transcript.io](https://www.youtube-transcript.io)

## 📚 Table of Contents
<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [youtube-transcript-api](#youtube-transcript-api)
   * [✨ Features](#features)
   * [📦 Installation](#installation)
   * [🛠️ Usage](#usage)
   * [🧪 API](#api)
      + [`new TranscriptClient([AxiosOptions])`](#new-transcriptclientaxiosoptions)
      + [`client.ready : Promise<void>`](#clientready-promisevoid)
      + [`client.getTranscript(id, [config])`](#clientgettranscriptid-config)
         - [Parameters](#parameters)
         - [Returns](#returns)
         - [Errors](#errors)
         - [Example](#example)
            * [Transcript not available](#transcript-not-available)
            * [Video not found or unavailable](#video-not-found-or-unavailable)
      + [`client.bulkGetTranscript(ids, [config])`](#clientbulkgettranscriptids-config)
         - [Parameters](#parameters-1)
         - [Returns](#returns-1)
         - [Errors](#errors-1)
         - [Example](#example-1)
            * [Transcript not available](#transcript-not-available-1)
   * [🕰️ Previous Versions](#previous-versions)
   * [📄 License](#license)

<!-- TOC end -->

---

<!-- TOC --><a name="features" id="features"></a>
## ✨ Features

* Retrieve transcript for a single YouTube video.
* Retrieve transcripts in bulk (multiple YouTube videos).
* Complete multilanguage support.
* Retrieve additional YouTube video metadata.

---

<!-- TOC --><a name="installation" id="installation"></a>
## 📦 Installation

```bash
$ npm install youtube-transcript-api
```

---

<!-- TOC --><a name="usage" id="usage"></a>
## 🛠️ Usage

```js
import TranscriptClient from "youtube-transcript-api"; // both CJS and ESM are supported

const client = new TranscriptClient();

(async () => {
  await client.ready; // wait for client initialization
  const transcript = await client.getTranscript("dQw4w9WgXcQ");
  console.log(transcript);
})();
```

---

<!-- TOC --><a name="api" id="api"></a>
## 🧪 API

<!-- TOC --><a name="new-transcriptclientaxiosoptions" id="new-transcriptclientaxiosoptions"></a>
### `new TranscriptClient([AxiosOptions])`

Creates a new instance of the `TranscriptClient`.

* `AxiosOptions` *(optional)*: Custom Axios configuration object passed to the internal Axios instance. Useful for setting custom headers, timeouts, proxies, etc. See available options [here](https://axios-http.com/docs/req_config)

```js
const client = new TranscriptClient({
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
  }
});
```

<!-- TOC --><a name="clientready-promisevoid" id="clientready-promisevoid"></a>
### `client.ready : Promise<void>`

A promise that resolves when the client is fully initialized and ready to use.

Upon instantiation of `TranscriptClient`, Firebase configuration credentials for the youtube-transcript.io application need to be scraped. Always `await` this before calling methods.

---

<!-- TOC --><a name="clientgettranscriptid-config" id="clientgettranscriptid-config"></a>
### `client.getTranscript(id, [config])`

Fetch the transcript of a single YouTube video.

<!-- TOC --><a name="parameters" id="parameters"></a>
#### Parameters

* `id` **(string)** – The ID of the YouTube video.
* `config` **(object)** *(optional)* – Additional Axios request config. See available options [here](https://axios-http.com/docs/req_config)

<!-- TOC --><a name="returns" id="returns"></a>
#### Returns

* A **Promise** that resolves to the transcript object.

<!-- TOC --><a name="errors" id="errors"></a>
#### Errors

* `"invalid video ID"`: Received status 403 from API. A video with the specified `id` does not exist.

<!-- TOC --><a name="example" id="example"></a>
#### Example

```js
const transcript = await client.getTranscript("dQw4w9WgXcQ");
console.log(transcript);
```

```json
{
  "id": "dQw4w9WgXcQ",
  "title": "Rick Astley - Never Gonna Give You Up (Official Music Video)",
  "microformat": {
    "playerMicroformatRenderer": {
      "thumbnail": {
        "thumbnails": [
          {
            "url": "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            "width": 1280,
            "height": 720
          }
        ]
      },
      "embed": {
        "iframeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "width": 1280,
        "height": 720
      },
      "title": {
        "simpleText": "Rick Astley - Never Gonna Give You Up (Official Music Video)"
      },
      "description": {
        "simpleText": "The official video for “Never Gonna Give You Up” by Rick Astley. \n\nNever: The Autobiography 📚 OUT NOW! \nFollow this link to get your copy and listen to Rick’s ‘Never’ playlist ❤️ #RickAstleyNever\nhttps://linktr.ee/rickastleynever\n\n“Never Gonna Give You Up” was a global smash on its release in July 1987, topping the charts in 25 countries including Rick’s native UK and the US Billboard Hot 100.  It also won the Brit Award for Best single in 1988. Stock Aitken and Waterman wrote and produced the track which was the lead-off single and lead track from Rick’s debut LP “Whenever You Need Somebody”.  The album was itself a UK number one and would go on to sell over 15 million copies worldwide.\n\nThe legendary video was directed by Simon West – who later went on to make Hollywood blockbusters such as Con Air, Lara Croft – Tomb Raider and The Expendables 2.  The video passed the 1bn YouTube views milestone on 28 July 2021.\n\nSubscribe to the official Rick Astley YouTube channel: https://RickAstley.lnk.to/YTSubID\n\nFollow Rick Astley:\nFacebook: https://RickAstley.lnk.to/FBFollowID \nTwitter: https://RickAstley.lnk.to/TwitterID \nInstagram: https://RickAstley.lnk.to/InstagramID \nWebsite: https://RickAstley.lnk.to/storeID \nTikTok: https://RickAstley.lnk.to/TikTokID\n\nListen to Rick Astley:\nSpotify: https://RickAstley.lnk.to/SpotifyID \nApple Music: https://RickAstley.lnk.to/AppleMusicID \nAmazon Music: https://RickAstley.lnk.to/AmazonMusicID \nDeezer: https://RickAstley.lnk.to/DeezerID \n\nLyrics:\nWe’re no strangers to love\nYou know the rules and so do I\nA full commitment’s what I’m thinking of\nYou wouldn’t get this from any other guy\n\nI just wanna tell you how I’m feeling\nGotta make you understand\n\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\n\nWe’ve known each other for so long\nYour heart’s been aching but you’re too shy to say it\nInside we both know what’s been going on\nWe know the game and we’re gonna play it\n\nAnd if you ask me how I’m feeling\nDon’t tell me you’re too blind to see\n\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\n\n#RickAstley #NeverGonnaGiveYouUp #WheneverYouNeedSomebody #OfficialMusicVideo"
      },
      "lengthSeconds": "213",
      "ownerProfileUrl": "http://www.youtube.com/@RickAstleyYT",
      "externalChannelId": "UCuAXFkgsw1L7xaCfnd5JJOw",
      "isFamilySafe": true,
      "availableCountries": [
        "AD",
        "AE",
        "AF",
        "AG",
        "AI",
        ...
      ],
      "isUnlisted": false,
      "hasYpcMetadata": false,
      "viewCount": "1646819896",
      "category": "Music",
      "publishDate": "2009-10-24T23:57:33-07:00",
      "ownerChannelName": "Rick Astley",
      "uploadDate": "2009-10-24T23:57:33-07:00",
      "isShortsEligible": false,
      "externalVideoId": "dQw4w9WgXcQ",
      "likeCount": "18306193"
    }
  },
  "tracks": [
    {
      "language": "English (auto-generated)",
      "transcript": [
        {
          "text": "we're no strangers to",
          "start": "18.8",
          "dur": "7.239"
        },
        {
          "text": "love you know the rules and so do",
          "start": "21.8",
          "dur": "7.84"
        },
        {
          "text": "I I full commitments while I'm thinking",
          "start": "26.039",
          "dur": "5.201"
        },
        {
          "text": "of",
          "start": "29.64",
          "dur": "5.88"
        },
        {
          "text": "you wouldn't get this from any other guy",
          "start": "31.24",
          "dur": "8.2"
        },
        ...
      ]
    }
  ],
  "isLive": false,
  "languages": [
    {
      "label": "English (auto-generated)",
      "languageCode": "en"
    }
  ],
  "isLoginRequired": false,
  "playabilityStatus": {
    "status": "OK",
    "playableInEmbed": true,
    "miniplayer": {
      "miniplayerRenderer": {
        "playbackMode": "PLAYBACK_MODE_ALLOW"
      }
    },
    "contextParams": "Q0FFU0FnZ0I="
  },
  "author": "Rick Astley",
  "channelId": "UCuAXFkgsw1L7xaCfnd5JJOw",
  "keywords": [
    "rick astley",
    "Never Gonna Give You Up",
    "nggyu",
    "never gonna give you up lyrics",
    "rick rolled",
    ...
  ]
}
```

<!-- TOC --><a name="transcript-not-available" id="transcript-not-available"></a>
##### Transcript not available

```js
await client.getTranscript("JGJPVl7iQUM");
```

```json
{
  "id": "JGJPVl7iQUM",
  "microformat": {
    "playerMicroformatRenderer": {
      "category": "Music",
      "description": {
        "simpleText": "Provided to YouTube by IIP-DDS\n\nClair de Lune (Studio Version) · Johann Debussy\n\nClair de Lune (Studio Version)\n\n℗ Michael Lee Moen\n\nReleased on: 2021-12-14\n\nProducer: Michael Lee Moen\nMusic  Publisher: Claude Debussy\nComposer: Claude Debussy\n\nAuto-generated by YouTube."
      },
      "externalChannelId": "UC2VEp_GJTawei2IkYuqQdFA",
      "lengthSeconds": "311",
      "ownerChannelName": "Johann Debussy",
      "publishDate": "2021-12-14",
      "title": {
        "simpleText": "Clair de Lune (Studio Version)"
      }
    }
  },
  "isLive": false,
  "isLoginRequired": false,
  "languages": [
    {
      "label": "en",
      "languageCode": "en"
    }
  ],
  "playabilityStatus": {
    "status": "OK",
    "reason": "Transcript not available"
  },
  "title": "Clair de Lune (Studio Version)",
  "tracks": []
}
```

<!-- TOC --><a name="video-not-found-or-unavailable" id="video-not-found-or-unavailable"></a>
##### Video not found or unavailable

```js
await client.getTranscript("1dsfsdfsdfs");
```
```json
{
  "id": "",
  "title": "",
  "tracks": [],
  "isLive": false,
  "languages": [],
  "isLoginRequired": false,
  "playabilityStatus": {
    "status": "LOGIN_REQUIRED",
    "reason": "Video not found or unavailable"
  },
  "failedReason": "PLAYABILITY_STATUS_NOK"
}
```

---

<!-- TOC --><a name="clientbulkgettranscriptids-config" id="clientbulkgettranscriptids-config"></a>
### `client.bulkGetTranscript(ids, [config])`

Fetch transcripts for multiple YouTube videos in a single request.

<!-- TOC --><a name="parameters-1" id="parameters-1"></a>
#### Parameters

* `ids` **(string[])** – An array of YouTube video IDs.
* `config` **(object)** *(optional)* – Additional Axios request config. See available options [here](https://axios-http.com/docs/req_config)

<!-- TOC --><a name="returns-1" id="returns-1"></a>
#### Returns

* A **Promise** that resolves to an array of transcript objects.

<!-- TOC --><a name="errors-1" id="errors-1"></a>
#### Errors

* `"video not found or unavailable"`: Received status 403 from API. One or more videos could not be found or are unavailable, or a specified video ID does not exist.

<!-- TOC --><a name="example-1" id="example-1"></a>
#### Example

```js
const transcripts = await client.bulkGetTranscript([
  "1E3tv_3D95g",
  "dQw4w9WgXcQ"
]);
console.log(transcripts);
```

```json
[
  {
    "id": "1E3tv_3D95g",
    "microformat": {
      "playerMicroformatRenderer": {
        "category": "Science & Technology",
        "description": {
          "simpleText": "Hands on with iOS 26 and everything you need to know from WWDC 2025\n\nMKBHD Merch: http://shop.MKBHD.com\n\nIntro Track: Jordyn Edmonds\nPlaylist of MKBHD Intro music: https://goo.gl/B3AWV5\n\n~\nhttp://twitter.com/MKBHD\nhttp://instagram.com/MKBHD\nhttp://facebook.com/MKBHD\n\n0:00 26 All the Things\n2:01 iOS 16\n5:39 Liquid Glass concerns\n6:35 WatchOS 26\n7:53 tvOS 26\n8:10 macOS Tahoe\n10:55 visionOS 26\n12:48 iPadOS 26\n16:11 What about AI and Siri?"
        },
        "externalChannelId": "UCBJycsmduvYEL83R_U4JriQ",
        "lengthSeconds": "1102",
        "ownerChannelName": "Marques Brownlee",
        "publishDate": "2025-06-10",
        "title": {
          "simpleText": "WWDC 2025 Impressions: Liquid Glass!"
        }
      }
    },
    "isLive": false,
    "isLoginRequired": false,
    "languages": [
      {
        "label": "en",
        "languageCode": "en"
      }
    ],
    "playabilityStatus": {
      "status": "OK",
      "reason": ""
    },
    "title": "WWDC 2025 Impressions: Liquid Glass!",
    "tracks": [
      {
        "language": "en",
        "transcript": [
          {
            "start": "0.2",
            "dur": "3.06",
            "text": "[Music]"
          },
          {
            "start": "3.439",
            "dur": "2.081",
            "text": "all right So today was Apple's big"
          },
          {
            "start": "5.52",
            "dur": "4.079",
            "text": "software event for 2025 WWDC And it was"
          },
          {
            "start": "9.599",
            "dur": "1.841",
            "text": "a really it was actually a really"
          },
          {
            "start": "11.44",
            "dur": "1.279",
            "text": "interesting one I was kind of wondering"
          },
          ...
        ]
      }
    ]
  },
  ...
]
```

<!-- TOC --><a name="transcript-not-available-1" id="transcript-not-available-1"></a>
##### Transcript not available

```js
await client.bulkGetTranscript([
  "JGJPVl7iQUM",
  "dQw4w9WgXcQ"
]);
```

```json
[
  {
    "id": "JGJPVl7iQUM",
    "microformat": {
      "playerMicroformatRenderer": {
        "category": "Music",
        "description": {
          "simpleText": "Provided to YouTube by IIP-DDS\n\nClair de Lune (Studio Version) · Johann Debussy\n\nClair de Lune (Studio Version)\n\n℗ Michael Lee Moen\n\nReleased on: 2021-12-14\n\nProducer: Michael Lee Moen\nMusic  Publisher: Claude Debussy\nComposer: Claude Debussy\n\nAuto-generated by YouTube."
        },
        "externalChannelId": "UC2VEp_GJTawei2IkYuqQdFA",
        "lengthSeconds": "311",
        "ownerChannelName": "Johann Debussy",
        "publishDate": "2021-12-14",
        "title": {
          "simpleText": "Clair de Lune (Studio Version)"
        }
      }
    },
    "isLive": false,
    "isLoginRequired": false,
    "languages": [
      {
        "label": "en",
        "languageCode": "en"
      }
    ],
    "playabilityStatus": {
      "status": "OK",
      "reason": "Transcript not available"
    },
    "title": "Clair de Lune (Studio Version)",
    "tracks": []
  },
  ...
]
```

---

<!-- TOC --><a name="previous-versions" id="previous-versions"></a>
## 🕰️ Previous Versions
* **v2.0.4** [[npm](https://www.npmjs.com/package/youtube-transcript-api/v/2.0.4)] [[jsDelivr](https://www.jsdelivr.com/package/npm/youtube-transcript-api?version=2.0.4)]
    * Based on a [Free Youtube Transcript Generator by Tactiq.io](https://tactiq.io/tools/youtube-transcript)
    * Issue [#5](https://github.com/0x6a69616e/youtube-transcript-api/issues/5)

* **v1.1.2** [[npm](https://www.npmjs.com/package/youtube-transcript-api/v/1.1.2)] [[jsDelivr](https://www.jsdelivr.com/package/npm/youtube-transcript-api?version=1.1.2)]
    * Based on [youtubetranscript.com](https://youtubetranscript.com)
    * Issue [#4](https://github.com/0x6a69616e/youtube-transcript-api/issues/4)

---

<!-- TOC --><a name="license" id="license"></a>
## 📄 License

This repository is licensed under the MIT License.
```
Copyright (c) 2023-2025 0x6a69616e

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
