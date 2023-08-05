import fs from "fs";

let handler = async (m, { conn, usedPrefix, command }) => {
  let hentai = JSON.parse(fs.readFileSync("./json/darkjoke.json"));
  let res = hentai[Math.floor(Math.random() * hentai.length)];
  conn.sendButtonImg(
    m.chat,
    res,
    "❏  *D A R K J O K E S*\n\nTch, Nih Random DarkJokes",
    author,
    "Next",
    usedPrefix + "hentai",
    m
  );
};
handler.help = ["darkjoke"];
handler.tags = ["internet", "random"];
handler.command = /^(darkjoke|darkjokes)$/i;

handler.limit = true;

export default handler;
