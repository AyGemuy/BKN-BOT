import fetch from "node-fetch";
import fs from "fs";
import axios from "axios";
let { MessageType } = (await import("@adiwajshing/baileys")).default;
let handler = (m) => m;

handler.all = async function (m, { isBlocked }) {
  if (isBlocked || m.fromMe) return;
  let isCmd = (cmd) => cmd.exec(m.text);

  let pp = await this.profilePictureUrl(m.sender, "image").catch(
    (_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png"
  );

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - */
  /* - - - - - - - Ini autoresponder - - - - - - - */
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  if (isCmd(/(.jadibotak)/i)) {
    conn.sendMessage(m.chat, {
      react: {
        text: pickRandom(["🤖", "🤖", "🤖"]),
        key: m.key,
      },
    });
    sleep(1000);
    conn.sendButton(
      m.chat,
      `mau jadibot? Ketik .sewa ${pickRandom(["🤖", "🤖", "🤖"])}`,
      null,
      null,
      [["Sewa Bot", "/sewa bot"]],
      m
    );
  }

  if (isCmd(/(aku cinta kamu|aku sayang kamu|I love you|love you)/i)) {
    conn.sendMessage(m.chat, {
      react: {
        text: pickRandom(["❤️", "🥰", "😍"]),
        key: m.key,
      },
    });
    sleep(1000);
    conn.sendButton(
      m.chat,
      `Aku juga sayang kamu ${pickRandom(["❤️", "🥰", "😍"])}`,
      null,
      null,
      [["Aku juga >.<", ""]],
      m
    );
  }

  if (
    isCmd(
      /(assalamualaikum|assallamualaikum|assalamu\'alaikum|as\'salamualaikum)/i
    )
  ) {
    let assalamualaikum = fs.readFileSync("./mp3/waalaikumsalam.ogg");
    conn.sendMessage(m.chat, {
      react: {
        text: pickRandom(["🥰", "😇", "😅"]),
        key: m.key,
      },
    });
    sleep(1000);
    conn.sendFile(m.chat, assalamualaikum, null, null, m, true);
    let caption = `*Waalaikummussalam warahmatullahi wabarokatuh*


_📚 Baca yang dibawah ya!_
"Orang yang mengucapkan salam seperti ini maka ia mendapatkan 30 pahala, kemudian, orang yang dihadapan atau mendengarnya membalas dengan kalimat yang sama yaitu “Wa'alaikum salam warahmatullahi wabarakatuh” atau ditambah dengan yang lain (waridhwaana). Artinya selain daripada do'a selamat juga meminta pada Allah SWT"
`;

    conn.sendButton(
      m.chat,
      caption,
      `Salam`,
      [["Waalaikummussalam", "warahmatullahi wabarokatuh"]],
      m
    );
  }

  if (isCmd(/(h(i|ai|ei|alo|elo|ello|allo) bot)/i)) {
    conn.sendMessage(m.chat, {
      react: {
        text: pickRandom(["🥰", "😇", "😅"]),
        key: m.key,
      },
    });
    sleep(1000);
    conn.sendButton(
      m.chat,
      pickRandom(["Hello ~", "Hello juga :3", "halo juga >.<", "halooo >w<"]),
      null,
      null,
      [[pickRandom(["OwO", ":D", "UwU"]), ""]],
      m
    );
  }

  if (isCmd(/(blush|kiwww)/i)) {
    conn.sendMessage(m.chat, {
      react: {
        text: pickRandom(["🥰", "😇", "😅"]),
        key: m.key,
      },
    });
    sleep(1000);
    conn.sendButton(
      m.chat,
      pickRandom(["Kiww ~", "Awww >w<"]),
      null,
      null,
      [[pickRandom(["7w7", "7///7", "U////U", "-////-"]), ""]],
      m
    );
  }
  /*if(isCmd(/hug|peluk/i)) {
     let res = await fetch(global.API("https://api.waifu.pics", "/sfw/hug"));
    let json = await res.json();
    conn.sendFile(m.chat, json.url, null, null, m)
  }*/
};

handler.limit = false;
export default handler;
