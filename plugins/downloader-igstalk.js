/*import { igStalk } from "../scraper/igstalker.js";

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0])
    throw `Gunakan format ${usedPrefix}${command} [username]\nContoh: ${usedPrefix}${command} jokowi`;
  let res = await igStalk(args[0]);
  let cap = `[×] Stalking Instagram [×]

*Name:* ${res.name}
*User Name:* ${res.username}
*Post:* ${res.posts}
*Followers:* ${res.followers}
*Following:* ${res.following}
*Bio:* ${res.description}`;
  conn.sendMessage(
    m.chat,
    {
      image: { url: "https://telegra.ph/file/da16232ab3bc64f832d28.jpg" },
      caption: cap,
      footer: "INSTAGRAM - STALK",
      templateButtons: [
        {
          index: 1,
          urlButton: {
            displayText: `Go To Instagram`,
            url: "https://instagram.com/" + res.username,
          },
        },
      ],
    },
    { quoted: m }
  );
};
handler.help = ["igstalk <username>"];
handler.tags = ["tools"];
handler.command = /^(igstalk)$/i;
handler.limit = true;

export default handler;
*/
