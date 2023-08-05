import { Imgbb } from "../scraper/imgbb.js";
import { convertTo64 } from "../scraper/toBase64.js";

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw "No media found";
  let media = await q.download();
  let hasil = await convertTo64(media);
  let imgbb = new Imgbb({
    key: "4ad24719271838467031ea9f4c0f6b02",
  });
  let res = await imgbb.upload(hasil, "By-Arifzyn");
  let { url_viewer, url, display_url } = res.data;
  m.reply(`*Url Viewer:* ${url_viewer}
*URL:* ${url}
*Display:* ${display_url}`);
};
handler.help = ["imgbb"];
handler.tags = ["tools"];
handler.command = ["imgbb"];

export default handler;
