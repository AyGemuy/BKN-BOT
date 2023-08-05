import { googleImage } from "@bochilteam/scraper";
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Use example ${usedPrefix}${command} Minecraft`;
  const res = await googleImage(text);
  let image = res.getRandom();
  let link = image;
  conn.sendHydrated(
    m.chat,
    `
*${htki} GOOGLE IMAGE ${htka}*
ðŸ”Ž *Result:* ${text}
ðŸŒŽ *Source:* Google
`,
    wm,
    link,
    link,
    "ðŸ”— URL",
    null,
    null,
    [
      ["Next", `.image ${text}`],
      [null, null],
      [null, null],
    ],
    m
  );
};
handler.help = ["gimage <query>", "image <query>"];
handler.tags = ["internet", "tools"];
handler.command = /^(gimage|image)$/i;
handler.limit = true;

export default handler;
