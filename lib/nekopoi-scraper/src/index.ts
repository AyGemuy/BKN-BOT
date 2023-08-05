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
} from "./Config";

/**
 * Get recent hentai
 * @return {Promise<Object>}
 */
export const latest = async (): Promise<object> => {
  type ResultRecent = {
    id: number;
    date: string;
    image: string;
    description: string;
  }[];
  let result: ResultRecent[] = [];
  const data = await axios
    .get(URL_RECENT, {
      ...Config,
    })
    .catch((e: any) => e?.response);
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
export const list = async (_type?: string, page?: number): Promise<object> => {
  type ResultList = {
    id: number;
    date: string;
    title: string;
    image: string;
    type: string;
  }[];
  let result: ResultList[] = [];
  const data = await axios
    .get(URL_LIST(_type ? _type : "hentai", page ? page : 1), {
      ...Config,
    })
    .catch((e: any) => e?.response);
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
export const search = async (
  query: string,
  limit?: number
): Promise<object> => {
  type ResultSearch = {
    id: number;
    date: string;
    title: string;
    image: string;
    type: string;
  }[];
  let result: ResultSearch[] = [];
  const data = await axios
    .get(URL_SEARCH(query), {
      ...Config,
    })
    .catch((e: any) => e?.response);
  if (data.data && Array.isArray(data.data.result)) {
    let _tmp: ResultSearch[] = [];
    for (const i of data.data.result) {
      _tmp.push({ ...i });
    }
    _tmp = _tmp.filter((val: any, i: number) => i < (limit ? limit : 10));
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
export const detail = async (id: number): Promise<object> => {
  type ResultDetail = {
    id: number;
    date: string;
    title: string;
    description?: string;
    image: string;
    info_meta?: {
      aliases: string;
      episode: string;
      status: string;
      tayang: string;
      produser: string;
      durasi: string;
      skor: string;
      genre: string;
    };
    stream?: {
      link: string;
    }[];
    download?: {
      type: string;
      links: {
        name: string;
        link: string;
      }[];
    };
    episode?: {
      id: number;
      date: string;
      title: string;
      image: string;
    }[];
    series?: {
      id: number;
      date: string;
      title: string;
      image: string;
    }[];
  };
  let result: ResultDetail;
  let data: any = await axios
    .get(URL_SERIES(id), {
      ...Config,
    })
    .catch((e: any) => e?.response);
  if (data.data && data.data.episode) {
    const temp = data.data;
    if (temp.info_meta.genre && temp.info_meta.genre.length) {
      let _temp: string[] = [];
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
      .catch((e: any) => {
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
