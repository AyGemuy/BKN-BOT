import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix }) => {
  let user = global.db.data.users[m.sender];
  let name = await conn.getName(m.sender);
  let imgr = fla.getRandom();
  let pp = imgr + "Kolam Ikan";
  let hsl = `*━━━━━ [ Kolam Ikan ] ━━━━━*
	
${sym} *🐋 = [ ${user.orca} ] orca*
${sym} *🐳 = [ ${user.paus} ] paus*
${sym} *🐬 = [ ${user.lumba} ] lumba*
${sym} *🦈 = [ ${user.hiu} ] hiu*
${sym} *🐟 = [ ${user.ikan} ] ikan*
${sym} *🐟 = [ ${user.lele} ] lele*
${sym} *🐡 = [ ${user.bawal} ] bawal*
${sym} *🐠 = [ ${user.nila} ] nila*
${sym} *🦀 = [ ${user.kepiting} ] kepiting*
${sym} *🦞 = [ ${user.lobster} ] lobster*
${sym} *🐙 = [ ${user.gurita} ] gurita*
${sym} *🦑 = [ ${user.cumi} ] cumi*
${sym} *🦐 = [ ${user.udang} ] udang*`;
  let weem = `Gunakan *${usedPrefix}sell* untuk dijual atau *${usedPrefix}cook* untuk dijadikan bahan masakan.`;
  conn.reply(m.chat, hsl, m);
};
handler.help = ["kolam"];
handler.tags = ["rpg"];
handler.command = /^(kolam)$/i;

export default handler;
