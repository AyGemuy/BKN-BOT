import cheerio from "cheerio";
import axios from "axios";
import request from "request";
import fetch from "node-fetch";
import qs from "qs";

export async function playstore(name) {
  return new Promise((resolve, reject) => {
    axios
      .get("https://play.google.com/store/search?q=" + name + "&c=apps")
      .then(({ data }) => {
        const $ = cheerio.load(data);
        let ln = [];
        let nm = [];
        let dv = [];
        let lm = [];
        const result = [];
        $("div.wXUyZd > a").each(function (a, b) {
          const link = "https://play.google.com" + $(b).attr("href");
          ln.push(link);
        });
        $("div.b8cIId.ReQCgd.Q9MA7b > a > div").each(function (d, e) {
          const name = $(e).text().trim();
          nm.push(name);
        });
        $("div.b8cIId.ReQCgd.KoLSrc > a > div").each(function (f, g) {
          const dev = $(g).text().trim();
          dv.push(dev);
        });
        $("div.b8cIId.ReQCgd.KoLSrc > a").each(function (h, i) {
          const limk = "https://play.google.com" + $(i).attr("href");
          lm.push(limk);
        });
        for (let i = 0; i < ln.length; i++) {
          result.push({
            name: nm[i],
            link: ln[i],
            developer: dv[i],
            link_dev: lm[i],
          });
        }
        resolve(result);
      })
      .catch(reject);
  });
}

export async function linkwa(nama) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=" +
          nama +
          "&searchby=name"
      )
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const result = [];
        const lnk = [];
        const nm = [];
        $("div.wa-chat-title-container").each(function (a, b) {
          const limk = $(b).find("a").attr("href");
          lnk.push(limk);
        });
        $("div.wa-chat-title-text").each(function (c, d) {
          const name = $(d).text();
          nm.push(name);
        });
        for (let i = 0; i < lnk.length; i++) {
          result.push({
            nama: nm[i].split(". ")[1],
            link: lnk[i].split("?")[0],
          });
        }

        resolve(result);
      })
      .catch(reject);
  });
}

export async function pinterest(querry) {
  return new Promise(async (resolve, reject) => {
    axios
      .get("https://id.pinterest.com/search/pins/?autologin=true&q=" + querry, {
        headers: {
          cookie:
            '_auth=1; _b="AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg="; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0',
        },
      })
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const result = [];
        const hasil = [];
        $("div > a")
          .get()
          .map((b) => {
            const link = $(b).find("img").attr("src");
            result.push(link);
          });
        result.forEach((v) => {
          if (v == undefined) return;
          hasil.push(v.replace(/236/g, "736"));
        });
        hasil.shift();

        resolve(hasil);
      });
  });
}

