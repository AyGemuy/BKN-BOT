let handler = async (m, { conn, usedPrefix, command, args }) => {
  if (!args[0])
    return m.reply(
      `Contoh : ${usedPrefix + command} <tag> <jumlah>\n\n${
        usedPrefix + command
      } @⁨Cahyo Kun⁩ 1000`
    );
  let count =
    args[1] && args[1].length > 0
      ? Math.min(9999999999999999, Math.max(parseInt(args[1]), 1))
      : Math.min(1);
  let who = m.mentionedJid
    ? m.mentionedJid[0]
    : args[0].replace(/[@ .+-]/g, "").replace(" ", "") + "@s.whatsapp.net";
  if (!who) return m.reply("Tag salah satu, atau ketik Nomernya!!");
  if (!(who in global.db.data.users))
    return m.reply(`User ${who} not in database`);
  conn.reply(m.chat, `Berhasi Give money Sebesar ${count} money`, m);
  db.data.users[who].money += count * 1;
};
handler.command = /^give(money)$/i;

handler.group = true;
handler.owner = true;

export default handler;

function isNumber(x) {
  return !isNaN(x);
}
