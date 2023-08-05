/*import { fbdown } from "../scraper/facebook.js";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  switch (command) {
    case "fb":
    case "facebook":
      {
        if (!text) throw "Masukan URL Facebook..";
        let txt = `Silahkan Pilih Type Quality Di Bawah`;
        conn.sendButton(
          m.chat,
          txt,
          "FACEBOOK - DOWNLOADER",
          [
            ["HD", ".fbhd " + text],
            ["SD", ".fbsd " + text],
          ],
          m
        );
      }
      break;
    case "fbhd":
    case "facebookhd":
      {
        if (!text) throw "Masukan URL Facebook..";
        let res = await fbdown(text);
        m.reply("Wait Bentar Proses...");
        conn.sendFile(m.chat, res.HD, "fb.mp4", "HD Quality", m);
      }
      break;
    case "fbsd":
    case "facebooksd":
      {
        if (!text) throw "Masukan URL Facebook..";
        let rest = await fbdown(text);
        m.reply("Wait Bentar Proses...");
        conn.sendFile(m.chat, rest.Normal_video, "fb.mp4", "SD Quality", m);
      }
      break;
  }
};
handler.help = handler.command = [
  "fb",
  "facebook",
  "fbsd",
  "facebooksd",
  "fbhd",
  "facebookhd",
];
handler.tags = ["downloader"];

handler.limit = 2;

export default handler;
*/
