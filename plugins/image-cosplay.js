import fs from "fs";

let handler = async (m, { conn, usedPrefix }) => {
  let cos = JSON.parse(fs.readFileSync("./json/cosplay.json"));
  let res = cos.getRandom();
  conn.sendButtonImg(
    m.chat,
    res,
    "❏  *C O S P L A Y*\n\nTch, Nih Wibu",
    author,
    "Next",
    usedPrefix + "cosplay",
    m
  );
};
handler.help = ["cosplay"];
handler.tags = ["anime"];
handler.command = ["cosplay"];

export default handler;
