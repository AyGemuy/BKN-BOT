import axios from "axios";
import cheerio from "cheerio";

export async function chara(query) {
  return new Promise((resolve, reject) => {
    axios
      .get("https://www.wallpaperflare.com/search?wallpaper=" + query, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          cookie:
            "_ga=GA1.2.863074474.1624987429; _gid=GA1.2.857771494.1624987429; __gads=ID=84d12a6ae82d0a63-2242b0820eca0058:T=1624987427:RT=1624987427:S=ALNI_MaJYaH0-_xRbokdDkQ0B49vSYgYcQ",
        },
      })
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const result = [];
        $("#gallery > li > figure > a").each(function (a, b) {
          result.push($(b).find("img").attr("data-src"));
        });
        resolve(result);
      })
      .catch({ status: "err" });
  });
}
