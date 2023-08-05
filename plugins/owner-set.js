let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text)
    throw `Contoh  ${usedPrefix + command} nomor|nomor|nama\n\nExample : ${
      usedPrefix + command
    } 6289503433262|6289503433262|${nameown}`;
  let data = db.data.datas.owner;
  let [nomor, nmr, nama] = text.split`|`;
  if (!nomor) throw "Masukan Nomor";
  if (!nmr) throw "Masukan Nomor Ke 2";
  if (!nama) throw "Masukan Nama";
  m.reply(
    `*Berhasil Di Set Menjadi :*\n*Nomor :* ${nomor}\n*Nomor 2 :* ${nmr}\n*Nama :* ${nama}`
  );
  data[0].nomor = nomor;
  data[0].nomorown = nmr;
  data[0].nama = nama;
};
handler.help = ["setowner"];
handler.tags = ["owner"];
handler.command = /^(setowner)$/i;

handler.owner = true;

export default handler;
