import { hentaivid } from "../lib/hentaivid.js";

let handler = async (m, { conn }) => {
  const res = await hentaivid();
  const hti = res.getRandom();
  let cap = `*Title :* ${hti.title}
*Category :* ${hti.category}
*Share :* ${hti.share_count}
*Views :* ${hti.views_count}
*Type :* ${hti.type}
*Link :* ${hti.link}`;
  m.reply(cap);
  await conn.sendFile(m.chat, hti.video_1, "hentai.mp4", hti.title, m);
};
handler.help = ["hentaivid"];
handler.tags = ["nsfw", "premium"];
handler.command = ["hentaivid"];
handler.premium = true;

export default handler;
