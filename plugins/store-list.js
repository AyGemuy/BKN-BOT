import moment from "moment-timezone";

const datass = db.data.datas.store;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  text = text.split("||");
  if (datass.length == 0) throw `[ ! ] Belum ada list di bot ini.`;
  let jam = moment.tz("asia/jakarta").format("HH:mm:ss");
  let tanggal = moment().tz("Asia/Jakarta").format("ll");
  let grup = await conn.groupMetadata(m.chat);
  let groupName = grup.subject;
  try {
    if (!text[1]) {
      let array = [],
        j = 0;
      datass.forEach(function (i) {
        array.push({
          title: i.title,
          rowId: usedPrefix + command + ` ||${j}`,
          description: `key_number : ${i.key}`,
        });
        j++;
      });
      const sections = [
        {
          title: groupName,
          rows: array,
        },
      ];
      const listMessage = {
        text: `Hi @${m.sender.split("@")[0]}`,
        mentions: [m.sender],
        footer: `*List From ${groupName}*\n\n⏳ ${jam}\n📆 ${tanggal}`,
        title: null,
        buttonText: `List Store`,
        sections,
      };
      await conn.sendMessage(m.chat, listMessage, { quoted: m });
    } else {
      await conn.sendMessage(
        m.chat,
        { text: `*${datass[text[1]].title}*\n\n${datass[text[1]].detail}` },
        { quoted: m }
      );
    }
  } catch (e) {
    console.log(e);
    m.reply(`[ ! ] key_number tidak valid.`);
  }
};

handler.menustore = ["list"];
handler.tagsstore = ["customer"];
handler.command = /^(list|liststore)$/i;

handler.group = true;

export default handler;
