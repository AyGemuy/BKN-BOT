import { attp, ttp } from "../scraper/attp.js";
import { sticker } from "../lib/sticker.js";

let handler = async (m, { conn, text, command }) => {
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text;
  switch (command) {
    case "attp":
      {
        let res = await attp(teks);
        let rest = await sticker(res, false, "Create By", "ArifzynXD");
        await conn.sendFile(m.chat, rest, "", "", m, false, {
          asSticker: true,
        });
      }
      break;
    case "ttp":
      {
        let res = await ttp(teks);
        let rest = await sticker(res, false, "Create By", "ArifzynXD");
        await conn.sendFile(m.chat, rest, "", "", m, false, {
          asSticker: true,
        });
      }
      break;
  }
};
handler.help = ["attp <text>", "ttp <text>"];
handler.tags = ["sticker"];
handler.command = ["attp", "ttp"];

export default handler;
