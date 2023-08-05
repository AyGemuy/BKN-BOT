import fs from "fs";
import SpottyDL from "spottydl";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw "Masukan URL Sporty ";
  let res = await SpottyDL.getTrack(text);
  let track = await SpottyDL.downloadTrack(res, "./mp3");
  let cap = `${res.title}

*ID :* ${res.id}
*Artist :* ${res.artist}
*Year :* ${res.year}
*Album :* ${res.album}
*Track Number :* ${res.trackNumber}`;
  const Msg = await conn.sendMessage(
    m.chat,
    { image: { url: res.albumCoverURL }, caption: cap },
    { quoted: m }
  );
  await conn.sendFile(
    m.chat,
    fs.readFileSync(`${track[0].filename}`),
    "null.m4a",
    "",
    m,
    null,
    { mimetype: "audio/mp4" }
  );
};
handler.help = ["spot", "sporty"];
handler.tags = ["downloader"];
handler.command = /^(spot|sporty)$/i;

handler.premium = true;

export default handler;
