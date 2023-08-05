let handler = async (m, { usedPrefix, text }) => {
  const data = db.data.datas;
  let id = m.chat;
  if (id in data.absen) {
    await conn.sendButton(
      m.chat,
      `_*Masih ada absen di chat ini!*_\n\n*${usedPrefix}hapusabsen* - untuk menghapus absen`,
      author,
      null,
      [["DELETE ABSEN", usedPrefix + "hapuabsen"]],
      m
    );
  }
  data.absen[id] = [
    await conn.sendButton(
      m.chat,
      `Berhasil memulai absen!\n\n*${usedPrefix}absen* - untuk absen\n*${usedPrefix}cekabsen* - untuk mengecek absen\n*${usedPrefix}hapusabsen* - untuk menghapus data absen`,
      author,
      null,
      [["Absen", usedPrefix + "absen"]],
      m
    ),
    [],
    text,
  ];
};
handler.help = ["mulaiabsen [teks]"];
handler.tags = ["absen"];
handler.command = /^(start|mulai)absen$/i;
handler.group = true;
handler.admin = true;
export default handler;
