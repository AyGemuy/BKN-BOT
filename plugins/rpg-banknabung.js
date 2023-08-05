const xppermoney = 1;
let handler = async (m, { conn, command, args }) => {
  let user = global.db.data.users[m.sender];
  let count = command.replace(/^nabung/i, "");
  count = count
    ? /all/i.test(count)
      ? Math.floor(global.db.data.users[m.sender].money / xppermoney)
      : parseInt(count)
    : args[0]
    ? parseInt(args[0])
    : 1;
  count = Math.max(1, count);
  if (global.db.data.users[m.sender].money >= xppermoney * count) {
    global.db.data.users[m.sender].money -= xppermoney * count;
    global.db.data.users[m.sender].bank += count;
    conn.reply(
      m.chat,
      `-Rp.${xppermoney * count} 💵\n+ ${count} 💳\n\n[ ! ] Succes menabung !`,
      m
    );
  } else
    conn.reply(
      m.chat,
      `[❗] Money anda tidak mencukupi untuk menabung ${count} !`,
      m
    );
};
handler.help = ["nabung <jumlah>"];
handler.tags = ["rpg"];
handler.command = /^banknabung ([0-9]+)|banknabung|banknabungall$/i;

export default handler;
