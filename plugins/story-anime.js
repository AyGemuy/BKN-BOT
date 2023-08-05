let handler = async (m, { conn }) => {
  conn.sendFile(
    m.chat,
    "https://api.lolhuman.xyz/api/storynime?apikey=cahyoKun",
    "asupan.mp4",
    "Nih kak Random Story Nya Jangan Lupa Foolow Ig https://instagram.com/cahyo_kuun",
    m
  );
};
handler.help = ["bkp"];
handler.tags = ["hentai", "premium"];

handler.command = /^(storyanime)$/i;
handler.premium = true;
export default handler;
