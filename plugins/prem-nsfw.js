//   •-- MADE BY --•
//   | Letta - Sama && Papah-Chan ! 💗🐰
//   •-------------•
// CREDITS ! JANGAN DIUBAH, JANGAN DIHAPUS !!
// NOTE : UBAH APIKEY DI CONFIG.JS

//------ FUNCTION & MODULE
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

let { MessageType } = (await import("@adiwajshing/baileys")).default;
import fetch from "node-fetch";

//---------------------------------
let handler = async (
  m,
  { conn, command, args, usedPrefix, DevMode, isPrems }
) => {
  // ------- OTHER ------
  if (global.db.data.chats[m.chat].nsfw == false && m.isGroup)
    return conn.sendButton(
      m.chat,
      "❗ ᴏᴘᴛɪᴏɴs ɴsғᴡ ᴅɪᴄʜᴀᴛ ɪɴɪ ʙᴇʟᴜᴍ ᴅɪɴʏᴀʟᴀᴋᴀɴ ᴏʟᴇʜ ᴀᴅᴍɪɴ ɢʀᴏᴜᴘ",
      botdate,
      null,
      [["ᴇɴᴀʙʟᴇ", ".on nsfw"]],
      m
    );
  if (db.data.users[m.sender].premiumTime < 1)
    return m.reply("KHUSUS PREMIUM USER");
  let type = (args[0] || "").toLowerCase();
  let _type = (args[0] || "").toLowerCase();
  let ch = db.data.chats[m.chat].premnsfw;
  //--------------------------

  //---------------------SOURCE

  //zens
  let res = "https://zenzapis.xyz/api/morensfw/";
  let api = "?apikey=cahyokun";
  //--------------------------------

  // ••••••••••••••••• OPTIONS •••••••••••

  // > Example :
  // OPTIONS
  // • false = Free
  // • true = premium

  let ahegao = true;
  let anal = true;
  let ass = true;
  let blowjob = true;
  let cums = true;
  let ecchi = true;
  let ero = true;
  let erofeet = true;
  let erogirl = true;
  let holoero = true;
  let erokitsune = true;
  let eroneko = true;
  let eroyuri = true;
  let feet = true;
  let femdom = true;
  let futanari = true;
  let girlsolo = true;
  let hentai = true;
  let holo = true;
  let jahy = true;
  let kitsune = true;
  let kuni = true;
  let loli = true;
  let manga = true;
  let milf = true;
  let mstrb = true;
  let neko = true;
  let panties = true;
  let pussy = true;
  let oppai = true;
  let spank = true;
  let tentacles = true;
  let thighs = true;
  let tits = true;
  let trap = true;
  let uniform = true;
  let waifu = true;
  let yaoi = true;
  let yuri = true;

  //-------------------------------------

  //---------- TEXT -----------
  let next = "ɴ ᴇ x ᴛ";
  let fot = botdate;
  let txtprem =
    "❗ ɴsғᴡ ɪɴɪ ᴋʜᴜsᴜs ᴜsᴇʀ ᴘʀᴇᴍɪᴜᴍ\nʜᴀʀᴀᴘ ʜᴜʙᴜɴɢɪ ᴏᴡɴᴇʀ ᴜɴᴛᴜᴋ ᴍᴇᴍʙᴇʟɪ ᴘʀᴇᴍɪᴜᴍ ! 📞";
  let p = "🅟 | ";
  let f = "Ⓕ | ";

  let tekk = `\`\`\`➩ Random Image Nsfw ${
    args[0] ? args[0].capitalize() : false
  }\`\`\` `;
  let teks = `┊ 📮 Silahkan Pilih Dibawah!
┊› Atau ketik ${usedPrefix}nsfw neko
❏──···––`;
  //---------------------------

  //--------- BUTTON SELECTIONS ----------
  const sections = [
    {
      title: "◤◢◣◥◤◢◣◥◤◢◣◥◤◢◣◥◤◢◣◥◤◢◣◥◤◢◣◥◤◢◣◥",
      rows: [
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • Ahegao",
          rowId: ".nsfw nh1",
        },
        {
          title: `${(ch == true ? false : ahegao) == true ? p : f}` + "P • ass",
          rowId: ".nsfw nh2",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • bdsm",
          rowId: ".nsfw nh3",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • blowjob",
          rowId: ".nsfw nh33",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • cuckold",
          rowId: ".nsfw nh4",
        },
        {
          title: `${(ch == true ? false : ahegao) == true ? p : f}` + "P • cum",
          rowId: ".nsfw nh5",
        },
        {
          title: `${(ch == true ? false : ahegao) == true ? p : f}` + "P • ero",
          rowId: ".nsfw nh6",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • fremdom",
          rowId: ".nsfw nh7",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • foot",
          rowId: ".nsfw nh8",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • gangbang",
          rowId: ".nsfw nh9",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • glasses",
          rowId: ".nsfw nh10",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • hentai",
          rowId: ".nsfw nh11",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` +
            "P • hentai gif",
          rowId: ".nsfw nh12",
        },
        {
          title:
            `${(ch == true ? false : hentai) == true ? p : f}` +
            "H • HentaiVideo",
          rowId: ".hentaivid",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • jahy",
          rowId: ".nsfw nh13",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • maid",
          rowId: ".nsfw nh14",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • manga",
          rowId: ".nsfw nh15",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` +
            "P • masturbation",
          rowId: ".nsfw nh16",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` +
            "P • mobilewal",
          rowId: ".nsfw nh17",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • netorare",
          rowId: ".nsfw nh18",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • neko",
          rowId: ".nsfw nh19",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • orgy",
          rowId: ".nsfw nh20",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • panties",
          rowId: ".nsfw nh21",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • pussy",
          rowId: ".nsfw nh22",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • SfwNeko",
          rowId: ".nsfw nh23",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` +
            "P • Tentacles",
          rowId: ".nsfw nh24",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • Thighs",
          rowId: ".nsfw nh25",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` + "P • yuri",
          rowId: ".nsfw nh26",
        },
        {
          title:
            `${(ch == true ? false : ahegao) == true ? p : f}` +
            "P • ZettaiRyouiki",
          rowId: ".nsfw nh27",
        },
      ],
    },
  ];

  const listMessage = {
    text: teks,
    footer: "┏- - - - -  INFO - - - - -\n┊ 🅟 = Premium\n┊ Ⓕ = Free\n┗•",
    title: `❏––––[ *NSFW* ]–––`,
    buttonText: "- -NSFW- -",
    sections,
  };
  //--------------------------------

  //------------ CASE NSFW ! ------------
  try {
    if (/(nsfw|hentai)/i.test(command)) {
      const count =
        args[1] && args[1].length > 0
          ? Math.min(99999999, Math.max(parseInt(args[1]), 1))
          : !args[1] || args.length < 3
          ? 1
          : Math.min(1, count);
      switch (type) {
        case "nh1":
          if ((ch == true ? false : ahegao) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "ahegao" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh2":
          if ((ch == true ? false : anal) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "ass" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh3":
          if ((ch == true ? false : ass) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "bdsm" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh33":
          if ((ch == true ? false : ass) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "blowjob" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh4":
          if ((ch == true ? false : cums) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "cuckold" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh5":
          if ((ch == true ? false : ecchi) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "cum" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh6":
          if ((ch == true ? false : ero) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "ero" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh7":
          if ((ch == true ? false : fremdom) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "femdom" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh8":
          if ((ch == true ? false : erogirl) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "foot" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh9":
          if ((ch == true ? false : holoero) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "gangbang" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh10":
          if ((ch == true ? false : erokitsune) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "glasses" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh11":
          if ((ch == true ? false : eroneko) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "hentai" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh12":
          if ((ch == true ? false : eroyuri) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "hentaigif" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh13":
          if ((ch == true ? false : feet) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "jahy" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh14":
          if ((ch == true ? false : femdom) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "maid" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh15":
          if ((ch == true ? false : futanari) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "manga" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh16":
          if ((ch == true ? false : girlsolo) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "masturbation" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh17":
          if ((ch == true ? false : holo) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "mobilewall" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh18":
          if ((ch == true ? false : jahy) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "netorare" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh19":
          if ((ch == true ? false : kitsune) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "nsfwneko" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh20":
          if ((ch == true ? false : kuni) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "orgy" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh21":
          if ((ch == true ? false : loli) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "panties" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh22":
          if ((ch == true ? false : manga) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "pussy" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh23":
          if ((ch == true ? false : milf) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "sfwneko" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh24":
          if ((ch == true ? false : mstrb) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "tentacles" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh25":
          if ((ch == true ? false : neko) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "thighs" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh26":
          if ((ch == true ? false : oppai) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "yuri" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        case "nh27":
          if ((ch == true ? false : panties) == true) {
            if (!isPrems)
              return conn.sendButton(
                m.chat,
                txtprem,
                botdate,
                [
                  ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
                  ["ᴏᴡɴᴇʀ", ".owner nomor"],
                ],
                m
              );
          }
          conn.sendButton(
            m.chat,
            tekk,
            fot,
            await (await fetch(res + "zettairyouiki" + api)).buffer(),
            [[next, `${usedPrefix}nsfw ${args[0]}`]],
            m
          );
          break;

        default:
          return await conn.sendMessage(m.chat, listMessage, {
            quoted: m,
            contextInfo: { mentionedJid: [m.sender] },
          });
      }
    } else if (/hentong/i.test(command)) {
      const count =
        args[2] && args[2].length > 0
          ? Math.min(99999999, Math.max(parseInt(args[2]), 1))
          : !args[2] || args.length < 4
          ? 1
          : Math.min(1, count);
      switch (_type) {
        case "A":
          break;
        case "":
          break;
        default:
          return conn.sendButton(
            m.chat,
            caption,
            fot,
            null,
            [`⋮☰ Menu`, `.menu`],
            m
          );
      }
    }
  } catch (err) {
    m.reply("Error\n\n\n" + err.stack);
  }
  //-----------------------------
};

handler.help = ["nsfw <type>", "hentai <type>"];
handler.tags = ["premium", "nsfw"];
handler.command = /^(nsfw|hentai)/i;

handler.premium = true;

export default handler;
