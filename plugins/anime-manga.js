import fs from "fs";
import dir2pdf from "dir2pdf";
import { searchManga, getManga, getChapterPages } from "mangakakalot-scrapper";

let handler = async (m, { conn, usedPrefix, command, args, text, isLimit }) => {
  if (db.data.users[m.sender].premiumTime < 1)
    return m.reply("KHUSUS PREMIUM USER");
  switch (command) {
    case "manga":
      {
        if (!text) return m.reply("Masukan Query Manga");
        let res = await searchManga(text, 1);
        let array = [];
        res.data.forEach(function (x) {
          array.push({
            title: x.name,
            rowId: ".mangadetail " + x.id,
            description: `ID : ${x.id} | Author : ${x.author}\nLast Update : ${x.lastUpdated}`,
          });
        });
        const sections = [
          {
            title: "Manga Search",
            rows: array,
          },
        ];
        const listMessage = {
          text: `Hai @${
            m.sender.split("@")[0]
          },\n\nSearch : ${text}\nPage : 1\nSilahkan Pilih Hasil Search Di Bawah`,
          footer: author,
          mentions: [m.sender],
          title: htki + " Manga Search " + htka,
          buttonText: "CLICK HERE",
          sections,
        };
        await conn.sendMessage(m.chat, listMessage, { quoted: fkontak });
      }
      break;
    case "mangadetail":
      {
        if (!text) return m.reply("Masukan ID Manga");
        let anu = await getManga(text);
        let ini_txt = `*ID :* ${anu.id}\n`;
        ini_txt += `*Author :* ${anu.author}\n`;
        ini_txt += `*Views :* ${anu.views}\n`;
        ini_txt += `*Update :* ${anu.lastUpdated}\n\n`;
        ini_txt += `*Summary :* ${anu.summary}\n\n`;
        ini_txt += `*Status :* ${anu.status}`;
        let hsl = [];
        anu.chapters.forEach(function (i) {
          hsl.push({
            title: i.title,
            rowId: ".mangadl " + i.id,
            description: `ID : ${i.id}\nUpload :${i.uploadedAt}`,
          });
        });
        const sections = [
          {
            title: "Click To Download Manga",
            rows: hsl,
          },
        ];
        const listMsg = {
          text: ini_txt,
          footer: "Note : Pilih Chapter Di Bawah Untuk Download Manga",
          mentions: [m.sender],
          title: `${anu.name}\n`,
          buttonText: "Click To Download",
          sections,
        };
        await conn.sendMessage(m.chat, listMsg, { quoted: m });
      }
      break;
    case "mangadl":
      {
        if (!text) throw "Masukan ID Chapters";
        let anu = await getChapterPages(text);
        await m.reply("Wait Bentar Lagi Convert Pdf");
        await anu.PDF("./tmp/" + anu.pages[0].title + ".pdf");
        let mediapdf = fs.readFileSync("./tmp/" + anu.pages[0].title + ".pdf");
        await conn.sendMessage(
          m.chat,
          {
            document: mediapdf,
            fileName: anu.pages[0].title + ".pdf",
            mimetype: "application/pdf",
          },
          { quoted: m }
        );
      }
      break;
  }
};
handler.help = ["manga", "mangadetail"];
handler.tags = ["anime", "search"];
handler.command = /^(manga|mangadetail|mangadl)$/i;

handler.premium = true;

export default handler;
