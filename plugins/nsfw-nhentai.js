import fs from "fs";
import { NHentai } from "@shineiichijo/nhentai-ts";
import { extractImageThumb } from "@adiwajshing/baileys";

let nhentai = new NHentai();

let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (db.data.users[m.sender].premiumTime < 1) return m.reply(txtprem);
  switch (command) {
    case "nhentai":
    case "nhentaidl":
      {
        if (!text)
          return m.reply(
            `Masukan kode\n *Contoh* : ${usedPrefix + command} 402779`
          );
        try {
          let res = await nhentai.getDoujin(text);
          m.reply("Wait Lagi Convert PDF...");
          await res.images.PDF("./tmp/" + res.title + ".pdf");
          let buffer = await extractImageThumb(await func.getBuffer(res.cover));
          setTimeout(async () => {
            await conn.sendMessage(
              m.chat,
              {
                document: fs.readFileSync("./tmp/" + res.title + ".pdf"),
                jpegThumbnail: buffer.buffer,
                fileName: res.title + ".pdf",
                mimetype: "application/pdf",
              },
              {
                quoted: m,
              }
            );
          }, 5000);
        } catch (err) {
          console.log(err);
          m.reply("*Invalid Code !*");
        }
      }
      break;
    case "nhentais":
    case "nhentaisearch":
      {
        if (!text)
          return m.reply(
            `Masukan Query\n*Contoh* : ${usedPrefix + command} gotoubun`
          );
        try {
          let res = await nhentai.search(text);
          let nh_txt = `*[ NHentai Search ]*\n\n`;
          nh_txt += `*Current Page:* ${res.pagination.currentPage}\n`;
          nh_txt += `*Total Page:* ${res.pagination.totalPages}\n\n`;
          for (let i of res.data) {
            nh_txt += `*ID:* ${i.id}\n`;
            nh_txt += `*Title:* ${i.title}\n`;
            nh_txt += `*URL:* ${i.url}`;
            nh_txt += `\n\n=============================\n\n`;
          }
          m.reply(nh_txt);
        } catch (err) {
          console.log(err);
          m.reply("*Not found*");
        }
      }
      break;
  }
};
handler.help = handler.command = [
  "nhentai",
  "nhentaidl",
  "nhentaisearch",
  "nhentais",
];
handler.tags = ["premium", "nsfw", "downloader"];

export default handler;
