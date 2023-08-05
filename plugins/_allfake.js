import fs from "fs";
import fetch from "node-fetch";
import moment from "moment-timezone";
import { scraper } from "arifzyn-scraper";
import PhoneNumber from "awesome-phonenumber";

let handler = (m) => m;
handler.all = async function (m) {
  let sapa = ["Hai", "Ohayo", "Kyaa", "Halo", "Nyann"].getRandom();
  let name = await conn.getName(m.sender);
  let pp =
    "https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg";
  try {
    pp = await this.profilePictureUrl(m.sender, "image").catch((_) =>
      hwaifu.getRandom()
    );
  } catch (e) {
  } finally {
    //global.bg = await (await fetch(img)).buffer()
    global.doc = pickRandom([
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/msword",
      "application/pdf",
    ]);

    // Module
    global.fetch = await import("node-fetch");
    global.bochil = await import("@bochilteam/scraper");
    global.func = (await import("../scraper/function.js")).default;
    global.scrp = scraper;

    // text
    global.txtprem = "*FITUR INI KHUSUS PREMIUM USER*";

    let _uptime = process.uptime() * 1000;
    let _muptime;
    if (process.send) {
      process.send("uptime");
      _muptime =
        (await new Promise((resolve) => {
          process.once("message", resolve);
          setTimeout(resolve, 1000);
        })) * 1000;
    }
    let muptime = clockString(_muptime);
    let uptime = clockString(_uptime);

    // Ini untuk command crator/owner
    global.kontak2 = [
      [
        owner[0],
        await conn.getName(owner[0] + "@s.whatsapp.net"),
        "ᴅᴇᴠᴇʟᴏᴩᴇʀ ʙᴏᴛ",
        "fongsiapi@gmail.com",
        true,
      ],
      [
        owner[1],
        await conn.getName(owner[1] + "@s.whatsapp.net"),
        "ᴅᴇᴠᴇʟᴏᴩᴇʀ ʙᴏᴛ",
        "fongsiapi@gmail.com",
        true,
      ], // Kalo mau di tambah tinggal copy 1baris ini di tempel di bawahnya trs di edit dikit!
    ];

    // ucapan ini mah
    global.ucapan = ucapan();

    // pesan sementara
    global.ephemeral = "86400"; // 86400 = 24jam, kalo ingin di hilangkan ganti '86400' jadi 'null' atau ''

    // externalAdReply atau text with thumbnail. gatau bahasa Inggris? coba translate!
    global.adReply = {
      contextInfo: {
        forwardingScore: 9999,
        isForwarded: true, // ini biar ada tulisannya diteruskan berkali-kali, jika ingin di hilangkan ganti true menjadi false
        mentionedJid: [m.sender],
        externalAdReply: {
          // Bagian ini sesuka kalian berkreasi :'v
          showAdAttribution: true,
          title: global.ucapan,
          body: "Hallo " + name,
          mediaUrl: syt,
          description: "simple bot esm",
          previewType: "PHOTO",
          thumbnail: await (await fetch(pp)).buffer(),
          sourceUrl: syt,
        },
      },
    };
    global.fakeig = {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaUrl: sig,
          mediaType: "VIDEO",
          description: sig,
          title: "★BKN BOT BY BLUECKKN★",
          body: wm,
          thumbnailUrl: pp,
          sourceUrl: sig,
        },
      },
    };
    // Fake �
    global.ftroli = {
      key: { remoteJid: "status@broadcast", participant: "0@s.whatsapp.net" },
      message: {
        orderMessage: {
          itemCount: 1e55,
          status: 1,
          surface: 1,
          message: wm,
          orderTitle: wm,
          sellerJid: "0@s.whatsapp.net",
        },
      },
    };
    global.fkontak = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        ...(m.chat ? { remoteJid: "status@broadcast" } : {}),
      },
      message: {
        contactMessage: {
          displayName: wm,
          vcard: `
BEGIN:VCARD
VERSION:3.0
N:XL;${wm};;;
FN:${wm}
item1.TEL;waid=${nomorown}:${PhoneNumber("+" + nomorown).getNumber(
            "international"
          )}
item1.X-ABLabel:Ponsel
END:VCARD`.trim(),
          jpegThumbnail: fs.readFileSync("./thumbnail.jpg"),
          thumbnail: fs.readFileSync("./thumbnail.jpg"),
          sendEphemeral: true,
        },
      },
    };
    global.fvn = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        ...(m.chat ? { remoteJid: "status@broadcast" } : {}),
      },
      message: {
        audioMessage: {
          mimetype: "audio/ogg; codecs=opus",
          seconds: 999999999999,
          ptt: true,
        },
      },
    };

    global.ftextt = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: "status@broadcast" } : {}),
      },
      message: {
        extendedTextMessage: {
          text: wm,
          title: wm,
          jpegThumbnail: fs.readFileSync("./thumbnail.jpg"),
        },
      },
    };

    global.fliveLoc = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: "status@broadcast" } : {}),
      },
      message: {
        liveLocationMessage: {
          caption: "BY BLUECKKN",
          h: wm,
          jpegThumbnail: fs.readFileSync("./thumbnail.jpg"),
        },
      },
    };

    global.fliveLoc2 = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: "status@broadcast" } : {}),
      },
      message: {
        liveLocationMessage: {
          title: "BY BLUECKKN",
          h: wm,
          jpegThumbnail: fs.readFileSync("./thumbnail.jpg"),
        },
      },
    };

    global.ftoko = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: "0@s.whatsapp.net" } : {}),
      },
      message: {
        productMessage: {
          product: {
            productImage: {
              mimetype: "image/jpeg",
              jpegThumbnail: fs.readFileSync("./thumbnail.jpg"), //Gambarnye
            },
            title: wm, //Kasih namalu
            description: "Simple Bot Esm",
            currencyCode: "USD",
            priceAmount1000: "20000000",
            retailerId: "Ghost",
            productImageCount: 1,
          },
          businessOwnerJid: `0@s.whatsapp.net`,
        },
      },
    };

    global.fdocs = {
      key: {
        participant: "0@s.whatsapp.net",
      },
      message: {
        documentMessage: {
          title: wm,
          jpegThumbnail: fs.readFileSync("./thumbnail.jpg"),
        },
      },
    };

    global.fgclink = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "0@s.whatsapp.net",
      },
      message: {
        groupInviteMessage: {
          groupJid: "0@g.us",
          inviteCode: "null",
          groupName: "BY BLUECKKN",
          caption: wm,
          jpegThumbnail: fs.readFileSync("./thumbnail.jpg"),
        },
      },
    };

    global.fgif = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: "0@g.us" } : {}),
      },
      message: {
        videoMessage: {
          title: wm,
          h: wm,
          seconds: "999999999",
          gifPlayback: "true",
          caption: wm,
          jpegThumbnail: fs.readFileSync("./thumbnail.jpg"),
        },
      },
    };
    global.fpoll = {
      key: {
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
      },
      message: {
        pollCreationMessage: { name: "👋 Hay Kak :> " + name },
      },
    };
    global.fpayment = {
      key: {
        remoteJid: "0@s.whatsapp.net",
        fromMe: false,
        id: "BAE595C600522C9C",
        participant: "0@s.whatsapp.net",
      },
      message: {
        requestPaymentMessage: {
          currencyCodeIso4217: wm,
          amount1000: fsizedoc,
          requestFrom: "0@s.whatsapp.net",
          noteMessage: { extendedTextMessage: { text: "Hai Kak " + name } },
          expiryTimestamp: fsizedoc,
          amount: {
            value: fsizedoc,
            offset: fsizedoc,
            currencyCode: wm,
          },
        },
      },
    };
    global.fimage = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        ...(m.chat ? { remoteJid: "status@broadcast" } : {}),
      },
      message: {
        imageMessage: {
          title: wm,
          h: wm,
          seconds: "359996400",
          caption: wm,
          jpegThumbnail: fs.readFileSync("./thumbnail.jpg"),
        },
      },
    };
    global.fvid = {
      key: { participant: "0@s.whatsapp.net" },
      message: {
        videoMessage: {
          title: wm,
          h: wm,
          seconds: 999999999999,
          caption: "👋 " + sapa + " Kak :> " + name,
          jpegThumbnail: fs.readFileSync("./thumbnail.jpg"),
        },
      },
    };

    let h = [
      global.ftroli,
      global.fkontak,
      global.fpayment,
      global.fvn,
      global.fimage,
      global.ftextt,
      global.fliveLoc,
      global.fliveLoc2,
      global.ftoko,
      global.fdocs,
      global.fgclink,
      global.fgif,
      global.fvid,
      global.fpoll,
    ];
    global.fakes = h.getRandom();
  }
};

export default handler;

function ucapan() {
  const time = moment.tz("Asia/Jakarta").format("HH");
  let res = "Selamat malam 🌙";
  if (time >= 4) {
    res = "Selamat pagi 🌄";
  }
  if (time > 10) {
    res = "Selamat siang ☀️";
  }
  if (time >= 15) {
    res = "Selamat sore 🌅";
  }
  if (time >= 18) {
    res = "Selamat malam 🌙";
  }
  return res;
}

function clockString(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [h, " H ", m, " M ", s, " S "]
    .map((v) => v.toString().padStart(2, 0))
    .join("");
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
