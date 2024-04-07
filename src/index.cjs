'use strict';

const axios = require('axios'),
  cheerio = require('cheerio');

async function getTranscript(id) {
  const url = new URL('https://youtubetranscript.com');
  url.searchParams.set('server_vid2', id);
  
  const
    response = await axios.get(url),
    $ = cheerio.load(response.data, undefined, false),
    err = $('error');

  if (err.length) throw new Error(err.text());
  return $('transcript text').map((i, elem) => {
    const $a = $(elem);
    return {
      text: $a.text(),
      start: Number($a.attr('start')),
      duration: Number($a.attr('dur'))
    };
  }).toArray();
}

async function validateID(id) {
  const url = new URL('https://video.google.com/timedtext');
  url.searchParams.set('type', 'track');
  url.searchParams.set('v', id);
  url.searchParams.set('id', 0);
  url.searchParams.set('lang', 'en');
  
  try {
    await axios.get(url);
    return !0;
  } catch (_) {
    return !1;
  }
}

module.exports = { getTranscript, validateID };