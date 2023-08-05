import axios from "axios";
import cheerio from "cheerio";

export const musically = async (URL) => {
  return new Promise((resolve, rejecet) => {
    axios
      .get("https://musicaldown.com/id", {
        headers: {
          "user-agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
        },
      })
      .then((res) => {
        const $ = cheerio.load(res.data);
        const url_name = $("#link_url").attr("name");
        const token_name = $("#submit-form > div")
          .find("div:nth-child(1) > input[type=hidden]:nth-child(2)")
          .attr("name");
        const token_ = $("#submit-form > div")
          .find("div:nth-child(1) > input[type=hidden]:nth-child(2)")
          .attr("value");
        const verify = $("#submit-form > div")
          .find("div:nth-child(1) > input[type=hidden]:nth-child(3)")
          .attr("value");
        let data = {
          [`$ {
            url_name
          }`]: URL,
          [`$ {
            token_name
          }`]: token_,
          verify: verify,
        };
        axios
          .request({
            url: "https://musicaldown.com/id/download",
            method: "post",
            data: new URLSearchParams(Object.entries(data)),
            headers: {
              "user-agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
              cookie: res.headers["set-cookie"],
            },
          })
          .then((respon) => {
            const ch = cheerio.load(respon.data);
            if (
              !ch(
                "body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(3)"
              ).attr("href")
            ) {
              let hasil = [];
              ch(
                "body > div.welcome.section > div > div:nth-child(2) > div > div.row > div"
              ).each(function (a, b) {
                hasil.push({
                  url: ch(b).find("img").attr("src"),
                  url_download: ch(b).find("a").attr("href"),
                });
              });

              let result = {
                audio: ch(
                  "body > div.welcome.section > div > div:nth-child(2) > div > a:nth-child(7)"
                ).attr("href"),
                audio_download: ch("#download").attr("href"),
                photo: hasil,
              };
              if (!result.photo[0]) {
                resolve();
              } else {
                resolve(result);
              }
            } else {
              axios
                .request({
                  url: "https://musicaldown.com/id/mp3",
                  method: "post",
                  headers: {
                    "user-agent":
                      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
                    cookie: res.headers["set-cookie"],
                  },
                })
                .then((resaudio) => {
                  const hc = cheerio.load(resaudio.data);
                  const result = {
                    pp: ch(
                      "body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > div > img"
                    ).attr("src"),
                    username: ch(
                      "body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(2) > b"
                    ).text(),
                    description: ch(
                      "body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(3)"
                    ).text(),
                    video: ch(
                      "body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(3)"
                    ).attr("href"),
                    video2: ch(
                      "body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)"
                    ).attr("href"),
                    video_HD: ch(
                      "body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(7)"
                    ).attr("href"),
                    video_watermark: ch(
                      "body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)"
                    ).attr("href"),
                    audio: hc(
                      "body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(6)"
                    ).attr("href"),
                    audio_Download: hc("#download").attr("href"),
                  };
                  resolve(result);
                });
            }
          });
      });
  });
};
