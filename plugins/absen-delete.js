let handler = async (m, { usedPrefix }) => {
  let id = m.chat;
  let data = db.data.datas;
  if (!(id in data.absen))
    await conn.sendButton(
      m.chat,
      `_*Tidak ada absen berlangsung digrup ini!*_\n\n*${usedPrefix}mulaiabsen* - untuk memulai absen`,
      author,
      null,
      [["Mulai Absen", usedPrefix + "mulaiabsen"]],
      m
    );
  delete data.absen[id];
  m.reply(`Berhasil!`);
};
handler.help = ["hapusabsen"];
handler.tags = ["absen"];
handler.command = /^(delete|hapus)absen$/i;
handler.group = true;
handler.admin = true;
export default handler;
