import fetch from "node-fetch";
import uploadImage from "../lib/uploadImage.js";

const apilol = db.data.datas.api;

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (db.data.users[m.sender].premiumTime < 1)
    return m.reply("KHUSUS PREMIUM USER");
  let exam = `Contoh : ${
    usedPrefix + command
  } nik|provinsi|kabupaten|nama|tempat/tgl tahir|jenis kelamin|jenis kelamin|Jalan|RT/RW|Kelurahan|Kecamatan|agama|status|pekerja|warga|berlaku`;
  if (!text) return m.reply(exam);
  try {
    let q = m.quoted ? m.quoted : m;
    let media = await q.download();
    let img = await uploadImage(media);
    let [a, b, c, d, e, f, g, h, i, j, k, l, n, o, p] = text.split`|`;
    let res = await (
      await fetch(
        `https://api.lolhuman.xyz/api/ktpmaker?apikey=${apilol}&nik=${
          a || "-"
        }&prov=${b || "-"}&kabu=${c || "-"}&name=${d || "-"}&ttl=${
          e || "-"
        }&jk=${f || "-"}&jl=${g || "-"}&rtrw=${h || "-"}&lurah=${
          i || "-"
        }&camat=${j || "-"}&agama=${k || "-"}&nikah=${l || "-"}&kerja=${
          n || "-"
        }&warga=${o || "-"}&until=${p || "-"}&img=${img}`
      )
    ).buffer();
    conn.sendFile(
      m.chat,
      res,
      "ktp.jpg",
      `Nih @${m.sender.split`@`[0]}, Dah Jadi KTP Mu`,
      m,
      { mentions: [m.sender] }
    );
  } catch (e) {
    console.log(e);
    m.reply("Sepertinya Ada Yang Error...");
  }
};
handler.help = ["ktpmaker"];
handler.tags = ["maker"];
handler.command = /^(ktpmaker)$/i;

export default handler;
