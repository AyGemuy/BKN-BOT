let { generateWAMessageFromContent } = await import("@adiwajshing/baileys");
import { promises } from "fs";
import { join } from "path";
import { xpRange } from "../lib/levelling.js";
import moment from "moment-timezone";
import os from "os";
import fs from "fs";
import fetch from "node-fetch";

const defaultMenu = {
  before: ` `.trimStart(),
  header: "╭─「 *%category* 」",
  body: `│• %cmd %isPremium %islimit`,
  footer: "╰────\n",
  after: `\n`,
};
let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {
  /**************************** TIME *********************/

  let wib = moment.tz("Asia/Jakarta").format("HH:mm:ss");
  let wibh = moment.tz("Asia/Jakarta").format("HH");
  let wibm = moment.tz("Asia/Jakarta").format("mm");
  let wibs = moment.tz("Asia/Jakarta").format("ss");
  let wit = moment.tz("Asia/Jayapura").format("HH:mm:ss");
  let wita = moment.tz("Asia/Makassar").format("HH:mm:ss");
  let wktuwib = `${wibh} H ${wibm} M ${wibs} S`;

  let mode = global.opts["self"] ? "Private" : "Publik";
  let _package =
    JSON.parse(
      await promises
        .readFile(join(__dirname, "../package.json"))
        .catch((_) => ({}))
    ) || {};
  let { age, exp, limit, level, role, registered, money } =
    global.db.data.users[m.sender];
  let { min, xp, max } = xpRange(level, global.multiplier);
  let name = await conn.getName(m.sender);
  let premium = global.db.data.users[m.sender].premiumTime;
  let prems = `${premium > 0 ? "Premium" : "Free"}`;
  let platform = os.platform();
  let vn = "./media/yntkts";
  //-----------TIME---------
  let ucpn = `${ucapan()}`;
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
      ? conn.user.jid
      : m.sender;
  let d = new Date(new Date() + 3600000);
  let locale = "id";
  let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
    Math.floor(d / 84600000) % 5
  ];
  let week = d.toLocaleDateString(locale, { weekday: "long" });
  let date = d.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  let dateIslamic = Intl.DateTimeFormat(locale + "-TN-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
  let time = d.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
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

  //---------------------

  let totalreg = Object.keys(global.db.data.users).length;
  let rtotalreg = Object.values(global.db.data.users).filter(
    (user) => user.registered == true
  ).length;
  let help = Object.values(global.plugins)
    .filter((plugin) => !plugin.disabled)
    .map((plugin) => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: "customPrefix" in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      };
    });

  let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length;
  let tags;
  let emot = `${pickRandom([
    "⎔",
    "◈▻",
    "✦",
    "⭑",
    "ᯬ",
    "⭔",
    "◉",
    "⬟",
    "᭻",
    "»",
    "〆",
    "々",
    "✗",
    "⛊",
    "⚜",
    "⚝",
    "⚚",
    "♪",
  ])}`;
  let rndom = `${pickRandom(["defaultMenu", "defmenu1"])}`;
  let teks = `${args[0]}`.toLowerCase();
  let arrayMenu = [
    "all",
    "anime",
    "update",
    "maker",
    "berita",
    "edukasi",
    "news",
    "random",
    "game",
    "bugmenu",
    "xp",
    "islamic",
    "stiker",
    "rpg",
    "kerangajaib",
    "quotes",
    "admin",
    "group",
    "premium",
    "internet",
    "anonymous",
    "nulis",
    "downloader",
    "tools",
    "fun",
    'database","quran',
    "vote",
    "nsfw",
    "audio",
    "jadibot",
    "info",
    "owner",
    "nocategory",
  ];
  if (!arrayMenu.includes(teks)) teks = "404";
  if (teks == "all")
    tags = {
      main: "Main",
      game: "Game",
      bugmenu: "Bug Menu",
      rpg: "RPG Games",
      xp: "Exp & Limit",
      sticker: "Sticker",
      kerang: "Kerang Ajaib",
      quotes: "Quotes",
      fun: "Fun",
      anime: "Anime",
      admin: "Admin",
      group: "Group",
      vote: "Voting",
      absen: "Absen",
      premium: "Premium",
      anonymous: "Anonymous Chat",
      internet: "Internet",
      downloader: "Downloader",
      tools: "Tools",
      nulis: "MagerNulis & Logo",
      audio: "Audio",
      maker: "Maker",
      berita: "Berita",
      database: "Database",
      quran: "Al Qur'an",
      owner: "Owner",
      host: "Host",
      advanced: "Advanced",
      info: "Info",
      "": "No Category",
    };
  if (teks == "game")
    tags = {
      game: "Game",
    };
  if (teks == "bugmenu")
    tags = {
      bugmenu: "Bug Menu",
    };
  if (teks == "anime")
    tags = {
      anime: "Anime",
    };
  if (teks == "nsfw")
    tags = {
      nsfw: "Nsfw",
    };
  if (teks == "rpg")
    tags = {
      rpg: "Rpg",
    };
  if (teks == "edukasi")
    tags = {
      edukasi: "Edukasi",
    };
  if (teks == "news")
    tags = {
      news: "News",
    };
  if (teks == "random")
    tags = {
      random: "Random",
    };
  if (teks == "xp")
    tags = {
      xp: "Exp & Limit",
    };
  if (teks == "stiker")
    tags = {
      sticker: "Stiker",
    };
  if (teks == "kerangajaib")
    tags = {
      kerang: "Kerang Ajaib",
    };
  if (teks == "quotes")
    tags = {
      quotes: "Quotes",
    };
  if (teks == "berita")
    tags = {
      berita: "Berita",
    };
  if (teks == "admin")
    tags = {
      admin: `Admin ${global.opts["restrict"] ? "" : "(Dinonaktifkan)"}`,
      group: "Grup",
    };
  if (teks == "group")
    tags = {
      group: "Group",
    };
  if (teks == "premium")
    tags = {
      premium: "Premium",
    };
  if (teks == "internet")
    tags = {
      internet: "Internet",
    };
  if (teks == "anonymous")
    tags = {
      anonymous: "Anonymous Chat",
    };
  if (teks == "nulis")
    tags = {
      nulis: "Nulis",
      maker: "Maker",
    };
  if (teks == "downloader")
    tags = {
      downloader: "Downloader",
    };
  if (teks == "tools")
    tags = {
      tools: "Tools",
    };
  if (teks == "fun")
    tags = {
      fun: "Fun",
    };
  if (teks == "database")
    tags = {
      database: "Database",
    };
  if (teks == "vote")
    tags = {
      vote: "Voting",
    };
  if (teks == "absen")
    tags = {
      absen: "Absen",
    };
  if (teks == "quran")
    tags = {
      quran: "Al-Qur'an",
      islamic: "Islamic",
    };
  if (teks == "audio")
    tags = {
      audio: "Audio",
    };
  if (teks == "jadibot")
    tags = {
      jadibot: "Jadi Bot",
    };
  if (teks == "info")
    tags = {
      info: "Info",
    };
  if (teks == "owner")
    tags = {
      owner: "Owner",
      host: "Host",
      advanced: "Advanced",
    };
  if (teks == "nsfw")
    tags = {
      nsfw: "Nsfw",
    };
  if (teks == "nocategory")
    tags = {
      "": "No Category",
    };
  try {
    // DEFAULT MENU
    let dash = global.dashmenu;
    let m1 = global.dmenut;
    let m2 = global.dmenub;
    let m3 = global.dmenuf;
    let m4 = global.dmenub2;

    // COMMAND MENU
    let cc = global.cmenut;
    let c1 = global.cmenuh;
    let c2 = global.cmenub;
    let c3 = global.cmenuf;
    let c4 = global.cmenua;

    // LOGO L P
    let lprem = global.lopr;
    let llim = global.lolm;
    let tag = `@${m.sender.split("@")[0]}`;

    let _mpt;
    if (process.send) {
      process.send("uptime");
      _mpt =
        (await new Promise((resolve) => {
          process.once("message", resolve);
          setTimeout(resolve, 1000);
        })) * 1000;
    }
    let mpt = clockString(_mpt);
    const sections = [
      {
        title: `⃟⟣⟚⟝ List Menu ${namebot} ⟞⟚⟢⃟`,
        rows: [
          {
            title: `${emot} RPG ${emot}`,
            rowId: ".? rpg",
            description: "● Menampilkan All Menu",
          },
          {
            title: `${emot} EXP ${emot}`,
            rowId: ".? xp",
            description: "● Menampilkan Menu Exp",
          },
          {
            title: `${emot} GAME ${emot}`,
            rowId: ".? game",
            description: "● Menampilkan Menu Game",
          },
          {
            title: `${emot} FUN ${emot}`,
            rowId: ".? fun",
            description: "● Menampilkan Menu Fun",
          },
          {
            title: `${emot} KERANG ${emot}`,
            rowId: ".? kerangajaib",
            description: "● Menampilkan Menu Kerang",
          },
          {
            title: `${emot} QUOTES ${emot}`,
            rowId: ".? quotes",
            description: "● Menampilkan Menu Quoted",
          },
          {
            title: `${emot} ANIME ${emot}`,
            rowId: ".? anime",
            description: "● Menampilkan Menu Anime",
          },
          {
            title: `${emot} NSFW ${emot}`,
            rowId: ".? nsfw",
            description: "● Menampilkan Menu Nsfw",
          },
          {
            title: `${emot} PREMIUM ${emot}`,
            rowId: ".? premium",
            description: "● Menampilkan Menu Premium",
          },
          {
            title: `${emot} ANONYMOUS ${emot}`,
            rowId: ".? anonymous",
            description: "Mᴇɴᴀᴍᴘɪʟᴋᴀɴ Anonymous Chat",
          },
          {
            title: `${emot} AL-QURAN ${emot}`,
            rowId: ".? quran",
            description: "● Menampilkan Menu Al-Qur'an",
          },
          {
            title: `${emot} INTERNET ${emot}`,
            rowId: ".? internet",
            description: "● Menampilkan Menu Internet",
          },
          {
            title: `${emot} BERITA ${emot}`,
            rowId: ".? berita",
            description: "● Menampilkan Menu Berita",
          },
          {
            title: `${emot} DOWNLOADER ${emot}`,
            rowId: ".? downloader",
            description: "● Menampilkan Menu Downloader",
          },
          {
            title: `${emot} STIKERS ${emot}`,
            rowId: ".? stiker",
            description: "● Menampilkan Menu Sticker",
          },
          {
            title: `${emot} NULIS ${emot}`,
            rowId: ".? nulis",
            description: "● Menampilkan Menu Nulis",
          },
          {
            title: `${emot} AUDIO ${emot}`,
            rowId: ".? audio",
            description: "● Menampilkan Menu Audio",
          },
          {
            title: `${emot} SOUND ${emot}`,
            rowId: ".soundmenu",
            description: "● Menampilkan Menu Sound",
          },
          {
            title: `${emot} GROUP ${emot}`,
            rowId: ".? group",
            description: "● Menampilkan Menu Group",
          },
          {
            title: `${emot} ADMIN ${emot}`,
            rowId: ".? admin",
            description: "● Menampilkan Menu Admin",
          },
          {
            title: `${emot} DATABASE ${emot}`,
            rowId: ".? database",
            description: "● Menampilkan Menu Databas",
          },
          {
            title: `${emot} TOOLS ${emot}`,
            rowId: ".? tools",
            description: "● Menampilkan Menu Tools",
          },
          {
            title: `${emot} INFO ${emot}`,
            rowId: ".? info",
            description: "● Menampilkan Menu Info",
          },
          {
            title: `${emot} OWNER ${emot}`,
            rowId: ".? owner",
            description: "● Menampilkan Menu Owner",
          },
        ],
      },
      {
        title: `⃟⟣⟚⟝ Support Me ⟞⟚⟢⃟`,
        rows: [
          {
            title: `⟐ Donasi ⟐`,
            rowId: ".donasi",
            description: "Donasi Agar Saya Semangat Untuk Update Bot:)",
          },
          {
            title: `⟐ Sewa Bot ⟐`,
            rowId: ".sewabot",
            description: "Mau Nyewa?",
          },
          {
            title: `⟐ Script ⟐`,
            rowId: ".sc",
            description: "Menampilkan Script Bot Ini",
          },
        ],
      },
    ];
    let psan = "bagaimana kabarmu?";
    let usrs = db.data.users[m.sender];
    let fkontak = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: `status@broadcast` } : {}),
      },
      message: {
        contactMessage: {
          displayName: wm,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${wm},;;;\nFN:${wm},\nitem1.TEL;waid=${
            m.sender.split("@")[0]
          }:${m.sender.split("@")[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`,
          jpegThumbnail: fs.readFileSync("./thumbnail.jpg"),
          thumbnail: fs.readFileSync("./thumbnail.jpg"),
          sendEphemeral: true,
        },
      },
    };
    let tagnya = `@${m.sender.split`@`[0]}`;
    let con = `┏━━━━━━━━━━━━━━━━━━━┓
┆     List Menu ${namebot}
┖┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┛`;
    let hariRayaramadan = new Date("April 21, 2023 23:59:59");
    let sekarangg = new Date().getTime();
    let lebih = hariRayaramadan - sekarangg;
    let harii = Math.floor(lebih / (1000 * 60 * 60 * 24));
    let jamm = Math.floor((lebih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let menitt = Math.floor((lebih % (1000 * 60 * 60)) / (1000 * 60));
    let detikk = Math.floor((lebih % (1000 * 60)) / 1000);
    let tett = `Hai @${m.sender.split`@`[0]}, ${ucapan()}

Silahkan Pilih List menu Yang Ada Di Bawah !

Note : Jika Anda Menemukan Bug/Error
Silahkan Report Ke Onwer Bot
`;
    let fot = `Nᴏᴛᴇ!! : Jɪᴋᴀ Aɴᴅᴀ Mᴇɴᴇᴍᴜᴋᴀɴ Bᴜɢ/Eʀʀᴏʀ 
Bɪsᴀ Rᴇᴘᴏʀᴛ Dᴇɴɢᴀɴ Cᴀʀᴀ ▻ ketik #report 
`;
    const listMessage = {
      text: tett,
      footer: author,
      mentions: [m.sender],
      title: htki + " LIST MENU " + htka + "\n",
      buttonText: `CLICK HERE ⎙`,
      sections,
    };
    if (teks == "404") {
      return conn.sendMessage(m.chat, listMessage, {
        quoted: fkontak,
        mentions: await conn.parseMention(con),
        contextInfo: { forwardingScore: 99999, isForwarded: true },
      });
    }

    let groups = {};
    for (let tag in tags) {
      groups[tag] = [];
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin);
    }
    conn.menu = conn.menu ? conn.menu : {};
    let before = conn.menu.before || defaultMenu.before;
    let header = conn.menu.header || defaultMenu.header;
    let body = conn.menu.body || defaultMenu.body;
    let footer = conn.menu.footer || defaultMenu.footer;
    let after =
      conn.menu.after ||
      (conn.user.jid == global.conn.user.jid
        ? ""
        : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) +
        defaultMenu.after;
    let _text = [
      before,
      ...Object.keys(tags).map((tag) => {
        return (
          header.replace(/%category/g, tags[tag]) +
          "\n" +
          [
            ...help
              .filter(
                (menu) => menu.tags && menu.tags.includes(tag) && menu.help
              )
              .map((menu) => {
                return menu.help
                  .map((help) => {
                    return body
                      .replace(/%cmd/g, menu.prefix ? help : "%_p" + help)
                      .replace(/%islimit/g, menu.limit ? llim : "")
                      .replace(/%isPremium/g, menu.premium ? lprem : "")
                      .trim();
                  })
                  .join("\n");
              }),
            footer,
          ].join("\n")
        );
      }),
      after,
    ].join("\n");
    let text =
      typeof conn.menu == "string"
        ? conn.menu
        : typeof conn.menu == "object"
        ? _text
        : "";
    let replace = {
      "%": "%",
      p: uptime,
      muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage
        ? _package.homepage.url || _package.homepage
        : "[unknown github url]",
      tag,
      dash,
      m1,
      m2,
      m3,
      m4,
      cc,
      c1,
      c2,
      c3,
      c4,
      lprem,
      llim,
      ucpn,
      platform,
      wib,
      mode,
      _p,
      money,
      age,
      tag,
      name,
      prems,
      level,
      limit,
      name,
      weton,
      week,
      date,
      dateIslamic,
      time,
      totalreg,
      rtotalreg,
      role,
      readmore: readMore,
    };
    text = text.replace(
      new RegExp(
        `%(${Object.keys(replace).sort((a, b) => b.length - a.length)
          .join`|`})`,
        "g"
      ),
      (_, name) => "" + replace[name]
    );

    let nomorown = "6289503433262";
    let ownernya = `@${nomorown.split`@`[0]}`;
    let almenu = `╔═══ *「 ${conn.getName(conn.user.jid)} 」* 
║
║⧐ ⸨ *.owner* ⸩
║⧐ ⸨ *.info* ⸩
║⧐ ⸨ *.levelup* ⸩
╠═════════════════❍
║⧐ 📈 Runtime : *${uptime}*
║⧐ 📈 OS Uptime : *${muptime}*
╚═════════════════════

╭───「 *PROFILMU* 」
├ • Nama  : ${name}
├ • Role : *${role}*
├ • Limit : *${limit}*
╰───────────── ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
${text.trim()}`;
    let nomorwa = "0";
    let d1 =
      "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    let d2 =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    let d3 =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    let d4 = "application/pdf";
    let d5 = "text/rtf";
    let td = `${pickRandom([d1, d2, d3, d4, d5])}`;
    let urlll = "https://my-arifzyn-dev.my.id";
    let weem = `Pᴏ�ᴇʀ Bʏ ⬝ @${nomorwa.split`@`[0]}\nCʀᴇᴀᴛᴏʀ Bᴏᴛ ⬝ @${
      nomorown.split`@`[0]
    }\n⫹⫺ DATE: ${week} ${date}\n⫹⫺ 𝗧𝗶𝗺𝗲: ${wktuwib}`;
    let Miku = [
      "https://telegra.ph/file/e846c7edea1d9ed0573eb.jpg",
      "https://telegra.ph/file/cd32966c6db265e419b99.jpg",
    ];
    conn.sendButton(
      m.chat,
      almenu + text.trim(),
      author,
      await conn.resize(Miku.getRandom(), 300, 150),
      [
        ["OWNER", ".owner"],
        ["DONATE", ".donasi"],
      ],
      m,
      { asLocation: true }
    );
  } catch (e) {
    conn.reply(m.chat, "Maaf, menu sedang error", m);
    throw e;
  }
};
handler.command = /^(tesm|\?)$/i;

handler.register = false;
handler.exp = 3;

export default handler;

//----------- FUNCTION -------

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [h, " H ", m, " M ", s, " S "]
    .map((v) => v.toString().padStart(2, 0))
    .join("");
}
function clockStringP(ms) {
  let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10;
  let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12;
  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30;
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [
    ye,
    " *Years 🗓️*\n",
    mo,
    " *Month 🌙*\n",
    d,
    " *Days ☀️*\n",
    h,
    " *Hours 🕐*\n",
    m,
    " *Minute ⏰*\n",
    s,
    " *Second ⏱️*",
  ]
    .map((v) => v.toString().padStart(2, 0))
    .join("");
}
function ucapan() {
  const time = moment.tz("Asia/Jakarta").format("HH");
  let res = "Sudah Dini Hari Kok Belum Tidur Kak? ��";
  if (time >= 4) {
    res = "Pagi Lord 🌄";
  }
  if (time >= 10) {
    res = "Selamat Siang Kak ☀️";
  }
  if (time >= 15) {
    res = "Selamat Sore Kak 🌇";
  }
  if (time >= 18) {
    res = "Malam Kak 🌙";
  }
  return res;
}
