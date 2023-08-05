import fetch from "node-fetch";
import { xnxxsearch } from "../lib/xnxx.js";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (db.data.users[m.sender].premiumTime < 1) return m.reply(txtprem);
  if (!text) throw `Example : ${usedPrefix + command} step sister`;
  try {
    let anu = await xnxxsearch(`${encodeURIComponent(text)}`);
    let xnxx_txt = `*[ XNXX SEARCH ]*\n\n`;
    for (let x of anu.result) {
      xnxx_txt += `*Title*: ${x.title}\n`;
      xnxx_txt += `*Info*: ${x.info}\n`;
      xnxx_txt += `*Link*:. ${x.link}`;

      xnxx_txt += `\n\n==================================\n\n`;
    }
    m.reply(xnxx_txt);
  } catch (e) {
    console.log(e);
    m.reply("Error!");
  }
};

handler.help = ["xnxxs <teks>"];
handler.tags = ["premium"];
handler.command = /^(xnxx(s(earch)?))$/i;

handler.premium = true;

export default handler;
