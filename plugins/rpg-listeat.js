let handler = async (m, { conn, usedPrefix }) => {
  let usr = db.data.users[m.sender];
  let cap = `「 *E A T I N G* 」
🍝 Steak : ${usr.steak}
🍜 Rendang : ${usr.rendang}
🍱 Nugget : ${usr.nugget}
🍛 Seafood : ${usr.seafood}
🍣 Sushi : ${usr.sushi}
🍢 Sate : ${usr.sate}
🥣 Kornet ${usr.kornet}
🍲 Bluefin ${usr.bluefin}
🥘 Moluska : ${usr.moluska}
🍤 Squidprawm : ${usr.squidprawm}

Ketik ${usedPrefix}eat untuk makan`;
  conn.reply(m.chat, cap, m);
};
handler.command = /^(makan)list$/i;

export default handler;
