/**
 * Get recent hentai
 * @return {Promise<Object>}
 */
export declare const latest: () => Promise<object>;
/**
 * Get all list ** by type.
 * @param {String} _type (optional), eg. "jav" or "hentai", default "hentai".
 * @param {Number} page (optional), eg. 2, default 1.
 * @return {Promise<Object>}
 */
export declare const list: (_type?: string, page?: number) => Promise<object>;
/**
 * get hentai by query.
 * @param {String} query
 * @param {Number} limit (optional), for number of output, eg. 10
 * @return {Promise<Object>}
 */
export declare const search: (query: string, limit?: number) => Promise<object>;
/**
 * get hentai detail by id
 * @param {Number} id
 * @return {Promise<Object>}
 */
export declare const detail: (id: number) => Promise<object>;
declare const kucingPoi: {
  search: (query: string, limit?: number) => Promise<object>;
  latest: () => Promise<object>;
  list: (_type?: string, page?: number) => Promise<object>;
  detail: (id: number) => Promise<object>;
};
export default kucingPoi;
/** Hello :) */
//# sourceMappingURL=index.d.ts.map
