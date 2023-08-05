import { character } from "../lib/anime.js";

let handler = async (m, { conn, text }) => {
  if (!text) throw "[!] Masukan Query Anime";
  let res = await character(text);
  let results = `${res.name}

${res.detail}`;
  conn.sendFile(m.chat, res.image, "err.jpg", res.detail, m);
};
handler.help = ["chara", "character"];
handler.tags = ["anime"];
handler.command = /^chara|character$/i;

handler.limit = true;

export default handler;
