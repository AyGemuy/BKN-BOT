import xa from "xfarr-api";
import SoundCloud from "soundcloud-scraper";
const client = new SoundCloud.Client();

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw "Masukan URL Soundcloud !";
  let song = await client.getSongInfo(text);
  let res = await xa.downloader.soundcloud(song.url);
  let info = `${song.title}

*ID : ${song.id}
*Duration :* ${song.duration}
*Play Count :* ${song.playCount}
*Comments Count :* ${song.commentsCount}
*Likes :* ${song.likes}
*Genre :* ${song.genre}
*Description :* ${song.description}

_* SENDING AUDIO... *_ `;
  await conn.sendFile(m.chat, song.thumbnail, "error.jpg", info, m);
  await conn.sendFile(m.chat, res.download, "error.mp3", "", m, null, {
    mimetype: "audio/mp4",
  });
};
handler.help = ["soundclouddl", "scdl"];
handler.tags = ["downloader"];
handler.command = /^soundcloud|sc(dl)$/i;

handler.limit = true;

export default handler;
