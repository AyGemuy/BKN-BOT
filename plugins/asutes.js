let handler = async (m, { conn }) => {
  conn.sendFile(
    m.chat,
    "https://zenzapis.xyz/randomasupan/asupan?apikey=cahyokun",
    "asupan.mp4",
    "Nih kak Random Asupan Jangan Lupa Foolow Ig https://instagram.com/cahyo_kuun",
    m
  );
};
handler.help = ["bkp"];
handler.tags = ["hentai", "premium"];

handler.command = /^(asutes)$/i;
handler.premium = true;
export default handler;
