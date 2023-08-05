import fetch from "node-fetch";
import xa from "xfarr-api";
import fbDownloader from "fb-downloader-scrapper";

let handler = async (m, { conn, command, args, usedPrefix }) => {
  if (!args[0]) return m.reply("Putting *URL* Facebook..");
  if (!args[0].includes("facebook"))
    return m.reply(
      `Url is wrong..\n\n*Example:*\n${usedPrefix}fb https://www.facebook.com/juankcortavarriaoficial/videos/218237676749570/`
    );
  let res = await fbDownloader(args[0]);
  let { download } = res;
  await m.reply("Sedang di proses..");
  let cap = `*Quality :* ${download[1].quality}`;
  await conn.sendFile(m.chat, download[1].url, "fb.mp4", cap, m);
};
handler.help = ["fblow"];
handler.tags = ["downloader"];
handler.command = /^(fbsd|fblow)$/i;

export default handler;
