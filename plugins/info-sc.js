let handler = async (m, { conn }) => {
  let sc = `Hai @${m.sender.split`@`[0]}, Lagi Cari Sc ?

Sc Ini Di Jual, Jika Minat Silahkan Chat 
https://wa.me/6289503433262`;
  conn.reply(m.chat, sc, fkontak, { mentions: [m.sender] });
};
handler.help = ["sc", "esce", "script"];
handler.tags = ["info"];
handler.command = /^(sc|esce|script)$/i;
export default handler;
