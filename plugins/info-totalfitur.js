let handler = async (m, { conn, text, usedPrefix, command }) => {
  let pp = fla.getRandom();
  let totalf = Object.values(plugins)
    .filter((v) => v.help && !v.disabled)
    .map((v) => v.help)
    .flat(1);
  let tqto = `_* 『 Info Total Fitur 』 *_ 

*🔖 FITUR :* ${totalf.length}`;
  m.reply(tqto);
};
handler.help = ["totalfitur"];
handler.tags = ["main", "info"];
handler.command = /^total(fitur|ft)$/i;
export default handler;
