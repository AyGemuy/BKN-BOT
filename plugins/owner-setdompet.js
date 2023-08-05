let handler = async (m, { conn, text }) => {
  if (!text) throw "Masukan Jumlah..";
  conn.reply(
    m.chat,
    `Berhasil Set Dompet @${m.sender.split`@`[0]} Menjadi ${text * 1}`,
    fkontak,
    { mentions: [m.sender] }
  );
  db.data.users[m.sender].money = text * 1;
  db.data.users[m.sender].limit = text * 1;
  db.data.users[m.sender].balance = text * 1;
  db.data.users[m.sender].exp = text * 1;
};
handler.help = ["setdp", "setdompet"];
handler.tags = ["rpg", "owner"];
handler.command = ["setdp", "setdompet"];

handler.owner = true;

export default handler;
