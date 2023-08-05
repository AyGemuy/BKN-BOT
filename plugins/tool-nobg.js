import { RemoveBackground } from "../scraper/removebg.js";
import fs from "fs";
import uploadImg from "../lib/uploadImage.js";
import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime)
    throw `Reply Image With Caption ${
      usedPrefix + command
    }\nOr\nSend Image With Caption ${usedPrefix + command}`;
  let media = await q.download(true);
  m.reply(global.wait);
  media = await uploadImg(media);
  media = await RemoveBackground(media);
  media = await fetch(media.url).then((x) => x.json());
  console.log(media);
  conn.sendFile(m.chat, media, "", "", m);
};
handler.help = ["removebg"];
handler.tags = ["tools"];
handler.command = /^(no|remove)bg$/i;

export default handler;
