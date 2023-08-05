let handler = async (m, { usedPrefix, command, text, args }) => {
  let who = m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.quoted
    ? m.quoted.sender
    : args[0]
    ? args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
    : m.isGroup
    ? m.sender
    : m.chat;
  let user = db.data.users[who];
  if (!user) user = db.data.users[who] = {};
  if (!who) throw `tag or mention someone!`;
  user.premium = false;
  user.premiumTime = 0;
  m.reply(`✔️ successfully removed *${who}* from premium user`);
};
handler.help = ["delprem [@user]"];
handler.tags = ["owner"];
handler.command = /^(-|del)p(rem)?$/i;

handler.rowner = true;

export default handler;
