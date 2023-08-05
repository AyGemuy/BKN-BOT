import fetch from "node-fetch";

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0])
    throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`;
  const data = await (
    await fetch(
      `https://api.lolhuman.xyz/api/tiktokslide?apikey=cahyokun&url=${args[0]}`
    )
  ).json();
  for (var x of data.result) {
    conn.sendMessage(m.chat, { image: { url: x } });
  }
};
handler.help = ["tiktokimg"].map((v) => v + " <url>");
handler.tags = ["downloader"];
handler.command = /^tiktokimg|ttimg$/i;

export default handler;
