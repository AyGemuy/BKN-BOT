let handler = async (m, { conn }) => {
  const q = m.quoted;
  if (!q) throw "where's message?";
  const msg = await q?.download?.();
  if (!msg) throw "can't open message!";
  let media = q.mediaMessage[q.mediaType];
  await conn.sendFile(m.chat, await msg, "", await media.caption, m);
};

handler.help = ["readviewonce", "viewonce"];
handler.tags = ["tools"];
handler.command = /^readviewonce|viewonce/i;

export default handler;