import alQuran from "al-quran";

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  let urut = text.split`|`;
  let one = urut[1];
  let two = urut[2];
  let three = urut[3];

  let template = (args[0] || "").toLowerCase();
  if (!args[0]) {
    let cap = `${htki} List All'Quran ${htka}

${usedPrefix + command} surat 
${usedPrefix + command} nomorsurat 
${usedPrefix + command} tampilayat 
${usedPrefix + command} bahasaayat 
${usedPrefix + command} daftarbahasa
${usedPrefix + command} pecarian 
${usedPrefix + command} catatandepag
${usedPrefix + command} quranacak`;
    await conn.reply(m.chat, cap, m);
  }

  switch (template) {
    case "surat":
      {
        let res = await alQuran.surat();
        let arif = [];
        res.hasil.forEach(function (i) {
          arif.push({
            title: `${i.nomor}. ${i.nama}`,
            rowId: usedPrefix + `nomorsurat ${i.nomor}`,
            description: `Asma : ${i.asma} | Name ${i.name}\n Ayat : ${i.ayat} | Type : ${i.type}`,
          });
        });
        const sections = [
          {
            title: `━ ━ ━ ━ 『 List All-Quran 』 ━ ━ ━ ━`,
            rows: arif,
          },
        ];
        const caption = `*${htki} List All-Quran ${htka}*
    
Hai @${m.sender.split`@`[0]}, Mau Baca Al-Quran ?
Berikut Adalah List All-Quran Di Bawah 

Note :
Pilih Dan Klik Kirim Untuk Melihat Detail Dari Surat !!`;
        const listMessage = {
          text: caption,
          footer: global.author,
          //title: `⎔───「 ${packname} 」───⎔`,
          buttonText: `List All-Quran 🎫`,
          sections,
        };
        await conn.sendMessage(m.chat, listMessage, { quoted: m });
      }
      break;
    case "nomorsurat":
      {
        if (!one) throw `Contoh : ${usedPrefix + command} ${template} |1`;
        let res = await alQuran.nomorSurat(one);
        const {
          nomor,
          nama,
          asma,
          name,
          start,
          ayat,
          type,
          urut,
          rukuk,
          arti,
        } = res.hasil;
        let result = `*Nomor :* ${nomor} 
*Nama :* ${nama}
*Asma :* ${asma} 
*Name :* ${name}
*Start :* ${start}
*Ayat :* ${ayat}
*Type :* ${type}
*Urut :* ${urut}
*Rukuk :* ${rukuk}

*Arti :* ${arti}`;
        let foto = "https://telegra.ph/file/558ab611cfbb9a947f148.jpg";
        await conn.sendButton(
          m.chat,
          result,
          "Islamic © All-Quran",
          foto,
          [["Bismillahirrahmanirrahim", "Aku Tidak Tahu"]],
          m
        );
      }
      break;
  }
};
handler.help = ["quran", "allquran"];
handler.tags = ["quran"];
handler.command = /^(quran|allquran)$/i;

export default handler;
