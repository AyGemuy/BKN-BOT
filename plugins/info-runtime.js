let handler = async (m, { conn, args, command }) => {
  let _muptime;
  if (process.send) {
    process.send("uptime");
    _muptime =
      (await new Promise((resolve) => {
        process.once("message", resolve);
        setTimeout(resolve, 1000);
      })) * 1000;
  }
  let muptime = clockString(_muptime);
  let cap = `${htki} RUNTIME ${htka}
	
${muptime}`;
  conn.sendMessage(m.chat, { text: cap }, { quoted: m });
};

handler.help = ["um"];
handler.tags = ["info"];
handler.command = ["rt", "runtime"];

export default handler;

function clockString(ms) {
  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [d, " *Days*\n", h, " *Hours*\n", m, " *Minute*\n", s, " *Second*"]
    .map((v) => v.toString().padStart(2, 0))
    .join("");
}
