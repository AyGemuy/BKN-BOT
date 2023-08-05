import { simtalk } from "simsimi-api";

let handler = (m) => m;

handler.before = async (m) => {
  let chat = global.db.data.chats[m.chat];
  if (chat.simi && !chat.isBanned) {
    if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return;
    if (!m.text) return;
    let res = await simtalk(m.text, "id");
    await m.reply(`${res.message}`);
    return !0;
  }
  return true;
};
export default handler;
