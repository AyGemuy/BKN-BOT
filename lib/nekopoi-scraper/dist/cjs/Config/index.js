"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config =
  exports.URL_SERIES =
  exports.URL_POST =
  exports.URL_SEARCH =
  exports.URL_LIST =
  exports.URL_RECENT =
    void 0;
/**
 * @note
 * The values listed on consts below may be modified/changed
 * by our beloved NekoPoi.care Admin.
 */
const BASE_URL = "https://cu8auck2lc.3z094n2681i06q8k14w31cu4q80d5p.com";
const router = {
  first: "330cceade91a6a9cd30fb8042222ed56",
  second: "71b8acf33b508c7543592acd9d9eb70d",
};
const route = router.first + "/" + router.second;
const Token =
  "XbGSFkQsJYbFC6pcUMCFL4oNHULvHU7WdDAXYgpmq" +
  "Ylh7p5ZCQ4QZ13GDgowiOGvAejz9X5H6DYvEQBMrc3A17SO3qwLwVkbn6YY";
const appBuildCode = "25012";
const appSignature =
  "pOplm8IDEDGXN55IaYohQ8CzJFvWsfXyhGvwPRD9kW" +
  "gzYSRuuvAOPfsE0AJbHVbAJyWGsGCNUIuQLJ7HbMbuFLMWwDgHNwxOrYMH";
/** */
exports.URL_RECENT = `${BASE_URL}/${route}/recent`;
const URL_LIST = (query, page) => {
  return `${BASE_URL}/${route}/listall?letter=0-9&type=${
    query.toLowerCase() === "jav"
      ? "jav"
      : query.toLowerCase() === "hentai"
      ? "hentai"
      : "hentai"
  }&page=${page ? page : 1}`;
};
exports.URL_LIST = URL_LIST;
const URL_SEARCH = (query) => `${BASE_URL}/${route}/search?q=${query}&page=1`;
exports.URL_SEARCH = URL_SEARCH;
const URL_POST = (id) => `${BASE_URL}/${route}/post?id=${id}`;
exports.URL_POST = URL_POST;
const URL_SERIES = (id) => `${BASE_URL}/${route}/series?id=${id}`;
exports.URL_SERIES = URL_SERIES;
exports.Config = {
  headers: {
    token: Token,
    accept: "application/json",
    appbuildcode: appBuildCode,
    appsignature: appSignature,
    "accept-encoding": "deflate",
    "user-agent": "okhttp/4.9.0",
  },
};
//# sourceMappingURL=index.js.map
