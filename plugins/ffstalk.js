import { ffstalk } from "../scraper/ffstalk.js";

let handler = async (m, { conn, text }) => {
  if (!text) throw "Masukan ID Game Free Fire";
  try {
    let res = await ffstalk(text);
    conn.sendMessage(
      m.chat,
      {
        text: `*ID :* ${res.id}\n*Nick Name :* ${res.nickname}`,
      },
      { quoted: m }
    );
  } catch (e) {
    console.log(e);
    m.reply("Error, Mungkin ID Salah");
  }
};
handler.help = ["ffstalk"];
handler.tags = ["stalker"];
handler.command = ["ffstalk"];

export default handler;
