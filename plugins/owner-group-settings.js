let handler = async (m, { conn, args, usedPrefix, command }) => {
  let isClose = {
    // Switch Case Like :v
    open: "not_announcement",
    close: "announcement",
  }[args[0] || ""];
  if (isClose === undefined)
    throw `
*Format salah! Contoh :*
  *○ ${usedPrefix + command} close*
  *○ ${usedPrefix + command} open*
`.trim();
  await conn.groupSettingUpdate(m.chat, isClose);
};
handler.help = ["ogroup *open / close*"];
handler.tags = ["group"];
handler.command = /^(ogroup)$/i;

handler.owner = true;
handler.botAdmin = true;

export default handler;
