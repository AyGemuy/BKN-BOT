import { tmpdir } from "os";
import path, { join } from "path";
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch,
} from "fs";
let handler = async (
  m,
  { conn, usedPrefix: _p, __dirname, command, args, text }
) => {
  let ar = Object.keys(plugins);
  let ar1 = ar.map((v) => v.replace(".js", ""));
  if (!text) throw `uhm.. where the text?\n\nexample:\n.df info`;
  const file = join(__dirname, `./${args[0]}`);
  unlinkSync(file);
  conn.reply(m.chat, `Succes deleted ${args[0]}`, m);
};
handler.help = ["df"];
handler.tags = ["owner"];
handler.command = /^(delf)$/i;

handler.mods = true;

export default handler;
