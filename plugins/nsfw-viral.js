import fs from "fs";
import fetch from "node-fetch";

let handler = async (m, { conn }) => {
  if (global.db.data.users[m.sender].premiumTime < 1)
    return conn.reply(m.chat, "𝐅𝐈𝐓𝐔𝐑 𝐈𝐍𝐈 𝐊𝐇𝐔𝐒𝐔𝐒 𝐏𝐑𝐄𝐌𝐈𝐔𝐌!!", m);
  let _fun = JSON.parse(fs.readFileSync("./json/viral.json"));
  let json = _fun[Math.floor(Math.random() * _fun.length)];
  let caption = `❏  *RANDOM - VIRAL*\n\n`;
  caption += `${json.title}\n\n`;
  caption += author;
  conn.sendFile(
    m.chat,
    await (await fetch(json.path)).buffer(),
    "video.mp4",
    caption,
    m
  );
};
handler.help = ["viral"];
handler.tags = ["nsfw"];
handler.command = ["viral"];

export default handler;
