import uploadImage from "../lib/uploadImage.js";
import { ocrSpace } from "ocr-space-api-wrapper";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw "Reply Gambar nya";
  let media = await q.download(true);
  let url = await uploadImage(media);
  const res = await ocrSpace(url);
  m.reply(res.ParsedResults[0].ParsedText);
};
handler.help = ["ocr"];
handler.tags = ["tools"];
handler.command = /^ocr$/i;

export default handler;
