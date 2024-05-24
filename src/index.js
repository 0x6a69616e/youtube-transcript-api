import axios from "axios";
import cheerio from "cheerio";

class TranscriptAPI {
  static async getTranscript(id, config = {}) {
    const url = new URL('https://youtubetranscript.com');
    url.searchParams.set('server_vid2', id);
    
    const
      response = await axios.get(url, config),
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

  static async validateID(id, config = {}) {
    const url = new URL('https://video.google.com/timedtext');
    url.searchParams.set('type', 'track');
    url.searchParams.set('v', id);
    url.searchParams.set('id', 0);
    url.searchParams.set('lang', 'en');
    
    try {
      await axios.get(url, config);
      return !0;
    } catch (_) {
      return !1;
    }
  }
}

export { TranscriptAPI as default };