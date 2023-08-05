import fetch from "node-fetch";
import { xnxxdl } from "../lib/xnxx.js";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    throw `uhm.. mau download apa?\n\nContoh: ${
      usedPrefix + command
    } link xnxx`;
  if (db.data.users[m.sender].premiumTime < 1)
    return m.reply("KHUSUS PREMIUM USER");
  let user = global.db.data.users[m.sender];
  if (user.age < 18) throw "umur kamu belum cukup dek!";
  try {
    let res = await xnxxdl(text);
    if (res.status !== 200) throw "Nice";
    let x = res.result;
    let caption = `*${htki} xnxxdl ${htka}*
*💌 title:* ${x.title}
*🗂️ info:* ${x.info}
*📊 duration:* ${x.duration}
    `;
    conn.sendButton(
      m.chat,
      caption,
      author,
      x.image,
      [
        ["LOW", ".xnxxvid " + x.files.low],
        ["HIGH", ".xnxxvid " + x.files.high],
      ],
      m
    );
  } catch (e) {
    throw e;
  }
};
handler.help = ["xnxxdl", "dlxnxx"].map((v) => v + " <url>");
handler.tags = ["downloader"];
handler.command = /^(xnxxdl|dlxnxx)$/i;
handler.register = true;

export default handler;
