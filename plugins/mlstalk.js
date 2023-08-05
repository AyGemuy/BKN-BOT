import { mlstalk } from "../scraper/mlstalk.js";

let handler = async (m, { conn, text }) => {
  let [id, zid] = text.split`,`;
  if (!text) throw "Masukan ID Game ML\nContoh : .mlstalk 425307045,9938";
  if (!id) throw "Masukan ID";
  if (!zid) throw "Masuak Zone ID";
  try {
    let res = await mlstalk(id, zid);
    conn.sendMessage(
      m.chat,
      {
        text: `*User Name :* ${res.userName}`,
      },
      { quoted: m }
    );
  } catch (e) {
    console.log(e);
    m.reply("Error, Mungkin ID Salah");
  }
};
handler.help = ["mlstalk"];
handler.tags = ["stalker"];
handler.command = ["mlstalk"];

export default handler;
