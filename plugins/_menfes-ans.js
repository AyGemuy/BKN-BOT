let handler = async (m, { conn }) => {
  conn.menfess = conn.menfess ? conn.menfess : {};
  m.reply("Reply Pesan Yang Di Atas Untuk Balas Pesan Menfess.");
};
handler.command = /^(balasmenfess)$/i;

export default handler;
