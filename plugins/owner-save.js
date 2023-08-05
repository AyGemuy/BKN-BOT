import fs from "fs";
import uploadFile from "../lib/uploadFile.js";
import uploadImage from "../lib/uploadImage.js";

let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
  if (!isOwner) return m.reply("KHUSUS OWNER DEK");
  switch (command) {
    case "simg":
    case "saveimg":
    case "simage":
    case "saveimage":
      {
        if (!text) throw `Contoh ${usedPrefix + command} media/logo.jpg`;
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || "";
        if (!mime) throw "Send Image/Video Or Reply Image/Video";
        let media = await q.download();
        let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
        let link = await (isTele ? uploadImage : uploadFile)(media);
        await fs.writeFileSync("./" + text, link);
        await conn.reply(m.chat, "Sukes Save Media To " + text, m);
      }
      break;
  }
};
handler.help = handler.command = ["saveimg"];
handler.tags = ["owner"];

export default handler;
