//
let { MessageType } = (await import("@adiwajshing/baileys")).default;
import { sticker } from "../lib/sticker.js";
let handler = async (m, { conn, args }) => {
  let stiker = false;
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || "";
    if (/image|video/.test(mime)) {
      let img = await q.download();
      if (!img) throw "Reply stiker nya!";
      stiker = await sticker(
        img,
        false,
        "🍀",
        "🍭 • WH-MODS-BOT-V1 :\nBY WH MODS DEB"
      );
    } else if (args[0])
      stiker = await sticker(
        false,
        args[0],
        "🍀",
        "🎮 • SUBSCRIBE :\n https://youtube.com/channel/UCMx4e8anOq_Olt2nMSv0Cow"
      );
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, "sticker.webp", "", m);
    else throw "Conversion failed";
  }
};
handler.help = ["colong"];
handler.tags = ["sticker"];
handler.command = /^colong$/i;
handler.owner = true;

export default handler;
