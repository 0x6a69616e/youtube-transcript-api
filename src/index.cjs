'use strict';

var axios = require('axios');

class TranscriptAPI {
  /**
   * Retrieves the transcript of a particular video.
   * @param {string} id - The YouTube video ID
   * @param {string} [langCode] - ISO 639-1 language code
   * @param {object} [config] - Request configurations for the Axios HTTP client.
   */
  static async getTranscript(id, langCode, config = {}) {
    const url = new URL('https://www.youtube.com/watch');
    url.searchParams.set('v', id);
    try {
      const response = await axios.post('https://tactiq-apps-prod.tactiq.io/transcript', {
          langCode: langCode || 'en',
          videoUrl: url
        }, config);

      return response.data.captions.map(({ dur, ...rest }) => ({
        ...rest,
        duration: dur
      }));
    } catch (e) {
      if (e.status == 406) throw new Error('invalid video ID');
      else if (e.status == 503) throw new Error('video unavailable or captions disabled');
      else throw e;
    }
  }

  /**
   * Checks if a video with the specified ID exists on YouTube.
   * @param {string} id - The YouTube video ID
   * @param {object} [config] - Request configurations for the Axios HTTP client.
   */
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
      return false;
    }
  }
}

module.exports = TranscriptAPI;
