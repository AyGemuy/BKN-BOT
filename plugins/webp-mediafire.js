import request from "request";
import fs from "fs";

const server = JSON.parse(fs.readFileSync("./src/server.json"));
const host = server[0].url;
const uroot = server[0].username;
const proot = server[0].password;
const ipanda = server[0].ip;
const domain = "mediafire" + makeid(7) + "." + "wold.my.id";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

let handler = async (m, { conn, usedPrefix, text, command }) => {
  const namamu = await conn.getName(m.sender);
  const idmu = m.sender;
  await m.reply("sedang membuat... tunggu ± 1 menit");
  let inputt = {
    server: host,
    userwhm: uroot,
    passwhm: proot,
    ip: ipanda,
    domain: domain,
  };
  request.post(
    {
      url: "https://shirai.my.id/cishop/mediafire/createcp.php",
      form: inputt,
    },
    function (error, response, body) {
      function afakahinijson(str) {
        try {
          JSON.parse(str);
        } catch (e) {
          return false;
        }
        return true;
      }
      if (afakahinijson(body)) {
        hasil = JSON.parse(body);
        pathh = hasil.path;
        user = hasil.user;
        pass = hasil.pass;
        domain = hasil.domain;
        pendek = hasil.pendek;
        user = user.replace(/\s+/g, "");
        pass = pass.replace(/\s+/g, "");
        m.reply("Proses...");
        let inputt = {
          server: host,
          user: user,
          pass: pass,
          userwhm: uroot,
          passwhm: proot,
          tampilan: "mediafire",
          path: pathh,
        };
        request.post(
          {
            url: "https://shirai.my.id/cishop/mediafire/upload.php",
            form: inputt,
          },
          function (error, res, body) {
            m.reply(
              "_*BERHASIL!*, Data Segera di Kirim Ke chat Pribadi, Jika Belum masuk silahkan buat kembali (jangan spam)_"
            ); // berhasil mengupload sc
            if (afakahinijson(body)) {
              hasil = JSON.parse(body);
              console.log(hasil.path);
              console.log(hasil);
            } else {
              m.reply(
                "_*BERHASIL!*, Data Telah di Kirim Ke chat Pribadi, Jika Belum masuk silahkan buat kembali (jangan spam)_"
              );
            }
            let hasillrndy = `- Web Mediafire\n==========================\nWebsite : ${pendek}\nWeb Setting : ${domain}/vhsfhqpdhdsih6/host.php\n==========================\n_Tunggu 1-2 Menit Agar webnya siap digunakan_`;
            conn.reply(idmu, `hi ${namamu}`, m);
            conn.reply(idmu, hasillrndy, m);
          }
        );
      } else {
        m.reply("_Koneksi Terputus, Silahkan coba lagi dalam 5 Detik!_"); //error ,limit username,server mati, cpu naik, domain merah/error
      }
    }
  );
};
handler.help = ["webpmediafire"];
handler.tags = ["webp"];
handler.command = ["webpmediafire"];

handler.owner = true;

export default handler;
