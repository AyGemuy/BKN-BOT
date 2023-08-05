import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Example : ${command} black rover`;
  m.reply(`Tunggu Ya Kakak, ${wm}..~_~ Carikan`);
  let res = await fetch(
    `https://api.lolhuman.xyz/api/otakudesusearch?apikey=SadTeams&query=${text}`
  );
  let res2 = await res.json();
  let ini_txt = `Hasil Pencarian Dari ${text}\n\n`;
  for (let get_result of res2.result) {
    ini_txt += `Title : ${get_result.title}\n`;
    ini_txt += `Japanese : ${get_result.japanese}\n`;
    ini_txt += `Judul : ${get_result.judul}\n`;
    ini_txt += `Type : ${get_result.type}\n`;
    ini_txt += `Episode : ${get_result.episodes}\n`;
    ini_txt += `Aired : ${get_result.aired}\n`;
    ini_txt += `Producers : ${get_result.producers}\n`;
    ini_txt += `Genre : ${get_result.genres}\n`;
    ini_txt += `Duration : ${get_result.duration}\n`;
    ini_txt += `Studios : ${get_result.status}\n`;
    ini_txt += `Rating : ${get_result.rating}\n`;
    ini_txt += `Credit : ${get_result.credit}\n`;
  }
  m.reply(ini_txt);
};
handler.command = ["otakdesu"];

export default handler;
