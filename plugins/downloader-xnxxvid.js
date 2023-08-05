import fetch from "node-fetch";

let handler = async (m, { conn, text }) => {
  if (!text) throw "url salah";
  if (db.data.users[m.sender].premiumTime < 1)
    return m.reply("KHUSUS PREMIUM USER");
  m.reply(wait);
  await conn.sendFile(
    m.chat,
    text,
    "xnxx.mp4",
    "Awas dosa kakak ini banyakk ><",
    m
  );
};
handler.command = /^(xnxxvid(io)?)$/i;

handler.premium = true;

export default handler;
