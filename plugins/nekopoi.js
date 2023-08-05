import { search, latest, list, detail } from "../scraper/nekopoi.js";

let handler = async (m, { conn, command, text }) => {
  switch (command) {
    case "neko":
    case "nekopoi":
    case "nekosearch":
      {
        if (!text) throw "Masukan Judul/Title";
        try {
          let max = ["20", "10", "15", "25"].getRandom();
          let res = await search(text, max);
          let array = [];
          res.forEach(function (i) {
            array.push({
              title: i.title,
              rowId: ".nekodetail " + i.id,
              description: `ID : ${i.id} || Date : ${i.date} || Type : ${i.type}`,
            });
          });
          const sections = [
            {
              title: "N E K O P O I",
              rows: array,
            },
          ];
          const listMessage = {
            text: `Hai @${
              m.sender.split("@")[0]
            },\n\nSilahkan Pilih Hentai Di Bawah\nFitur Ini Khusus 18+ Ke Atas Ya Dek`,
            footer: author,
            mentions: [m.sender],
            title: htki + " N E K O P O I " + htka,
            buttonText: "Klik Di Sini",
            sections,
          };
          await conn.sendMessage(m.chat, listMessage, { quoted: fkontak });
        } catch (e) {
          console.log(e);
          m.reply("Tidak Di Temukan");
        }
      }
      break;
    case "nekodetail":
    case "nekopoidetail":
      {
        if (!text) throw "Masukan ID";
        let rest = await detail(text);
        try {
          let { id, date, title, image, stream, download } = rest;
          let txt = `-----[ N E K O P O I - D E T A I L ]-----\n\n`;
          txt += `*ID:* ${id}\n`;
          txt += `*Date:* ${date}\n`;
          txt += `*Title:* ${title}\n`;
          txt += `*Stream:*\n1. *Link:*${stream[0].link}\n2. *Link:*${stream[1].link}\n`;
          txt += `*Download :*\n`;
          txt += `*360p:*\n`;
          txt += `${download[0].links[0].name}: ${download[0].links[0].link}\n`;
          txt += `${download[0].links[1].name}: ${download[0].links[1].link}\n`;
          txt += `${download[0].links[2].name}: ${download[0].links[2].link}\n`;
          txt += `${download[0].links[3].name}: ${download[0].links[3].link}\n`;
          txt += `${download[0].links[4].name}: ${download[0].links[4].link}\n`;
          txt += `${download[0].links[5].name}: ${download[0].links[5].link}\n\n`;
          txt += `*480p:*\n`;
          txt += `${download[1].links[0].name}: ${download[1].links[0].link}\n`;
          txt += `${download[1].links[1].name}: ${download[1].links[1].link}\n`;
          txt += `${download[1].links[2].name}: ${download[1].links[2].link}\n`;
          txt += `${download[1].links[3].name}: ${download[1].links[3].link}\n`;
          txt += `${download[1].links[4].name}: ${download[1].links[4].link}\n`;
          txt += `${download[1].links[5].name}: ${download[1].links[5].link}\n\n`;
          txt += `*720p:*\n`;
          txt += `${download[2].links[0].name}: ${download[2].links[0].link}\n`;
          txt += `${download[2].links[1].name}: ${download[2].links[1].link}\n`;
          txt += `${download[2].links[2].name}: ${download[2].links[2].link}\n`;
          txt += `${download[2].links[3].name}: ${download[2].links[3].link}\n`;
          txt += `${download[2].links[4].name}: ${download[2].links[4].link}\n`;
          txt += `${download[2].links[5].name}: ${download[2].links[5].link}\n`;
          await conn.sendButton(
            m.chat,
            txt,
            "By : ArifzynXD",
            image,
            [
              ["Nekopoi Latest", ".nekolatest"],
              ["Nekopoi List", ".nekolist"],
            ],
            m
          );
        } catch (e) {
          console.log(e);
          m.reply("Tidak Dapat Di Temukan");
        }
      }
      break;
  }
};
handler.help = handler.command = [
  "neko",
  "nekopoi",
  "nekosearch",
  "nekodetail",
  "nekopoidetail",
];
handler.tags = ["search", "nsfw"];

export default handler;
