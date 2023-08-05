"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.detail = exports.search = exports.list = exports.latest = void 0;
/**
 * @author FrierenDv
 * @version 2.6.9
 *
 * Don't forget to star the repo :)
 * @link (https://github.com/xct007/nekopoi-scraper)
 */
const axios_1 = __importDefault(require("axios"));
const index_js_1 = require("./Config/index.js");
/**
 * Get recent hentai
 * @return {Promise<Object>}
 */
const latest = async () => {
  let result = [];
  const data = await axios_1.default
    .get(index_js_1.URL_RECENT, {
      ...index_js_1.Config,
    })
    .catch((e) => (e === null || e === void 0 ? void 0 : e.response));
  if (data.data && data.data.carousel) {
    for (const i of data.data.carousel) {
      delete i["slug"];
      result.push({
        ...i,
      });
    }
  } else {
    return {
      error: true,
      message: "failed to fetch data from {URL_RECENT}",
    };
  }
  return result;
};
exports.latest = latest;
/**
 * Get all list ** by type.
 * @param {String} _type (optional), eg. "jav" or "hentai", default "hentai".
 * @param {Number} page (optional), eg. 2, default 1.
 * @return {Promise<Object>}
 */
const list = async (_type, page) => {
  let result = [];
  const data = await axios_1.default
    .get((0, index_js_1.URL_LIST)(_type ? _type : "hentai", page ? page : 1), {
      ...index_js_1.Config,
    })
    .catch((e) => (e === null || e === void 0 ? void 0 : e.response));
  if (data.data && Array.isArray(data.data.result)) {
    for (const i of data.data.result) {
      result.push({
        ...i,
      });
    }
  } else {
    return {
      error: true,
      message: "failed to fetch data from {URL_LIST}",
    };
  }
  return result;
};
exports.list = list;
/**
 * get hentai by query.
 * @param {String} query
 * @param {Number} limit (optional), for number of output, eg. 10
 * @return {Promise<Object>}
 */
const search = async (query, limit) => {
  let result = [];
  const data = await axios_1.default
    .get((0, index_js_1.URL_SEARCH)(query), {
      ...index_js_1.Config,
    })
    .catch((e) => (e === null || e === void 0 ? void 0 : e.response));
  if (data.data && Array.isArray(data.data.result)) {
    let _tmp = [];
    for (const i of data.data.result) {
      _tmp.push({ ...i });
    }
    _tmp = _tmp.filter((val, i) => i < (limit ? limit : 10));
    result = _tmp;
  } else {
    return {
      error: true,
      message: "failed to fetch data from {URL_SEARCH}",
    };
  }
  return result;
};
exports.search = search;
/**
 * get hentai detail by id
 * @param {Number} id
 * @return {Promise<Object>}
 */
const detail = async (id) => {
  let result;
  let data = await axios_1.default
    .get((0, index_js_1.URL_SERIES)(id), {
      ...index_js_1.Config,
    })
    .catch((e) => (e === null || e === void 0 ? void 0 : e.response));
  if (data.data && data.data.episode) {
    const temp = data.data;
    if (temp.info_meta.genre && temp.info_meta.genre.length) {
      let _temp = [];
      for (const i of temp.info_meta.genre) {
        _temp.push(i.name);
      }
      delete temp.info_meta["genre"];
      Object.assign(temp.info_meta, {
        genre: _temp.join(", "),
      });
    }
    result = temp;
  } else {
    data = await axios_1.default
      .get((0, index_js_1.URL_POST)(id), {
        ...index_js_1.Config,
      })
      .catch((e) => {
        return e.response;
      });
    if (data.data && Array.isArray(data.data.stream)) {
      /** remove some unused <Object> */
      delete data.data["content"];
      delete data.data["slug"];
      delete data.data["note"];
      result = data.data;
    } else {
      return {
        error: true,
        message: "Empty stream result {URL_POST} maybe wrong id or idk",
      };
    }
  }
  return result;
};
exports.detail = detail;
const kucingPoi = {
  search: exports.search,
  latest: exports.latest,
  list: exports.list,
  detail: exports.detail,
};
exports.default = kucingPoi;
/** Hello :) */
//# sourceMappingURL=index.js.map
