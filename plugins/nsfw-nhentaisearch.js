/*import { nhentaiSearch } from "../button/nhentai.js";

let handler = async (m, { conn, usedPrefix, text }) => {
  if (!text) throw "Masukan Query !";
  try {
    let res = await nhentaiSearch(text);
    let array = [];
    res.result.forEach(function (i) {
      array.push({
        title: i.title,
        rowId: usedPrefix + `nhentai ${i.code}`,
        description: `Code : ${i.code} || Link : ${i.link}`,
      });
    });
    const sections = [
      {
        title: `━ ━ ━ ━ 『 nHentai Search 』 ━ ━ ━ ━`,
        rows: array,
      },
    ];
    const cap = `*${htki} nHentai Search ${htka}*
   
*Total :* ${res.total}
*Total Pages :* ${res.total_pages}

*Request From :* @${m.sender.split`@`[0]}`;
    const listMessage = {
      text: cap,
      footer: global.author,
      mentions: [m.sender],
      buttonText: `List Search 🎫`,
      sections,
    };
    await conn.sendMessage(m.chat, listMessage, { quoted: m });
  } catch (e) {
    console.log(e);
    m.reply("Tidak Ditemukan");
  }
};
handler.help = ["nhentaisearch", "nhsearch", "nhs"];
handler.tags = ["search", "nsfw", "downloader"];
handler.command = /^(nhentaisearch|nhssearch|nhs)$/i;

handler.limit = true;

export default handler;
*/
