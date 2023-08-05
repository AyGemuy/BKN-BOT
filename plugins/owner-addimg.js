let handler = async (m, { conn, text }) => {
  if (!text) throw "Masukan URK Img";
  const data = db.data.datas.miku;
  m.reply(`Sukses Menambahkan URL Ke Dalah Database !`);
  data.push({ url: text });
};
handler.help = ["addimg"];
handler.tags = ["owner"];
handler.command = ["addimg"];

handler.owner = true;

export default handler;
