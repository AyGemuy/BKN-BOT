import axios from "axios";
import cheerio from "cheerio";
import formData from "form-data";
import moment from "moment-timezone";
import _ from "lodash";

const h2k = (number) => {
  var SI_POSTFIXES = ["", " K", " M", " G", " T", " P", " E"];
  var tier = (Math.log10(Math.abs(number)) / 3) | 0;
  if (tier == 0) return number;
  var postfix = SI_POSTFIXES[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;
  var formatted = scaled.toFixed(1) + "";
  if (/\.0$/.test(formatted));
  formatted = formatted.substr(0, formatted.length - 2);
  return formatted + postfix;
};

class Tiktok {
  constructor() {
    this.BASE_URL = "https://m.tiktok.com/";
    this.TRENDING_URL = `${this.BASE_URL}api/recommend/item_list/`;
    this.HASHTAG_URL = `${this.BASE_URL}api/challenge/item_list/`;
    this.HASHTAG_DESCRIPTION_URL = `${this.BASE_URL}node/share/tag/`;
    this.headers = {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
    };
    this.defaultParams = {
      aid: 1988,
      verifyFp: "verify_kvfr3riz_HLYxKN3N_v4jk_4hWM_86jq_mrti859vrj0R",
      app_name: "tiktok_web",
      device_platform: "web_mobile",
      screen_width: "1920",
      screen_height: "1080",
      region: "ID",
      language: "id",
      priority_region: "",
      os: "Linux",
      referer: "",
      root_referer: "",
      cookie_enabled: "true",
      browser_language: "id-ID",
      browser_platform: "Android",
      browser_name: "Mozilla",
      browser_version:
        "5.0+(Linux%3B+Android+9%3B+CPH1923)+AppleWebKit%2F537.36+(KHTML%2C+like+Gecko)+Chrome%2F93.0.4577.62+Mobile+Safari%2F537.36",
      browser_online: "true",
      timezone_name: "Asia/Jakarta",
      is_page_visible: "true",
      focus_state: "true",
      is_fullscreen: "false",
      history_len: Math.floor(Math.random() * 30),
    };
  }
  getHashtagParams(challengeID) {
    return {
      ...this.defaultParams,
      challengeID,
      count: 24,
      cursor: 4,
    };
  }
  async getHashtagDescription(tag) {
    const { data } = await axios.get(this.HASHTAG_DESCRIPTION_URL + tag, {
      headers: this.headers,
      withCredentials: true,
    });

    return data;
  }
  async getHashtagVideo(tag) {
    const { statusCode, challengeInfo } = await this.getHashtagDescription(tag);
    if (statusCode !== 0) {
      return new Array();
    }
    const response = await axios(this.HASHTAG_URL, {
      headers: this.headers,
      params: this.getHashtagParams(Number(challengeInfo.challenge.id)),
      withCredentials: true,
    });

    if (!response.data.hasOwnProperty("itemList")) throw "not found";
    let results = response.data.itemList;
    const listSort = ["date", "views", "followers", "random", ""];
    const sortBy = listSort[Math.floor(Math.random() * listSort.length)];
    let data;
    if (sortBy == "date") {
      data = results.sort(
        (a, b) => new Date(a.createTime) - new Date(b.createTime)
      );
    } else if (sortBy == "views") {
      data = results.sort((a, b) => a.stats.playCount - b.stats.playCount);
    } else if (sortBy == "followers") {
      data = results.sort(
        (a, b) => a.authorStats.followerCount - b.authorStats.playCount
      );
    } else if (sortBy == "shuffle" || sortBy == "random") {
      data = _.shuffle(results);
    } else {
      data = results;
    }
    let result = new Array();
    for (let i = 0; i < data.length; i++) {
      result.push({
        username: data[i].author.uniqueId,
        nickname: data[i].author.nickname,
        Verified: data[i].author.verified,
        signature: data[i].author.signature,
        uploaded: moment(data[i].createTime * 1000)
          .tz("Asia/Jakarta")
          .locale("id")
          .format(" HH - MM - yy"),
        description: data[i].desc,
        likes: h2k(data[i].stats.diggCount),
        shared: h2k(data[i].stats.shareCount),
        comments: h2k(data[i].stats.commentCount),
        playCount: h2k(data[i].stats.playCount),
        duration: data[i].video.duration,
        videoUrl: `https://www.tiktok.com/@${data[i].author.uniqueId}/video/${data[i].video.id}`,
        thumbnail: data[i].video.originCover,
        url: data[i].video.playAddr,
      });
    }
    return result;
  }
  async shorten(url) {
    const { data } = await axios.get(
      "https://tokurlshortener.com/api/shorten?url=" + url
    );

    return data;
  }
  stalker(username) {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "GET",
          url: `https://tiktok.com/@${username}`,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
            Cookie:
              "tt_webid_v2=7023321823367792130;tt_webid=7023321823367792130;tt_csrf_token=Ko3eYWlaA81BtC_6ezxMN4qf;R6kq3TV7=AHwiLLx8AQAAlTgrDyev4OA6MBZL078p4m5wG5CZEK8rU7kHUbizioKGVR8j|1|0|5839bf36b909a5e044847442b7d4dc0390a72e59;ttwid=1%7C3p7mb0Z4EWtFfmmqArdM4PqSNcyXZe23Vy0tPgsbyyI%7C1635244602%7C5fb19e46484c8c4f840b7c941ff4edea0fdcd8b6ea13576295a0268f37080669;s_v_web_id=verify_kv7yey5z_ZCLcdnz5_Mmf4_4XZZ_9ZFw_ZEjGJdo9qi62;msToken=p0SYyf1ujFiJcET1HDLeL2j4-2760D8ueZK-hU4TBTYI9NPKlB3IMnO9GXHm3GK2wi7xJoMGlsz9Kta1ls13_Vgt9izMlk2bBiOe8EmdRd5UrGaJMZn3oBTfwmiMexhYBC8d",
          },
        })
        .then(({ data }) => {
          const $ = cheerio.load(data);
          const script = $("script#__NEXT_DATA__").get();
          let parse;
          for (let anu of script) {
            if (anu.children && anu.children[0] && anu.children[0].data) {
              const json = anu.children[0].data;
              parse = JSON.parse(json);
            } else parse = new Array();
          }
          const anu = parse.props.pageProps.userInfo;
          const time = new Date(anu.user.createTime * 1000);
          const verif = anu.user.verified;
          const privAkun = anu.user.privateAccount;
          resolve({
            username: anu.user.uniqueId,
            nickname: anu.user.nickname,
            signature: anu.user.signature || "-",
            createTime: time,
            verified: verif !== false ? "User Verified" : "Not Verified",
            privateAccount:
              privAkun !== false ? "Private Account" : "Public Account",
            followers: anu.stats.followerCount,
            followings: anu.stats.followingCount,
            hearts: anu.stats.heart,
            heartsCount: anu.stats.heartCount,
            videoCount: anu.stats.videoCount,
            diggCount: anu.stats.diggCount,
            profile: anu.user.avatarThumb,
          });
        })
        .catch(reject);
    });
  }
  download(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const link = new URL(url);
        const getTokenData = await axios.get("https://aiovideodl.ml/", {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          },
        });

        const $ = cheerio.load(getTokenData.data);
        const tokenID = $("input[name='token']").attr("value");
        const cookieHeaders = getTokenData.headers["set-cookie"];
        await axios
          .request({
            method: "POST",
            url: "https://aiovideodl.ml/wp-json/aio-dl/video-data",
            data: `url=${encodeURIComponent(
              link.origin + link.pathname
            )}&token=${tokenID}`,
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
              Cookie: cookieHeaders,
            },
          })
          .then(async (response) => {
            resolve({
              title: response.data.title,
              thumbnail: response.data.thumbnail,
              duration: response.data.duration || "00:00",
              video: {
                watermark: {
                  url: response.data.medias[0].url,
                  quality: "hd",
                  size: response.data.medias[0].formattedSize,
                },
                nowatermark: {
                  url: response.data.medias[1].url,
                  quality: "hd",
                  size: response.data.medias[1].formattedSize,
                },
              },
              audio: {
                url: response.data.medias[2].url,
                quality: response.data.medias[2].quality,
                size: response.data.medias[2].formattedSize,
              },
            });
          })
          .catch(reject);
      } catch (e) {
        reject(e);
      }
    });
  }
  musically(url) {
    return new Promise(async (resolve, reject) => {
      const getDataInput = await axios.get("https://musicaldown.com/id");

      const $ = cheerio.load(getDataInput.data);
      let inputData = new Array();
      $("form")
        .find("input")
        .get()
        .map((map) => {
          inputData.push({
            name: $(map).attr("name"),
            value: $(map).attr("value"),
          });
        });
      const link = new URL(url);
      await axios
        .request({
          method: "POST",
          url: "https://musicaldown.com/id/download",
          data: `${inputData[0].name}=${encodeURIComponent(
            link.origin + link.pathname
          )}&${inputData[1].name}=${inputData[1].value}&${inputData[2].name}=${
            inputData[2].value
          }`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            Origin: "https://musicaldown.com",
            Referer: "https://musicaldown.com/id",
            Cookie: getDataInput.headers["set-cookie"],
          },
        })
        .then(async (response) => {
          await axios
            .request({
              method: "POST",
              url: "https://musicaldown.com/id/mp3",
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
                Cookie: getDataInput.headers["set-cookie"],
              },
            })
            .then(async ({ data }) => {
              const $ = cheerio.load(response.data);
              const _ = cheerio.load(data);
              let video = new Array();
              let audio = new Array();
              $("a[target='_blank']")
                .get()
                .map((map) => {
                  video.push($(map).attr("href"));
                });
              _("a.waves-effect")
                .get()
                .map((map) => {
                  audio.push($(map).attr("href"));
                });
              const result = {
                title: $("title").text().trim(),
                title_audio: _("title").text().split(" |")[0],
                thumbnail: $("img.responsive-img").attr("src"),
                video,
                audio: audio.filter((a) => a !== "/id/?ref=more"),
              };
              resolve(result);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
  async snaptik(url) {
    try {
      const FormData = new formData();
      const getToken = await axios.get("https://ttsave.app");
      const token = /let initToken = '(.*?)';/g.exec(getToken.data)[1];
      FormData.append("id", url);
      FormData.append("token", token);
      const { data } = await axios({
        method: "POST",
        url: "https://ttsave.app/download.php",
        data: FormData,
        headers: {
          ...FormData.getHeaders(),
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.101 Mobile Safari/537.36",
          Origin: "https://ttsave.app",
          Referer: "https://ttsave.app/",
        },
      });
      const $ = cheerio.load(data);
      let metadata = new Array();
      $("a")
        .get()
        .map((v) => {
          metadata.push($(v).attr("href"));
        });
      let result = {};
      result.nickname = $("div > div > h2").text();
      result.username = $("a").eq(1).text().trim();
      result.user_url = metadata[1];
      result.play_count = $("span").eq(0).text().trim();
      result.love_count = $("span").eq(1).text().trim();
      result.comment_count = $("span").eq(2).text().trim();
      result.share_count = $("span").eq(3).text().trim();
      result.title_audio = $("span").eq(4).text().trim() + ".mp3";
      result.caption = $("p").eq(0).text().trim();
      result.thumbnail = metadata[0] ? metadata[0] : metadata[5];
      result.audio = metadata[4];
      result.watermark = metadata[3];
      result.nowatermark = metadata[2] ? metadata[2] : $("source").attr("src");
      return result;
    } catch (e) {
      throw e;
    }
  }
  ttdl(url) {
    return new Promise(async (resolve, reject) => {
      await axios
        .request({
          url: "https://ttdownloader.com/",
          method: "GET",
          headers: {
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9,id;q=0.8",
            "user-agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
            cookie:
              "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934",
          },
        })
        .then(async (respon) => {
          const $ = cheerio.load(respon.data);
          const token = $("#token").attr("value");
          const link = new URL(url);
          await axios({
            url: "https://ttdownloader.com/req/",
            method: "POST",
            data: new URLSearchParams(
              Object.entries({
                url: link.origin + link.pathname,
                format: "",
                token: token,
              })
            ),
            headers: {
              accept: "*/*",
              "accept-language": "en-US,en;q=0.9,id;q=0.8",
              "content-type":
                "application/x-www-form-urlencoded; charset=UTF-8",
              "user-agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
              cookie:
                "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934",
            },
          })
            .then((res) => {
              const ch = cheerio.load(res.data);
              const mek = {
                status: res.status,
                result: {
                  nowatermark: ch("#results-list > div:nth-child(2)")
                    .find("div.download > a")
                    .attr("href"),
                  watermark: ch("#results-list > div:nth-child(3)")
                    .find("div.download > a")
                    .attr("href"),
                  audio: ch("#results-list > div:nth-child(4)")
                    .find(" div.download > a")
                    .attr("href"),
                },
              };
              resolve(mek);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
  savetik(url) {
    return new Promise((resolve, reject) => {
      const baseURL = "https://savetiknowm.org";
      const link = new URL(url);
      axios
        .request({
          method: "POST",
          url: baseURL,
          data: new URLSearchParams(
            Object.entries({ tiktok_url: link.origin + link.pathname })
          ),
        })
        .then(({ data }) => {
          const $ = cheerio.load(data);
          const result = {
            username: $("a.username").text(),
            nickname: $("a.user-nickname").text(),
            views: h2k($("ul.video-stats > li > span").text().trim()),
            description: $("p.description").text(),
            thumbnail: baseURL + $("div.profile > img").attr("src"),
            no_wm: baseURL + $("video > source").attr("src"),
          };
          resolve(result);
        })
        .catch(reject);
    });
  }
  search(query) {
    return new Promise((resolve, reject) => {
      const baseURL = "https://tiktokder.com/tiktok-video-search?q=";
      axios
        .request({
          method: "GET",
          url: baseURL + query,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.101 Mobile Safari/537.36",
          },
        })
        .then(async ({ data }) => {
          const $ = cheerio.load(data);
          let result = new Array();
          $("div.videos-grid > div.video-card").each(function (a, b) {
            result.push(
              "https://tiktokder.com" +
                $(this).find("a:nth-child(2)").attr("href")
            );
          });
          const randomUrl = result[Math.floor(Math.random() * result.length)];
          await axios
            .get(randomUrl)
            .then(({ data }) => {
              const _ = cheerio.load(data);
              const nickname = _("div.profile > a.user-nickname").text();
              let results = {
                username: _("div.profile > a.username").text(),
                nickname,
                views: _("ul.video-stats > li > span").text(),
                description: _("meta[name='description']")
                  .attr("content")
                  .split(nickname)[1],
                thumbnail: _("div.profile > img").attr("src"),
                url: _("div.result > div > video > source").attr("src"),
              };
              resolve(results);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
}

export { Tiktok };
