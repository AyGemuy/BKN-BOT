import { fsearch } from "f-droid";

let handler = async (m, { conn, usedPrefix, command, args }) => {
  if (!args[0])
    throw `Masukan query\nContoh : ${usedPrefix + command} Mobile Legends`;
  let res = await fsearch(args[0]);
  let name = await conn.getName(m.sender);
  let cap = `*${htki} Youtube Search ${htka}*
     
𝐑𝐞𝐪𝐮𝐞𝐬𝐭 𝐁𝐲 : ${name}
𝐑𝐞𝐬𝐮𝐥𝐭 𝐅𝐫𝗼𝗺 : ${args[0]}

Note : Klik Jika Ingin Mendapatkan Link Apk !!`;
  let lis = [];
  for (let p of res) {
    lis.push({
      title: p.title,
      rowId: null,
      description: `Description : ${p.desc}\nLicense : ${p.license}\nLink : ${p.link}`,
    });
    let sections = [
      {
        title: "",
        rows: lis,
      },
    ];
    let listMessage = {
      text: cap,
      footer: author,
      buttonText: "Click Here !!",
      sections,
    };
    conn.sendMessage(m.chat, listMessage, { quoted: fkontak });
  }
};
handler.help = ["apk"].map((v) => v + " <query>");
handler.tags = ["tools"];
handler.command = /^apk(s?earch)?$/i;

handler.register = true;

export default handler;
