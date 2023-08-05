import { cerpen } from "../scraper/asupan/cerpen.js";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const sections = [
    {
      title: "Pilih Di Bawah",
      rows: [
        { title: "Remaja", rowId: ".cerpen remaja" },
        { title: "Anak", rowId: ".cerpen anak" },
        { title: "Remaja", rowId: ".cerpen remaja" },
        { title: "Cinta", rowId: ".cerpen cinta" },
        { title: "Budaya", rowId: ".cerpen budaya" },
        { title: "Romantis", rowId: ".cerpen romantis" },
        { title: "Galau", rowId: ".cerpen galau" },
        { title: "Gokil", rowId: ".cerpen gokil" },
        { title: "Inspiratif", rowId: ".cerpen inspiratif" },
        { title: "Kehidupan", rowId: ".cerpen kehidupan" },
        { title: "Sastra", rowId: ".cerpen sastra" },
        { title: "Jepang", rowId: ".cerpen jepang" },
        { title: "Korea", rowId: ".cerpen korea" },
        { title: "Keluarga", rowId: ".cerpen keluarga" },
        { title: "Persahabatan", rowId: ".cerpen persahabatan" },
        { title: "Kriten", rowId: ".cerpen kristen" },
        { title: "Ramadan", rowId: ".cerpen ramadan" },
        { title: "Liburan", rowId: ".cerpen liburan" },
        { title: "Lingkungan", rowId: ".cerpen lingkungan" },
        { title: "Mengharukan", rowId: ".cerpen mengharukan" },
        { title: "Motivasi", rowId: ".cerpen motivasi" },
        { title: "Perjuangan", rowId: ".cerpen perjuangan" },
        { title: "Nasihat", rowId: ".cerpen nasihat" },
        { title: "Pendidikan", rowId: ".cerpen pendidikan" },
        { title: "Petualangan", rowId: ".cerpen petualangan" },
      ],
    },
  ];
  let txt = `Hai @${m.sender.split`@`[0]},
Silahkan Pilih Kategori Cerpen 
( cerita pendek )

Hanya Cerita Yang Di Buat Buat`;
  const listMessage = {
    text: txt,
    footer: author,
    mentions: [m.sender],
    title: `${htki} LIST CERPEN ${htka}\n`,
    buttonText: "Click Here",
    sections,
  };

  if (!text) return conn.sendMessage(m.chat, listMessage, { quoted: fkontak });

  let res = await cerpen(text);
  let { title, kategori, lolos, cerita } = res.result;
  let cap = `${title}

[×] - Kategori:  ${kategori}
[×] - Lolos: ${lolos}


*Cerita:*

${cerita}`;
  conn.reply(m.chat, cap, m);
};
handler.help = ["cerpen"];
handler.tags = ["internet"];
handler.command = /^(cerpen)$/i;

handler.premium = true;

export default handler;
