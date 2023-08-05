let handler = async (m, { conn, args }) => {
  if (args[0] == "reset") {
    let list = Object.entries(global.db.data.users);
    let lim =
      !args || !args[0] ? 1000 : isNumber(args[0]) ? parseInt(args[0]) : 1000;
    lim = Math.max(1, lim);
    list.map(([user, data], i) => Number((data.limit = lim)));
    conn.reply(m.chat, `*berhasil direset ${lim} / user*`, m);
  }
  let who;
  if (m.isGroup)
    who = m.quoted
      ? m.quoted.sender
      : m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.sender;
  else who = m.sender;
  let user = global.db.data.users[who];
  let cap = `━━━ ❨ *Dompet @${who.split(`@`)[0]}* ❩ ━━━

*🌌 𝑳𝒊𝒎𝒊𝒕 :* ${user.limit}
*💷 𝑩𝒂𝒍𝒂𝒏𝒄𝒆 :* ${NumberF(user.balance)}
*💵 𝑴𝒐𝒏𝒆𝒚 :* ${NumberF(user.money)}
*✨ 𝑬𝒙𝒑 :* ${NumberF(user.exp)}`;
  conn.reply(m.chat, cap, fkontak, { mentions: await conn.parseMention(cap) });
};
handler.help = ["dompet", "limit"];
handler.tags = ["rpg"];
handler.command = /^(dompet|limit|dp|lm)$/i;

export default handler;

function isNumber(x = 0) {
  x = parseInt(x);
  return !isNaN(x) && typeof x == "number";
}
