let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw "Masukan Item";
  let chat = global.db.data.users;
  for (var x of Object.keys(chat)) {
    global.db.data.users[x][text] = 0;
  }
  m.reply(`Berhasil Riset Semua ${text} User Menjadi 0`);
};
handler.help = ["setalluser"];
handler.tags = ["rpg", "owner"];
handler.command = /^(setallusers)$/i;

handler.owner = true;

export default handler;
