import fs from "fs";
import fetch from "node-fetch";

let handler = async (m, { conn }) => {
  let hina = fs.readFileSync("./json/hinata.json");
  let res = `${pickRandom(hina)}`;
  conn.sendFile(m.chat, await (await fetch(res)).buffer(), "", "Hinata", m);
};
handler.command = ["hina"];

export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
