let handler = async (m, { conn, text }) => {
  if (!text)
    throw `Format : *.addlist key@judul@detail*\n\n*Contoh :*\n.addlist 100@List Top Up HI@360 Crystal = 65K\n1100 Crystal = 129K`;
  let [key, judul, detail] = text.split`@`;
  if (!judul) throw "Masukan Judul !";
  if (!detail) throw "Masukan Detail !";
  await conn.reply(m.chat, `Berhasil menambahkan list ke store`, m);
  db.data.datas.store.push({ key: key, title: judul, detail: detail });
};
handler.help = ["list"].map((v) => "add" + v + " <teks>");
handler.tags = ["store"];
handler.command = /^addlist$/i;

handler.owner = true;

export default handler;
