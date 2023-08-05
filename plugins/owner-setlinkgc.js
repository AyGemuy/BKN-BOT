let handler = async (m, { conn, text }) => {
  if (!text) throw "Masukan Link Group !";
  m.reply(`Link Group berhasil diset menjadi :\n${text}`);
  global.db.data.datas.linkgc = text;
};
handler.help = ["setlinkgc"];
handler.tags = ["owner", "group"];
handler.command = /^setlink(gc)$/i;

handler.owner = true;

export default handler;
