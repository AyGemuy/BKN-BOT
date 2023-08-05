let handler = async (m, { conn, text, args }) => {
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.sender;
  let usrr = global.db.data.users[who];
  if (!args[0]) throw "Masukan Type";
  if (!args[1]) throw "Masukan Jumlah";
  conn.reply(
    m.chat,
    `Berhasil Kirim\n*Type:* ${args[0]}\n*Jumblah:* ${args[1] * 1}\n*Ke:* @${
      who.split`@`[0]
    }`,
    fkontak,
    { mentions: [who] }
  );
  usrr[args[0]] += args[1] * 1;
};
handler.command = ["kirim"];

handler.owner = true;

export default handler;
