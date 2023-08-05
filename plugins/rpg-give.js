let handler = async (m, { conn, usedPrefix, command, args }) => {
  let who;
  if (m.isGroup)
    who = m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
      ? m.quoted.sender
      : false;
  else who = m.chat;
  if (!who) throw `tag or mention someone!`;
  if (!args[0])
    return m.reply(
      `Contoh : ${usedPrefix + command} <tag> <jumlah>\n\n${
        usedPrefix + command
      } @⁨Arif⁩ 1000`
    );
  let count =
    args[1] && args[1].length > 0
      ? Math.min(99999999999999999999999, Math.max(parseInt(args[1]), 1))
      : Math.min(1);
  if (!(who in global.db.data.users))
    return m.reply(`User ${who} not in database`);
  conn.reply(m.chat, `Berhasi Give Money Sebesar ${count} money`, m);
  db.data.users[who].money += count * 1;
};
handler.help = ["give"];
handler.tags = ["rpg"];
handler.command = /^give$/i;

handler.group = true;
handler.mods = true;

export default handler;

function isNumber(x) {
  return !isNaN(x);
}
