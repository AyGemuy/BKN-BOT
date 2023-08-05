import fetch from "node-fetch";
import fs from "fs";
import path, { join } from "path";

const { version } = JSON.parse(fs.readFileSync("./package.json", "utf8"));

let handler = async (m, { conn, usedPrefix, command }) => {
  let menu = `Hai °@${m.sender.split("@")[0]}°

*${namebot_1}* adalah bot Nodejs yg membantu membuat sticker, dan membuat kalian bermain dengan senang-senang.

Berikut list yang tersedia:

• ${usedPrefix}rules [ Menampilkan Peraturan Bot ] 
• ${usedPrefix}allmenu [ Menampilkan Semua Perintah ]
• ${usedPrefix}profile [ Info your profile ]
• ${usedPrefix}dompet [ Check your money ] 

${new Date().getFullYear()} © ${nameown}
Bot masih dalam tahap Pengembangan.`;
  await conn.reply(m.chat, menu, m, {
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: `© ${nameown} v${version} (Public)`,
        body: null,
        mediaType: 1,
        previewType: 0,
        showAdAttribution: true,
        renderLargerThumbnail: true,
        thumbnail: (
          await conn.getFile(process.cwd() + "/media/thumbnail.jpg")
        ).data,
        thumbnailUrl: sig,
        sourceUrl: sig,
      },
    },
  });
};
handler.help = ["menu", "help"];
handler.tags = ["main"];
handler.command = ["menu", "help"];

export default handler;
