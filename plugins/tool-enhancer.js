import FormData from "form-data";
import Jimp from "jimp";
import { TelegraPh } from "../scraper/uploader.js";

async function processing(urlPath, method) {
  return new Promise(async (resolve, reject) => {
    let Methods = ["enhance", "recolor", "dehaze"];
    Methods.includes(method) ? (method = method) : (method = Methods[0]);
    let buffer,
      Form = new FormData(),
      scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
    Form.append("model_version", 1, {
      "Content-Transfer-Encoding": "binary",
      contentType: "multipart/form-data; charset=uttf-8",
    });
    Form.append("image", Buffer.from(urlPath), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg",
    });
    Form.submit(
      {
        url: scheme,
        host: "inferenceengine" + ".vyro" + ".ai",
        path: "/" + method,
        protocol: "https:",
        headers: {
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
        },
      },
      function (err, res) {
        if (err) reject();
        let data = [];
        res
          .on("data", function (chunk, resp) {
            data.push(chunk);
          })
          .on("end", () => {
            resolve(Buffer.concat(data));
          });
        res.on("error", (e) => {
          reject();
        });
      }
    );
  });
}
let handler = async (m, { conn, usedPrefix, command }) => {
  switch (command) {
    case "enhancer":
    case "unblur":
    case "enhance":
      {
        conn.enhancer = conn.enhancer ? conn.enhancer : {};
        if (m.sender in conn.enhancer)
          throw "Masih Ada Proses Yang Belum Selesai Kak, Silahkan Tunggu Sampai Selesai Yah >//<";
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime) throw `Fotonya Mana Kak?`;
        if (!/image\/(jpe?g|png)/.test(mime))
          throw `Mime ${mime} tidak support`;
        else conn.enhancer[m.sender] = true;
        m.reply("Proses Kak...");
        let img = await q.download?.();
        let error;
        try {
          const This = await processing(img, "enhance");
          conn.sendFile(m.chat, This, "", "Sudah Jadi Kak >//<", m);
        } catch (er) {
          error = true;
        } finally {
          if (error) {
            m.reply("Proses Gagal :(");
          }
          delete conn.enhancer[m.sender];
        }
      }
      break;
    case "colorize":
    case "colorizer":
      {
        conn.colorizer = conn.colorizer ? conn.colorizer : {};
        if (m.sender in conn.colorizer)
          throw "Masih Ada Proses Yang Belum Selesai Kak, Silahkan Tunggu Sampai Selesai Yah >//<";
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime) throw `Fotonya Mana Kak?`;
        if (!/image\/(jpe?g|png)/.test(mime))
          throw `Mime ${mime} tidak support`;
        else conn.recolor[m.sender] = true;
        m.reply("Proses Kak...");
        let img = await q.download?.();
        let error;
        try {
          const This = await processing(img, "enhance");
          conn.sendFile(m.chat, This, "", "Sudah Jadi Kak >//<", m);
        } catch (er) {
          error = true;
        } finally {
          if (error) {
            m.reply("Proses Gagal :(");
          }
          delete conn.colorizer[m.sender];
        }
      }
      break;
    case "recolor":
      {
        conn.recolor = conn.recolor ? conn.recolor : {};
        if (m.sender in conn.recolor)
          throw "Masih Ada Proses Yang Belum Selesai Kak, Silahkan Tunggu Sampai Selesai Yah >//<";
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime) throw `Fotonya Mana Kak?`;
        if (!/image\/(jpe?g|png)/.test(mime))
          throw `Mime ${mime} tidak support`;
        else conn.recolor[m.sender] = true;
        m.reply("Proses Kak...");
        let img = await q.download?.();
        let error;
        try {
          const This = await processing(img, "recolor");
          conn.sendFile(m.chat, This, "", "Sudah Jadi Kak >//<", m);
        } catch (er) {
          error = true;
        } finally {
          if (error) {
            m.reply("Proses Gagal :(");
          }
          delete conn.recolor[m.sender];
        }
      }
      break;
    case "hd":
    case "hdr":
      {
        conn.hdr = conn.hdr ? conn.hdr : {};
        if (m.sender in conn.hdr)
          throw "Masih Ada Proses Yang Belum Selesai Kak, Silahkan Tunggu Sampai Selesai Yah >//<";
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime) throw `Fotonya Mana Kak?`;
        if (!/image\/(jpe?g|png)/.test(mime))
          throw `Mime ${mime} tidak support`;
        else conn.hdr[m.sender] = true;
        m.reply("Proses Kak...");
        let img = await q.download?.();
        let error;
        try {
          const This = await conn.getFile(
            await processing(img, "enhance"),
            true
          );
          const urlimg = await TelegraPh(This.filename);
          conn.sendFile(
            m.chat,
            This.filename,
            "",
            `Sudah Jadi Kak >//<\n\nDownload disini jika blur yang di atas\n${urlimg}`,
            m
          );
        } catch (er) {
          error = true;
          console.log(er);
        } finally {
          if (error) {
            m.reply("Proses Gagal :(");
          }
          delete conn.hdr[m.sender];
        }
      }
      break;
  }
};
handler.help = ["enhancer", "hdr", "colorize"];
handler.tags = ["tools"];
handler.premium = true;
handler.command = [
  "unblur",
  "enchaner",
  "enhance",
  "hdr",
  "colorize",
  "hd",
  "recolor",
];
export default handler;
