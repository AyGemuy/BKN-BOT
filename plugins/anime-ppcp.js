import fetch from "node-fetch";
let handler = async (m, { conn, command }) => {
  let anu = await fetch(
    `https://raw.githubusercontent.com/ArifzynXD/database/master/random_image/ppcp.js`
  );
  let res = await anu.json();
  let cpp = res.getRandom();
  conn.sendButton(
    m.chat,
    "𝙶𝚒𝚛𝚕𝚜",
    wm,
    cpp.cewe,
    [["🔄 Next 🔄", `/${command}`]],
    m
  );
  conn.sendButton(
    m.chat,
    "𝙱𝚘𝚢𝚜",
    wm,
    cpp.cowo,
    [["🔄 Next 🔄", `/${command}`]],
    m
  );
};
handler.help = ["ppcouple"];
handler.tags = ["internet"];
handler.command = /^(ppcp|ppcouple)$/i;
export default handler;