export async function snapinsta(url) {
  return new Promise(async (resolve, reject) => {
    if (
      !/^((https|http)?:\/\/(?:www\.)?instagram\.com\/(p|tv|reel|stories)\/([^/?#&]+)).*/i.test(
        url
      )
    )
      throw "Url invalid";
    let form = new FormData();
    form.append("url", encodeURI(url));
    form.append("action", "post");
    let res = await fetch("https://snapinsta.app/action.php", {
      method: "POST",
      headers: {
        "content-type":
          "multipart/form-data; boundary=----WebKitFormBoundary1kCNm4346FA9yvCN",
        cookie:
          "PHPSESSID=6d7nupv45th6ln9ldhpu62pg8s; _ga=GA1.2.1450546575.1637033620; _gid=GA1.2.1378038975.1637033620; _gat=1; __gads=ID=68a947f8174e0410-22fc6960b3ce005e:T=1637033620:RT=1637033620:S=ALNI_MbXTvxtxuISyAFMevds6-00PecLlw; __atuvc=1%7C46; __atuvs=61932694ba428f79000; __atssc=google%3B1",
        origin: "https://snapinsta.app",
        referer: "https://snapinsta.app/id",
        "sec-ch-ua":
          '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
        ...form.getHeaders(),
      },
      body: form,
    });
    let html = await res.text();
    const $ = cheerio.load(html);
    let results = [];
    $("div.col-md-4").each(function () {
      let thumbnail = $(this)
        .find("div.download-items > div.download-items__thumb > img")
        .attr("src");
      let result = $(this)
        .find("div.download-items > div.download-items__btn > a")
        .attr("href");
      if (!/https?:\/\//i.test(result))
        result = "https://snapinsta.app" + result;
      results.push({
        thumbnail,
        result,
      });
    });
    resolve(results);
  });
}

export async function igdl(url) {
  return new Promise(async (resolve, reject) => {
    var data;
    const hasil = [];
    try {
      data = await export_data(url);
    } catch {
      return resolve();
    }
    if (!data.url) {
      for (let i = 0; i < data.length; i++) {
        let result = {
          result: data[i].thumb,
        };
        hasil.push(result);
      }
      let dataresult = {
        decs: data[0].meta.title,
        link_original: data[0].meta.source,
        url: hasil,
      };
      return resolve(dataresult);
    } else {
      let tiny = await axios.get(
        `https://tinyurl.com/api-create.php?url=${data.url[0].url}`
      );
      let tinyUrl = tiny.data;
      let result = {
        url: tinyUrl,
        thumb: data.thumb,
        type: data.url[0].type,
        decs: data.meta.title,
        link_original: data.meta.source,
      };
      return resolve(result);
    }
  });
}

export async function igstalk(username) {
  return new Promise((resolve, reject) => {
    axios
      .get("https://www.instagram.com/" + username + "/channel/?__a=1", {
        method: "GET",
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
          cookie:
            "ig_did=085C2CB5-8000-4441-85DD-CF5BCA1FE157; ig_nrcb=1; csrftoken=7ZyQtU7rsZFsOgvKLjflk0KLMmTC4Chh; mid=YooZLAALAAF_nhOq9DEEIGOl8xB8; fbm_124024574287414=base_domain=.instagram.com; fbsr_124024574287414=d4okoqSIG-fbjXgJKE07737dLXrQkN682RmOZvAdn8M.eyJ1c2VyX2lkIjoiMTAwMDQxMDU2ODc1NDA4IiwiY29kZSI6IkFRQ3ZLZkpVdzZ3WkVaUmhleTRodjFyV05BZ0JlUXM1cVRlVTJnWnZrbjkxOXllN2lfUGM1a2VjUHRIZF9qdy1KS2tDcE9Jb3ZTUmF0SGxDaTZNdzFCODFYdXJ0OEZ4aVZKVGNTMzRLbVFMVHFYVzY5NGU1X0ltcDFZSmdWSVBwLUFwblpJbkRkWWRYSURSSk9oRVZScGNuRVE1MVMwNWtXeFZxZ0EwQzZRN1VsQzcxVTdCLWNDS0haNzk3cU9vYk9yRl9mcHVZdUs3a3Fic1djaU5NVF9TbkszN2kyLVFxalEtei1SanF3bFNONnNxWXJWaUhfbTIzSWJWdUVwZUZxRzYweldoR0NxLUM5TXF5dHNYTGRzM3NNY25IS3Z0Tmc2VzIxRHFpM3poSGQybFNQUS1IR2U1ZERkUWIyS3liZzlYUXNCX3FvemhWOHI3WVBFLVYwUmI3V2s5VEpiMWNaMlBQcEFPaDJRR0lEZyIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFKakVxOGZNUmNYQm1sOUpkWkFzcUxqaU9wVGZic2dYYUd6dDZaQUhla0FtV0lUOUdPdWpkSlFjMVlkMFR5SjYwWkF5Mm5PWkFRemtCREUwbU1wdkZ3WDN5cTdkVnppWkNFYjR3NkZQRnlOSVdiY29aQVc1RWEwdjJNOXdxYnd4SXBITkFESTBCZXB5eFg1UU9NN3dtUDhaQWI3NVlKQ04xR213a2d6eXRjQjBRVFNBRXlDc1lZWkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTY1NDM0NTk2MX0; fbsr_124024574287414=d4okoqSIG-fbjXgJKE07737dLXrQkN682RmOZvAdn8M.eyJ1c2VyX2lkIjoiMTAwMDQxMDU2ODc1NDA4IiwiY29kZSI6IkFRQ3ZLZkpVdzZ3WkVaUmhleTRodjFyV05BZ0JlUXM1cVRlVTJnWnZrbjkxOXllN2lfUGM1a2VjUHRIZF9qdy1KS2tDcE9Jb3ZTUmF0SGxDaTZNdzFCODFYdXJ0OEZ4aVZKVGNTMzRLbVFMVHFYVzY5NGU1X0ltcDFZSmdWSVBwLUFwblpJbkRkWWRYSURSSk9oRVZScGNuRVE1MVMwNWtXeFZxZ0EwQzZRN1VsQzcxVTdCLWNDS0haNzk3cU9vYk9yRl9mcHVZdUs3a3Fic1djaU5NVF9TbkszN2kyLVFxalEtei1SanF3bFNONnNxWXJWaUhfbTIzSWJWdUVwZUZxRzYweldoR0NxLUM5TXF5dHNYTGRzM3NNY25IS3Z0Tmc2VzIxRHFpM3poSGQybFNQUS1IR2U1ZERkUWIyS3liZzlYUXNCX3FvemhWOHI3WVBFLVYwUmI3V2s5VEpiMWNaMlBQcEFPaDJRR0lEZyIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFKakVxOGZNUmNYQm1sOUpkWkFzcUxqaU9wVGZic2dYYUd6dDZaQUhla0FtV0lUOUdPdWpkSlFjMVlkMFR5SjYwWkF5Mm5PWkFRemtCREUwbU1wdkZ3WDN5cTdkVnppWkNFYjR3NkZQRnlOSVdiY29aQVc1RWEwdjJNOXdxYnd4SXBITkFESTBCZXB5eFg1UU9NN3dtUDhaQWI3NVlKQ04xR213a2d6eXRjQjBRVFNBRXlDc1lZWkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTY1NDM0NTk2MX0",
          "set-cookie":
            "csrftoken=7ZyQtU7rsZFsOgvKLjflk0KLMmTC4Chh; Domain=.instagram.com; expires=Sat, 03-Jun-2023 12:35:09 GMT; Max-Age=31449600; Path=/; Secure",
        },
      })
      .then(({ data }) => {
        const user = data.graphql.user;
        let result = {
          id: user.id,
          biography: user.biography,
          followers: user.edge_followed_by.count,
          following: user.edge_follow.count,
          fullName: user.full_name,
          highlightCount: user.highlight_reel_count,
          isBusinessAccount: user.is_business_account,
          isRecentUser: user.is_joined_recently,
          accountCategory: user.business_category_name,
          linkedFacebookPage: user.connected_fb_page,
          isPrivate: user.is_private,
          isVerified: user.is_verified,
          profilePicHD: user.profile_pic_url_hd,
          username: user.username,
          postsCount: user.edge_owner_to_timeline_media.count,
        };
        resolve(result);
      })
      .catch(reject);
  });
}

export async function twitter(link) {
  return new Promise((resolve, reject) => {
    let config = {
      URL: link,
    };
    axios
      .post("https://twdown.net/download.php", qs.stringify(config), {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "sec-ch-ua":
            '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          cookie:
            "_ga=GA1.2.1388798541.1625064838; _gid=GA1.2.1351476739.1625064838; __gads=ID=7a60905ab10b2596-229566750eca0064:T=1625064837:RT=1625064837:S=ALNI_Mbg3GGC2b3oBVCUJt9UImup-j20Iw; _gat=1",
        },
      })
      .then(({ data }) => {
        const $ = cheerio.load(data);
        resolve({
          desc: $("div:nth-child(1) > div:nth-child(2) > p").text().trim(),
          thumb: $("div:nth-child(1) > img").attr("src"),
          HD: $("tbody > tr:nth-child(1) > td:nth-child(4) > a").attr("href"),
          SD: $("tr:nth-child(2) > td:nth-child(4) > a").attr("href"),
          audio:
            "https://twdown.net/" +
            $(
              "body > div.jumbotron > div > center > div.row > div > div:nth-child(5) > table > tbody > tr:nth-child(3) > td:nth-child(4) > a"
            ).attr("href"),
        });
      })
      .catch(reject);
  });
}

export async function fbDown2(url) {
  return new Promise((resolve, reject) => {
    axios.get("https://saveas.co/").then(({ data }) => {
      const $ = cheerio.load(data);
      let token = $("#token").attr("value");
      axios("https://saveas.co/system/action.php", {
        method: "POST",
        data: "url=" + encodeURIComponent(url + "/") + "token=" + token,
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(reject);
    });
  });
}

export async function fbdown(link) {
  return new Promise((resolve, reject) => {
    let config = {
      url: link,
    };
    axios("https://www.getfvid.com/downloader", {
      method: "POST",
      data: new URLSearchParams(Object.entries(config)),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        cookie:
          "_ga=GA1.2.1310699039.1624884412; _pbjs_userid_consent_data=3524755945110770; cto_bidid=rQH5Tl9NNm5IWFZsem00SVVuZGpEd21sWnp0WmhUeTZpRXdkWlRUOSUyQkYlMkJQQnJRSHVPZ3Fhb1R2UUFiTWJuVGlhVkN1TGM2anhDT1M1Qk0ydHlBb21LJTJGNkdCOWtZalRtZFlxJTJGa3FVTG1TaHlzdDRvJTNE; cto_bundle=g1Ka319NaThuSmh6UklyWm5vV2pkb3NYaUZMeWlHVUtDbVBmeldhNm5qVGVwWnJzSUElMkJXVDdORmU5VElvV2pXUTJhQ3owVWI5enE1WjJ4ZHR5NDZqd1hCZnVHVGZmOEd0eURzcSUyQkNDcHZsR0xJcTZaRFZEMDkzUk1xSmhYMlY0TTdUY0hpZm9NTk5GYXVxWjBJZTR0dE9rQmZ3JTNEJTNE; _gid=GA1.2.908874955.1625126838; __gads=ID=5be9d413ff899546-22e04a9e18ca0046:T=1625126836:RT=1625126836:S=ALNI_Ma0axY94aSdwMIg95hxZVZ-JGNT2w; cookieconsent_status=dismiss",
      },
    })
      .then(async ({ data }) => {
        const $ = cheerio.load(data);
        resolve({
          Normal_video: $(
            "body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a"
          ).attr("href"),
          HD: $(
            "body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a"
          ).attr("href"),
          audio: $(
            "body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(2) > a"
          ).attr("href"),
        });
      })
      .catch(reject);
  });
}

export async function youtube(link) {
  return new Promise((resolve, reject) => {
    const ytIdRegex =
      /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;
    if (ytIdRegex.test(link)) {
      let url = ytIdRegex.exec(link);
      let config = {
        url: "https://www.youtube.be/" + url,
        q_auto: 0,
        ajax: 1,
      };
      let headerss = {
        "sec-ch-ua":
          '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Cookie:
          'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}',
      };
      axios("https://www.y2mate.com/mates/en68/analyze/ajax", {
        method: "POST",
        data: new URLSearchParams(Object.entries(config)),
        headers: headerss,
      })
        .then(({ data }) => {
          const $ = cheerio.load(data.result);
          let img = $("div.thumbnail.cover > a > img").attr("src");
          let title = $("div.thumbnail.cover > div > b").text();
          let size = $(
            "#mp4 > table > tbody > tr:nth-child(3) > td:nth-child(2)"
          ).text();
          let size_mp3 = $(
            "#audio > table > tbody > tr:nth-child(1) > td:nth-child(2)"
          ).text();
          let id = /var k__id = "(.*?)"/.exec(data.result)[1];
          let configs = {
            type: "youtube",
            _id: id,
            v_id: url[1],
            ajax: "1",
            token: "",
            ftype: "mp4",
            fquality: 480,
          };
          axios("https://www.y2mate.com/mates/en68/convert", {
            method: "POST",
            data: new URLSearchParams(Object.entries(configs)),
            headers: headerss,
          }).then(({ data }) => {
            const $ = cheerio.load(data.result);
            let link = $("div > a").attr("href");
            let configss = {
              type: "youtube",
              _id: id,
              v_id: url[1],
              ajax: "1",
              token: "",
              ftype: "mp3",
              fquality: 128,
            };
            axios("https://www.y2mate.com/mates/en68/convert", {
              method: "POST",
              data: new URLSearchParams(Object.entries(configss)),
              headers: headerss,
            }).then(({ data }) => {
              const $ = cheerio.load(data.result);
              let audio = $("div > a").attr("href");
              resolve({
                id: url[1],
                title: title,
                size: size,
                quality: "480p",
                thumb: img,
                link: link,
                size_mp3: size_mp3,
                mp3: audio,
              });
            });
          });
        })
        .catch(reject);
    } else reject("link invalid");
  });
}

export async function ttdownloader(url) {
  return new Promise(async (resolve, reject) => {
    axios
      .get("https://ttdownloader.com/", {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          cookie:
            "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061",
        },
      })
      .then(({ data }) => {
        const $ = cheerio.load(data);
        let token = $("#token").attr("value");
        let config = {
          url: url,
          format: "",
          token: token,
        };
        axios("https://ttdownloader.com/query/", {
          method: "POST",
          data: new URLSearchParams(Object.entries(config)),
          headers: {
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            cookie:
              "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061",
          },
        }).then(({ data }) => {
          const $ = cheerio.load(data);
          resolve({
            nowm: $("div:nth-child(2) > div.download > a").attr("href"),
            wm: $("div:nth-child(3) > div.download > a").attr("href"),
            audio: $("div:nth-child(4) > div.download > a").attr("href"),
          });
        });
      })
      .catch(reject);
  });
}

export async function styletext(teks) {
  return new Promise((resolve, reject) => {
    axios.get("http://qaz.wtf/u/convert.cgi?text=" + teks).then(({ data }) => {
      let $ = cheerio.load(data);
      let hasil = [];
      $("table > tbody > tr").each(function (a, b) {
        hasil.push({
          name: $(b).find("td:nth-child(1) > h6 > a").text(),
          result: $(b).find("td:nth-child(2)").text().trim(),
        });
      }),
        resolve(hasil);
    });
  });
}

export async function watuksolatmy() {
  return new Promise((resolve, reject) => {
    axios.get("https://www.waktusolat.my/").then(({ data }) => {
      const $ = cheerio.load(data);
      let hasil = [];
      $("#waktu-semua > tbody > tr").each(function (a, b) {
        hasil.push({
          Negeri: $(b).find("td:nth-child(1) > h6 > a").text(),
          Waktuk: {
            Imsak: $(b).find("td:nth-child(2)").text(),
            Subuh: $(b).find("td:nth-child(3)").text(),
            Syuruk: $(b).find("td:nth-child(4)").text(),
            Zohor: $(b).find("td:nth-child(5)").text(),
            Asar: $(b).find("td:nth-child(6)").text(),
            Maghrib: $(b).find("td:nth-child(7)").text(),
            Isyak: $(b).find("td:nth-child(8)").text(),
          },
        });
      });
      let tarih = $(
        "#wrapper > main > section.cr-section.salat-times-area.bg--pattern.bg--pattern.bg--white.flower--right-bottom > div > div.col-lg-12.col-xl-8 > div > div > h5"
      ).text();

      var hasill = {
        Tarikh: tarih,
        results: hasil,
      };
      resolve(hasill);
    });
  });
}

export async function soundcloud(url) {
  return new Promise((resolve, reject) => {
    axios.get("https://soundcloudmp3.org/id").then((data) => {
      let a = cheerio.load(data.data);
      let token = a("form#conversionForm > input[type=hidden]").attr("value");
      const options = {
        method: "POST",
        url: `https://soundcloudmp3.org/converter`,
        headers: {
          "content-type": "application/x-www-form-urlencoded;",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
          Cookie: data["headers"]["set-cookie"],
        },
        formData: {
          _token: token,
          url: url,
        },
      };
      request(options, async function (error, response, body) {
        if (error) return reject();
        $get = cheerio.load(body);
        const result = {
          title: $get("#preview > div:nth-child(3) > p:nth-child(2)")
            .text()
            .replace("Title:", ""),
          duration: $get("#preview > div:nth-child(3) > p:nth-child(3)")
            .text()
            .replace(/Length\:|Minutes/g, ""),
          quality: $get("#preview > div:nth-child(3) > p:nth-child(4)")
            .text()
            .replace("Quality:", ""),
          thumbnail: $get("#preview > div:nth-child(3) > img").attr("src"),
          download: $get("#download-btn").attr("href"),
        };
        resolve(result);
      });
    });
  });
}

export async function telesticker(url) {
  return new Promise(async (resolve, reject) => {
    packName = url.replace("https://t.me/addstickers/", "");
    data = await axios(
      `https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(
        packName
      )}`,
      { method: "GET", headers: { "User-Agent": "GoogleBot" } }
    );
    const hasil = [];
    for (let i = 0; i < data.data.result.stickers.length; i++) {
      fileId = data.data.result.stickers[i].thumb.file_id;
      data2 = await axios(
        `https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`
      );
      result = {
        url:
          "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" +
          data2.data.result.file_path,
      };
      hasil.push(result);
    }
    resolve(hasil);
  });
}

export async function stickersearch(text) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://getstickerpack.com/stickers?query=${text}`)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const source = [];
        const link = [];
        var ya = $("#stickerPacks > div > div:nth-child(3) > div > a").text();
        if (!ya) return resolve();
        $("#stickerPacks > div > div:nth-child(3) > div > a").each(function (
          a,
          b
        ) {
          source.push($(b).attr("href"));
        });
        axios
          .get(source[Math.floor(Math.random() * source.length)])
          .then(({ data }) => {
            const $$ = cheerio.load(data);
            $$("#stickerPack > div > div.row > div > img").each(function (
              c,
              d
            ) {
              link.push(
                $$(d)
                  .attr("src")
                  .replace(/&d=200x200/g, "")
              );
            });
            result = {
              title: $$("#intro > div > div > h1").text(),
              sticker_url: link,
            };
            resolve(result);
          });
      })
      .catch(reject);
  });
}

export async function ssweb(url, device = "desktop") {
  return new Promise((resolve, reject) => {
    const base = "https://www.screenshotmachine.com";
    const param = {
      url: url,
      device: device,
      cacheLimit: 0,
    };
    axios({
      url: base + "/capture.php",
      method: "POST",
      data: new URLSearchParams(Object.entries(param)),
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    })
      .then((data) => {
        const cookies = data.headers["set-cookie"];
        if (data.data.status == "success") {
          axios
            .get(base + "/" + data.data.link, {
              headers: {
                cookie: cookies.join(""),
              },
              responseType: "arraybuffer",
            })
            .then(({ data }) => {
              resolve(data);
            });
        } else {
          reject();
        }
      })
      .catch(reject);
  });
}
