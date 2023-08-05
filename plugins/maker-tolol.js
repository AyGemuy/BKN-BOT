import fetch from "node-fetch";
let handler = async (m, { conn, args }) => {
  let response = args.join(" ").split("|");
  if (!args[0]) throw "Masukkan Parameter";
  m.reply("Proses...");
  let res = `  https://api.lolhuman.xyz/api/toloserti?apikey=cahyoKun&name=${response[0]}`;
  conn.sendFile(m.chat, res, "sadboy.jpg", `Sudah Jadi`, m, false);
};
handler.help = ["sertitolol"].map((v) => v + " <text>");
handler.tags = ["maker"];
handler.command = /^(sertitolol)$/i;
handler.register = true;

handler.limit = true;

export default handler;
