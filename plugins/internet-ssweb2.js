import { ssweb } from "../lib/ssweb.js";

let handler = async (m, { conn, text }) => {
  if (!text) throw "Masukan URL Yang Di Awali http/https";
  let res = await ssweb(text);
  conn.sendFile(m.chat, res.result, "", text, m);
};
handler.help = ["ssweb2"];
handler.tags = ["tools"];
handler.command = ["ssweb2"];

handler.limit = true;

export default handler;
