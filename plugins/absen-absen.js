let handler = async (m, { conn, usedPrefix }) => {
  let id = m.chat;
  const data = db.data.datas;
  if (!(id in data.absen)) {
    await conn.sendButton(
      m.chat,
      `Tidak ada absen berlangsung!`,
      author,
      null,
      [["Mulai Absen", usedPrefix + "mulaiabsen"]],
      m
    );
    throw false;
  }
  let absen = data.absen[id][1];
  if (absen.includes(m.sender)) throw "Kamu sudah absen!";
  absen.push(m.sender);
  let d = new Date();
  let date = d.toLocaleDateString("id", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let list = absen.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join("\n");
  let caption = `*[ SUKSES ABSEN ]*
            
*Total absen:* ${absen.length}`;
  await conn.sendButton(
    m.chat,
    caption,
    author,
    null,
    [
      ["Absen", usedPrefix + "absen"],
      ["Cek Absen", usedPrefix + "cekabsen"],
    ],
    m,
    { mentions: conn.parseMention(caption) }
  );
};
handler.help = ["absen"];
handler.tags = ["absen"];
handler.command = /^(absen|hadir)$/i;

export default handler;
