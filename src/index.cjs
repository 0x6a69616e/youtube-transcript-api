'use strict';

var axios = require('axios');
var cheerio = require('cheerio');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var cheerio__namespace = /*#__PURE__*/_interopNamespaceDefault(cheerio);

/**
 * Generates a random hex string.
 * @param {number} size - Length of hex string
 * @returns A random hex string
 */
function generateRandomHex(size) {
    return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
}

class TranscriptClient {
    ready;                // ready event trigger
    #instance;            // Axios Instance
    #firebase_cfg_creds;  // Firebase configuration credentials

    constructor(AxiosOptions) {
        this.#instance = axios.create({
            ...(AxiosOptions || {}),
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:139.0) Gecko/20100101 Firefox/139.0",
                ...(AxiosOptions?.headers || {})
            },
            baseURL: "https://www.youtube-transcript.io/"
        });

        // Promise-based ready event trigger system
        this.ready = new Promise(async resolve => {
            this.#firebase_cfg_creds = await this.#get_firebase_cfg_creds();
            resolve();
        });
    }

    /**
     * Gets Google Firebase configuration credentials
     * @returns Firebase auth details
     */
    #get_firebase_cfg_creds() {
        return (async () => {
            const { data }  = await this.#instance.get("/");
            const $ = cheerio__namespace.load(data);

            for (const elem of $("script[src]").toArray()) {
                const url = $(elem).attr("src");
                const { data: script } = await this.#instance.get(url);

                const match = script.match(/\(\{[^}]*apiKey:"([^"]+)"[^}]*\}\)/gm);
                if (match) return Function("return " + match[0])();
            }
        })();
    }

    /**
     * Gets API authorization details from the Google Identity Platform
     * @returns SignupNewUserResponse
     */
    #get_auth() {
        const creds = this.#firebase_cfg_creds;
        if (!creds) throw new Error("client not fully initialized!");

        const url = new URL("https://identitytoolkit.googleapis.com/v1/accounts:signUp");
        url.searchParams.set("key", creds.apiKey);

        return (async () => {
            const { data } = await this.#instance.post(url, {
                returnSecureToken: true
            }, {
                headers: {
                    "X-Client-Version": "Firefox/JsCore/10.14.1/FirebaseCore-web",
                    "X-Firebase-Client": JSON.stringify({
                        "version": 2,
                        "heartbeats": [
                            {
                                "agent": "fire-core/0.10.13 fire-core-esm2017/0.10.13 fire-js/ fire-js-all-app/10.14.1 fire-auth/1.7.9 fire-auth-esm2017/1.7.9",
                                "dates": [
                                    new Date().toISOString().split('T')[0]
                                ]
                            }
                        ]
                    }),
                    "X-Firebase-gmpid": creds.appId.slice(2)
                }
            });
            return data;
        })();
    }

    /**
     * Gets x-client-context value
     * @param {string} id - The YouTube video ID
     * @returns Firebase auth details
     */
    #get_x_client_context(id) {
        return (async () => {
            const { data } = await this.#instance.get("/videos/" + id);
            const $ = cheerio__namespace.load(data);

            for (const elem of $("script[src]").toArray()) {
                const url = $(elem).attr("src");
                const { data: script } = await this.#instance.get(url);
                const match = script.match(/"([^"]+)"\s*:\s*"([^"]+)"\},body:JSON\.stringify\(\{ids:\[t\]\}\)/gm);
                if (match) {
                    const nextMatch = match[0].match(/"([^"]+)"\s*:\s*"([^"]+)"/);
                    return [nextMatch[1], nextMatch[2]];
                }
            }
        })();
    }

    /**
     * Retrieves the transcript of a particular video.
     * @param {string} id - The YouTube video ID
     * @param {object} [config] - Request configurations for the Axios HTTP client
     * @returns A Promise that resolves to the transcript object
     */
    async getTranscript(id, config) {
        const auth = await this.#get_auth();
        const x_header = await this.#get_x_client_context(id);

        try {
            const { data } = await this.#instance.post("/api/transcripts", {
                ids: [ id ]
            }, {
                ...(config || {}),
                headers: {
                    ...(config?.headers || {}),
                    Authorization: "Bearer " + auth.idToken,
                    [x_header[0]]: x_header[1],
                    'X-Hash': generateRandomHex(64)
                }
            });

            return data[0];
        } catch (e) {
            if (e.status == 403) throw new Error('invalid video ID');
            else throw e;
        }
    }

    /**
     * Retrieves the transcript of multiple videos.
     * @param {string[]} ids - A list of YouTube video IDs
     * @param {object} [config] - Request configurations for the Axios HTTP client
     * @returns A Promise that resolves to an array of transcript objects
     */
    async bulkGetTranscript(ids, config) {
        const auth = await this.#get_auth();
        const x_header = await this.#get_x_client_context(id);

        try {
            const { data } = await this.#instance.post("/api/transcripts", {
                ids
            }, {
                ...(config || {}),
                headers: {
                    ...(config?.headers || {}),
                    Authorization: "Bearer " + auth.idToken,
                    [x_header[0]]: x_header[1],
                    'X-Hash': generateRandomHex(64)
                }
            });

            return data;
        } catch (e) {
            if (e.status == 403) throw new Error('video not found or unavailable');
            else throw e;
        }
    }
}

module.exports = TranscriptClient;
