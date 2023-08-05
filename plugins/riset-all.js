let handler = async (m, { conn }) => {
  let usrr = Object.keys(global.db.data.users);
  for (var x of usrr) {
    global.db.data.users[x].money = 0;
  }
  m.reply("Sukses Riset Semua User");
};
handler.help = ["resetalluser"];
handler.tags = ["owner", "rpg"];
handler.command = /^(resetalluser)$/i;

handler.owner = true;

export default handler;
