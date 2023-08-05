import { simtalk } from "simsimi-api";

let handler = async (m, { conn, text }) => {
  if (!text) throw "Masukan Text";
  try {
    const { message } = await simtalk(text, "id");
    m.reply(message);
  } catch (err) {
    console.log(err);
    m.reply("Apa kamu yang kamu katakan ?");
  }
};
handler.help = handler.command = ["simi"];
handler.tags = ["fun"];

export default handler;
