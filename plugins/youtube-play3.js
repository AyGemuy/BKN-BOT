import youtube from "@yimura/scraper";
const yt = new youtube.default();

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw "Masukan Query !";
  let res = await yt.search(text);
  let vidio = res.videos[0];
  let {
    description,
    duration,
    duration_raw,
    uploaded,
    views,
    channel,
    id,
    link,
    thumbnail,
    title,
    shareLink,
  } = vidio;
  let imgg = await conn.resize(thumbnail, 300, 150);
  let playy = `${title}

*ID :* ${id}
*Duration :* ${duration}
*Duration Raw :* ${duration_raw}
*Uploaded :* ${uploaded}
*Views :* ${views}
*Share Link :* ${shareLink}
*Description :* ${description}

Link : ${shortUrl(link)}`;
  await conn.send2ButtonLoc(
    m.chat,
    imgg,
    playy,
    author,
    "🎶 Audio",
    `${usedPrefix}ytmp3 ${link}`,
    "🎥 Video",
    `${usedPrefix}ytmp4 ${link}`,
    m
  );
};
handler.help = ["play3"];
handler.tags = ["downloader"];
handler.command = /^(play3)$/i;

export default handler;

async function shortUrl(url) {
  url = encodeURIComponent(url);
  let res = await fetch(`https://is.gd/create.php?format=simple&url=${url}`);
  if (!res.ok) throw false;
  return await res;
}
