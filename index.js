const
    axios = require('axios'),
    cheerio = require('cheerio');

async function getTranscript(id) {
    const
      response = await axios.get(`https://youtubetranscript.com/?server_vid2=${id}`),
      $ = cheerio.load(response.data, undefined, false),
      err = $('error');
  
    if (err.length) throw new Error(err.text());
    return $('transcript text').map((i, elem) => {
        const $a = $(elem);
        return {
            text: $a.text(),
            start: $a.attr('start'),
            duration: $a.attr('dur')
        };
    }).toArray();
}

async function validateID(id) {
    try {
        await axios.get(`https://video.google.com/timedtext?type=track&v=${id}&id=0&lang=en`);
        return !0;
    } catch (_) {
        return !1;
    }
}

module.exports = { getTranscript, validateID };
