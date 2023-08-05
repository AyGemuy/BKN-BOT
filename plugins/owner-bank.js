let handler = async (m, { conn, usedPrefix, text, command }) => {
  let who = text
    ? m.sender
    : !m.isGroup
    ? m.chat
    : m.quoted
    ? m.quoted.sender
    : m.mentionedJid
    ? m.mentionedJid[0]
    : "";
  let data = db.data.users[who];
  let txt = `*[ Bank Cek ]*\n\n`;
  txt += `*User:* @${who.split("@")[0]}\n\n`;
  txt += `*Bank:* ${data.atm}\n`;
  txt += `*Money:* ${data.money}\n`;
  txt += `*Limit:* ${data.limit}`;
  conn.reply(m.chat, txt, m, { mentions: [who] });
};
handler.help = ["obank"];
handler.tags = ["rpg", "owner"];
handler.command = ["obank", "ownerbank"];
handler.owner = true;

export default handler;
