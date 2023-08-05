import cheerio from "cheerio";
import axios from "axios";
import fetch from "node-fetch";

const ssweb = (url, device = "desktop") => {
  return new Promise((resolve, reject) => {
    const base = "https://www.screenshotmachine.com";
    const param = {
      url: url,
      device: device,
      cacheLimit: 0,
    };
    axios({
      url: base + "/capture.php",
      method: "POST",
      data: new URLSearchParams(Object.entries(param)),
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    })
      .then((data) => {
        const cookies = data.headers["set-cookie"];
        if (data.data.status == "success") {
          axios
            .get(base + "/" + data.data.link, {
              headers: {
                cookie: cookies.join(""),
              },
              responseType: "arraybuffer",
            })
            .then(({ data }) => {
              let result = {
                status: 200,
                author: author,
                result: data,
              };
              resolve(result);
            });
        } else {
          reject({ status: 404, author: author, message: data.data });
        }
      })
      .catch(reject);
  });
};

/*let handler = async (m, { conn, command, usedPrefix, text }) => {
  if (!text) throw "Masukan URL";
  m.reply(wait);
  let { result } = await ssweb(text);
  conn.sendFile(m.chat, result, "", text, m);
};*/
let handler = async (m, { conn, command, args }) => {
  if (!args[0]) return conn.reply(m.chat, "Masukkan Linknya Kak", m);
  await m.reply(wait);
  const site = /^(https?:\/\/)/i.test(args[0]) ? args[0] : `http://${args[0]}`;
  let img = await (
    await fetch(
      `https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
    )
  ).buffer();

  conn.sendMessage(m.chat, { image: img, caption: "Here" }, { quoted: m });
};
handler.command = handler.help = [
  "ssweb",
  "sswebhp",
  "sswebdesktop",
  "sswebtablet",
];
handler.tags = ["tools"];

export default handler;
