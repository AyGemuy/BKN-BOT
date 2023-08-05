import cheerio from "cheerio";
import fetch from "node-fetch";
import { lookup } from "mime-types";

const URL_REGEX =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

class Scraper {
  constructor() {}
  async pinterest(query) {
    if (query.match(URL_REGEX)) {
      let res = await fetch(
        "https://www.expertsphp.com/facebook-video-downloader.php",
        {
          method: "post",
          body: new URLSearchParams(Object.entries({ url: query })),
        }
      );
      let $ = cheerio.load(await res.text());
      let data = $(
        'table[class="table table-condensed table-striped table-bordered"]'
      )
        .find("a")
        .attr("href");
      if (!data) throw "Can't download post :/";
      return data;
    } else {
      let res = await fetch(
        `https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`
      );
      let json = await res.json();
      let data = json.resource_response.data.results;
      if (!data.length) throw `Query "${query}" not found :/`;
      return data[~~(Math.random() * data.length)].images.orig.url;
    }
  }
}

export { Scraper };
