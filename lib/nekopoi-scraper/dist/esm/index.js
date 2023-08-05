/**
 * @author FrierenDv
 * @version 2.6.9
 *
 * Don't forget to star the repo :)
 * @link (https://github.com/xct007/nekopoi-scraper)
 */
import axios from "axios";
import {
  Config,
  URL_RECENT,
  URL_LIST,
  URL_SEARCH,
  URL_POST,
  URL_SERIES,
} from "./Config/index.js";
/**
 * Get recent hentai
 * @return {Promise<Object>}
 */
export const latest = async () => {
  let result = [];
  const data = await axios
    .get(URL_RECENT, {
      ...Config,
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
/**
 * Get all list ** by type.
 * @param {String} _type (optional), eg. "jav" or "hentai", default "hentai".
 * @param {Number} page (optional), eg. 2, default 1.
 * @return {Promise<Object>}
 */
export const list = async (_type, page) => {
  let result = [];
  const data = await axios
    .get(URL_LIST(_type ? _type : "hentai", page ? page : 1), {
      ...Config,
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
/**
 * get hentai by query.
 * @param {String} query
 * @param {Number} limit (optional), for number of output, eg. 10
 * @return {Promise<Object>}
 */
export const search = async (query, limit) => {
  let result = [];
  const data = await axios
    .get(URL_SEARCH(query), {
      ...Config,
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
/**
 * get hentai detail by id
 * @param {Number} id
 * @return {Promise<Object>}
 */
export const detail = async (id) => {
  let result;
  let data = await axios
    .get(URL_SERIES(id), {
      ...Config,
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
    data = await axios
      .get(URL_POST(id), {
        ...Config,
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
const kucingPoi = {
  search,
  latest,
  list,
  detail,
};
export default kucingPoi;
/** Hello :) */
//# sourceMappingURL=index.js.map
