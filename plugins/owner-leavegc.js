let handler = async (m, { conn, args, command }) => {
  let group = args[0]?.endsWith("@g.us") ? args[0] : m.chat;
  let chat = db.data.chats[group];
  if (!chat) chat = db.data.chats[group] = {};
  let Text = args[0]?.endsWith("@g.us")
    ? args.slice(1).join(" ")
    : args.join(" ")
    ? args.join(" ")
    : "Sayonara , , ! (≧ω≦)ゞ";
  let Banned = /Banned/i.test(m.text);
  chat.isBanned = Banned;
  await conn.reply(group, Text + `\nStatus: ${Banned ? "Banned" : "Unbanned"}`);
  await conn.groupLeave(group);
  await conn.reply(
    m.sender,
    "Text: " + Text + `\nStatus: ${Banned ? "Banned" : "Unbanned"}`
  );
};

handler.help = ["leavegc", "out"];
handler.tags = ["owner"];
handler.command = /^(out|leavegc)$/i;
handler.rowner = true;
export default handler;
//FG - JB Made By 𝙁𝘾 么 Glitch Editz#0433
