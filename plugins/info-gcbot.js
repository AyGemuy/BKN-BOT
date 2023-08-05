let handler = async (m, { conn }) => {
  const gc = db.data.datas.linkgc;
  conn.reply(m.chat, "*[ Group Bot ]*\n" + gc, fkontak);
};
handler.help = ["gcbot"];
handler.tags = ["info"];
handler.command = ["gcbot", "gruopbot"];

export default handler;
