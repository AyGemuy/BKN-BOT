let handler = async (m, { conn, usedPrefix, text }) => {
  try {
    if (!text) return m.reply("Masukan Query Lyrics/Lirik");
    let res = await scrp.Tools.musixmatch(text);
    m.reply(res.lyrics);
  } catch (e) {
    console.log(e);
    m.reply("Tidak Di Temukan");
  }
};
handler.help = ["lirik", "lyrisc"];
handler.tags = ["search"];
handler.command = ["lirik", "lyrisc"];

handler.limit = true;

export default handler;
