import fs from "fs";
import fetch from "node-fetch";
let handler = async (m, { conn }) => {
  let info = pickRandom([
    `Bot Disini (>ω<)`,
    `Bot Disiniiiii (>.<)`,
    `Bot Disini (><)`,
  ]);
  await conn.reply(m.chat, info, m, {
    contextInfo: {
      externalAdReply: {
        title: wm,
        body: "Yaw? ada apa kak?",
        sourceUrl: snh,
        thumbnail: fs.readFileSync("./thumbnail2.jpg"),
      },
    },
  });
};
handler.customPrefix = /^(bot|bot)$/i;
handler.command = new RegExp();

export default handler;
