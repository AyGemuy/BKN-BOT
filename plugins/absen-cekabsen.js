let handler = async (m, { conn, usedPrefix }) => {
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

  let d = new Date();
  let date = d.toLocaleDateString("id", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  let absen = data.absen[id][1];
  let list = absen.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join("\n");
  let caption = `*[ TANGGAL ]*\n${date}
${data.absen[id][2]} 
  
*[ SUDAH ABSEN ]*
*Total:* ${absen.length}

${list}

Ketik ${usedPrefix}absen untuk *absen*
Ketik ${usedPrefix}hapusabsen untuk *hapus*
`;
  conn.reply(m.chat, caption, m, {
    mentions: await conn.parseMention(caption),
  });
};
handler.help = ["cekabsen"];
handler.tags = ["absen"];
handler.command = /^cekabsen$/i;
handler.group = true;
handler.admin = true;
export default handler;
