import moment from "moment-timezone";

let handler = async (m, { conn, usedPrefix, command, args }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid[0];
  if (!who) throw "Reply Atau Tag Orangnya";
  let jam = moment.tz("asia/jakarta").format("HH:mm:ss");
  let tanggal = moment().tz("Asia/Jakarta").format("ll");
  let cap = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih @${
    who.split("@")[0]
  } Next Order ya🙏`;
  conn.reply(m.chat, cap, m, { mentions: [who] });
};
handler.help = ["done"];
handler.tags = ["store"];
handler.command = /^(done)$/i;

handler.group = true;
handler.admin = true;

export default handler;
