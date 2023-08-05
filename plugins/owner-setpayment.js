let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text)
    return m.reply(
      `Contoh : ${
        usedPrefix + command
      } dana|gopay|pulsa|saweria|link img qris\nContoh : ${
        usedPrefix + command
      } 08xxx|08xxx|08xxx|https://saweria.com/NameLu|Link Image`
    );
  let [dan, gop, pul, sawe, qri] = text.split`|`;
  if (!dan) return m.reply("Masukan No Dana");
  if (!gop) return m.reply("Masukan No Gopay");
  if (!pul) return m.reply("Masukan No Pulsa");
  if (!sawe) return m.reply("Masukan Link Saweria Lu");
  if (!qri) return m.reply("Masukan Link Image Qris Lu");
  const pay = db.data.datas.payment;
  pay.push({
    dana: dan,
    gopay: gop,
    pulsa: pul,
    sawaria: sawe,
    qris: qri,
  });
  conn.sendMessage(m.chat, { text: "Berhasil Set Payment" }, { quoted: m });
};
handler.help = ["setpay", "setpayment"];
handler.tags = ["owner"];
handler.command = /^(setpay|setpayment)$/i;

handler.owner = true;

export default handler;
