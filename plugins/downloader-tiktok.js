import { tiktok } from "../lib/tiktok.js";
import fetch from "node-fetch";
import { tiktokdlv2 } from "@bochilteam/scraper";

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  switch (command) {
    case "tt":
    case "tiktok":
    case "tiktokdl":
      {
        if (!text)
          throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`;
        if (!text.match(/tiktok\.com/g)) throw "Link Invalid* !";
        try {
          let res = await tiktok(text);
          let cap = `${res.title}\n\n*[-] Author :* ${res.author}\n*[-] Creator :* Arifzyn`;
          await conn.sendFile(m.chat, res.nowm, "", cap, m);
        } catch (e) {
          console.log(e);
          try {
            let dl = await fetch(
              `https://api.arifzynstore.my.id/api/download/tiktok?url=${text}&apikey=ArifzynXD`
            );
            let mek = await dl.json();
            await conn.sendFile(
              m.chat,
              mek.result.video,
              "video.mp4",
              mek.result.description,
              m
            );
          } catch (e) {
            console.log(e);
            try {
              let data = await fetch(
                `https://arifzyn-apis.arifzynxd.repl.co/api/dowloader/tikok?url=${text}&apikey=626abfe9`
              );
              let hsil = await data.json();
              conn.sendFile(
                m.chat,
                hsil.result.video,
                "",
                `${hsil.result.description}\n\n${hsil.result.username}` +
                  "\n\n© By ArifzynXD - 2023",
                m
              );
            } catch (e) {
              console.log(e);
              try {
                let anu = await fetch(
                  `https://api.zahwazein.xyz/downloader/tiktok?apikey=cahyodev&url=${text}`
                );
                let res = await anu.json();
                const { id, title, video, author } = res.result;
                let arifzyn = `${title}\n\n*ID :* ${id}\n*Name :* ${author.name}\n*Signature :* ${author.signature}`;
                const Arif = await conn.sendFile(
                  m.chat,
                  video.cover,
                  "",
                  arifzyn,
                  m
                );
                await conn.sendFile(
                  m.chat,
                  video.noWatermark,
                  "",
                  "By Arifzyn",
                  Arif
                );
              } catch (e) {
                console.log(e);
                m.reply("Maap Sepertinya Ada Yang Error... !");
              }
            }
          }
        }
      }
      break;
    case "ttmp3":
    case "ttaudio":
    case "tiktokmp3":
    case "tiktokaudio":
      {
        if (!text) throw "Masukan URL TikTok";
        if (!text.match(/tiktok\.com/g)) throw "Link Invalid* !";
        try {
          let res = await fetch(
            `https://api.arifzynstore.my.id/api/download/tiktok?url=${text}&apikey=ArifzynXD`
          );
          let data = await res.json();
          m.reply(wait);
          await conn.sendFile(
            m.chat,
            data.result.audio,
            "auduo.mp3",
            "",
            m,
            null,
            { mimetype: "audio/mp4" }
          );
        } catch (err) {
          console.log(err);
          m.reply(eror);
        }
      }
      break;
    case "tiktokimg":
    case "ttimg":
      {
        if (!text) throw "Masukan URL TikTok";
        if (!text.match(/tiktok\.com/g)) throw "Link Invalid* !";
        try {
          let res = await fetch(
            `https://api.arifzynstore.my.id/api/download/tiktok?url=${text}&apikey=ArifzynXD`
          );
          let data = await res.json();
          await conn.sendFile(
            m.chat,
            data.result.photo[0].url_download,
            "",
            "",
            m
          );
        } catch (err) {
          console.log(err);
          m.reply(eror);
        }
      }
      break;
  }
};
handler.command =
  /^(tt|tiktok|ttmp3|ttaudio|tiktokmp3|tiktokaudio|ttimg|tiktokimg)$/i;
handler.help = ["tiktok", "tt"];
handler.tags = ["downloader"];

export default handler;
