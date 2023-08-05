import { tiktok } from "../lib/tiktok.js";
import { youtubedlv2 } from "@bochilteam/scraper";
import instagramGetUrl from "instagram-url-direct";
import spit from "performance-now";
const times = spit();
const latensi = spit() - times;
const fetching = latensi.toFixed(4) + " ms";

let handler = (m) => m;
handler.before = function (m) {
  let budy = typeof m.text == "string" ? m.text : "";
  let extract = budy ? generateLink(budy) : null;
  if (extract && !m.isCommand) {
    if (db.data.chats[m.chat].autodl && !m.isBaileys) {
      // regex
      let regexTik =
        /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/;
      let regexIg =
        /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/;
      let regexYt =
        /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;
      // detect
      let instagram = extract.filter((v) => igFix(v).match(regexIg));
      let tiktokdl = extract.filter((v) => ttFix(v).match(regexTik));
      let youtube = extract.filter((v) => v.match(regexYt));
      // tiktok

      if (tiktokdl != 0) {
        tiktokdl.map(async (url) => {
          tiktok(url).then(async (v) => {
            let capt = `${v.title}

   *◦ Creator :* ${namebot_1}
   *◦ Fecthing :* ${fetching}

*乂 T I K T O K - D O W N L O A D E R*`;
            this.sendFile(m.chat, v.nowm, "", capt, m);
          });
        });
      }
      // instagram
      if (instagram != 0) {
        instagram.map(async (url) => {
          try {
            await instagramGetUrl(url).then((res) => {
              for (let i of res.url_list) {
                this.sendFile(
                  m.chat,
                  i,
                  "ig.mp4",
                  "🍟 Fetching : " + fetching,
                  m
                );
              }
            });
          } catch (e) {
            m.reply("*🚩 Gagal mengunduh media.*");
            throw e;
          }
        });
      }
      // youtube
      if (youtube != 0) {
        youtube.map(async (url) => {
          await youtubedlv2(url).then(async (v) => {
            let vid = await v.video["360p"];
            let ytcp = `${v.title}
   
   *• Quality :* ${vid.quality}
   *• Size :* ${vid.fileSizeH}
   
乂 *Y O U T U B E - V I D E O*`;
            this.sendFile(m.chat, await vid.download(), "", ytcp, m);
          });
        });
      }
    }
  }
  return true;
};

export default handler;

function generateLink(text) {
  let regex =
    /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
  return text.match(regex);
}

function ttFix(url) {
  if (!url.match(/(tiktok.com\/t\/)/g)) return url;
  let id = url.split("/t/")[1];
  return "https://vm.tiktok.com/" + id;
}

function igFix(url) {
  let count = url.split("/");
  if (count.length == 7) {
    let username = count[3];
    let destruct = this.removeItem(count, username);
    return destruct.map((v) => v).join("/");
  } else return url;
}
