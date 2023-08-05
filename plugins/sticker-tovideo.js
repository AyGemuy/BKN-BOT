import { webp2mp4 } from "../lib/webp2mp4.js";
import { ffmpeg } from "../lib/converter.js";
let handler = async (m, { conn, usedPrefix, command }) => {
  const q = m.quoted || m;
  if (!q)
    throw `Balas stiker/audio yang ingin diubah menjadi video dengan perintah ${
      usedPrefix + command
    }`;
  let mime = q.mimetype || "";
  if (!/webp|audio/.test(mime))
    throw `Balas stiker/audio yang ingin diubah menjadi video dengan perintah ${
      usedPrefix + command
    }`;
  await m.reply(wait);
  let media = await q?.download(true);
  let out = Buffer.alloc(0);
  if (/webp/.test(mime)) {
    out = (await webp2mp4(media))?.result;
  } else if (/audio/.test(mime)) {
    out = await ffmpeg(
      (
        await conn.getFile(media)
      ).data,
      [
        "-filter_complex",
        "color",
        "-pix_fmt",
        "yuv420p",
        "-crf",
        "51",
        "-c:a",
        "copy",
        "-shortest",
      ],
      "mp3",
      "mp4"
    );
  }
  await conn.sendFile(m.chat, out, "out.mp4", "*DONE*", m, 0, {
    thumbnail: out,
  });
};
handler.help = ["tovideo"];
handler.tags = ["sticker"];

handler.command = ["tovideo"];

export default handler;
