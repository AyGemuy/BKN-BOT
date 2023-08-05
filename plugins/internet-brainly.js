import brainly from "brainly-scraper";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw "Masukan Pertanyaan !";
  try {
    let res = await brainly(text);
    let array = [];
    res.data.forEach(function (x) {
      array.push({
        title: x.pertanyaan,
        rowId: ".bran " + x.jawaban[0].text,
      });
    });
    const sections = [
      {
        title: "Klik Pertanyaan, Melihat Jawaban",
        rows: array,
      },
    ];
    const listMessage = {
      text: `Hai @${
        m.sender.split("@")[0]
      },\n\nSilahkan Pilih Pertanyaan Di Bawah\nClick Pertaan Untuk Melihat Jawaban.`,
      footer: author,
      mentions: [m.sender],
      title: htki + " B R A I N L Y  " + htka,
      buttonText: "Click Here",
      sections,
    };
    await conn.sendMessage(m.chat, listMessage, { quoted: fkontak });
  } catch (e) {
    console.log(e);
    m.reply("Not Found");
  }
};
handler.help = handler.alias = ["brainly"];
handler.tags = ["tools"];
handler.command = /^(brainly)$/i;
handler.limit = true;
export default handler;
