let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text)
    return conn.reply(
      m.chat,
      "Contoh penggunaan: " + usedPrefix + "chord hanya rindu",
      m
    );
  try {
    let res = await scrp.Tools.chord(text);
    let hasil = `*[ ${res.title} ]*
    
${res.chord}`;
    conn.reply(m.chat, hasil, m);
  } catch (e) {
    m.reply("Chord tidak di temukan");
    throw e;
  }
};
handler.help = ["chord <judul lagu>"];
handler.tags = ["tools"];
handler.command = /^(chord)$/i;
handler.limit = true;

export default handler;
