let handler = async (m, { conn }) => {
  let usr = db.data.users[m.sender];
  conn.reply(m.chat, `*Your Stamina :* ${usr.stamina}`, fkontak);
};
handler.help = ["stamina"];
handler.tags = ["rpg"];
handler.command = ["stamina"];

export default handler;
