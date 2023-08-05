let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  if (!text) throw `Cari apa?\nContoh: ${usedPrefix + command} dj indo`;
  try {
    let res = await scrp.Youtube.search(text);
    let txt = `*[ YouTube Search ]*\n\n`;
    for (let x of res) {
      txt += `*ID :* ${x.videoId}\n`;
      txt += `*Title :* ${x.title}\n`;
      txt += `*Duration :* ${x.duration}\n`;
      txt += `*Views :* ${x.views}\n`;
      txt += `*URL :* ${x.url}\n`;
      txt += "\n===========================\n\n";
    }
    m.reply(txt);
  } catch (err) {
    console.log(err);
    m.reply("Tidak Du Temukan");
  }
};
handler.help = ["", "earch"].map((v) => "yts" + v + " <pencarian>");
handler.tags = ["tools"];
handler.command = /^yts(earch)?$/i;

export default handler;
