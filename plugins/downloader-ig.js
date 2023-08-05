import fetch from "node-fetch";
import spit from "performance-now";

const times = spit();
const latensi = spit() - times;
const fetching = latensi.toFixed(4) + " ms";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw "Masukan URL Instagram...";
  let rest = await fetch(
    `https://api.lolhuman.xyz/api/instagram?apikey=085866&url=${text}`
  );
  let res = await rest.json();
  m.reply(`Mengirim ${res.result.length} Media...`);
  for (var media of res.result) {
    conn.sendFile(m.chat, media, "ig.mp4", "🍟 Fetching : " + fetching, m);
  }
};
handler.help = ["ig"].map((v) => v + " <url>");
handler.tags = ["downloader"];
handler.command = /^(ig|instagram(dl))$/i;

handler.limit = 3;

export default handler;
