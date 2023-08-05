let handler = async (m, { conn, usedPrefix, args }) => {
  let who = m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.quoted
    ? m.quoted.sender
    : args[1]
    ? args[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
    : m.isGroup
    ? m.sender
    : m.chat;
  let name = await conn.getName(who);
  let user = global.db.data.users[who];
  if (!user) user = global.db.data.users[who] = {};
  const caption = `─────❑ 「 *B A N K* 」 ❑─────

📛 *Name :* ${name}
⚡ *Tags :* @${who.split`@`[0]}
🏛️ *Bank :* ${user.atm} (${NumberF(user.atm)})
💹 *Money :* ${user.money} (${NumberF(user.money)})`;
  conn.reply(m.chat, caption, m, { mentions: [who] });
};
handler.help = ["bank"];
handler.tags = ["rpg"];
handler.command = /^(bank)$/i;

handler.register = false;
export default handler;
