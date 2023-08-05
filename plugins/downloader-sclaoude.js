const CLIENT_ID = "zZeR6I5DM5NMAYEhk7J9vveMqZzpCIym";
import soundcloud from "soundcloud-downloader";
import util from "util";
import fetch from "node-fetch";

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Use example ${usedPrefix}${command} link`;
  let buff = await soundcloud.download(args[0], CLIENT_ID);
  let hasil = await fetch(buff);
  await conn.sendFile(m.chat, hasil, command + ".mp3", "", m);
};
handler.help = ["soundcloud"].map((v) => v + " <url>");
handler.tags = ["downloader"];

handler.command = /^(soundclouddl)$/i;

export default handler;
