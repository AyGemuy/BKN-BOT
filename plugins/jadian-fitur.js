import { areJidsSameUser } from "@adiwajshing/baileys";
import fs from "fs";

const ktnmbk = JSON.parse(fs.readFileSync("./json/ktnmbk.json"));

let handler = async (
  m,
  { conn, usedPrefix, command, text, participants, groupMetadata }
) => {
  switch (command) {
    case "jadian":
    case "tembak":
      let toM = (a) => "@" + a.split("@")[0];
      if (!text) {
        let ps = groupMetadata.participants.map((v) => v.id);
        let a = ps.getRandom();
        let b;
        do b = ps.getRandom();
        while (b === a);
        let caption = `*Love Message...* ${toM(a)} ❤️ ${toM(
          b
        )}\n${await ktnmbk.getRandom()}`;
        await conn.sendButton(
          m.chat,
          caption,
          wm,
          null,
          [
            ["jodohnya", `${usedPrefix}jodohnya`],
            ["jodohku", `${usedPrefix}jodohku`],
          ],
          m,
          { mentions: conn.parseMention(caption) }
        );
      }
      if (isNaN(text)) {
        var number = text.split`@`[1];
      } else if (!isNaN(text)) {
        var number = text;
      }
      if (!text && !m.quoted)
        return conn.reply(
          m.chat,
          `Atau Masukan nomor, tag target atau balas pesan target`,
          m
        );
      if (isNaN(number)) return conn.reply(m.chat, `_*Nomor tidak valid.*_`, m);
      if (number.length > 15)
        return conn.reply(m.chat, `*_Format Tidak Valid.*_`, m);
      try {
        if (text) {
          var user = number + "@s.whatsapp.net";
        } else if (m.quoted.sender) {
          var user = m.quoted.sender;
        } else if (m.mentionedJid) {
          var user = number + "@s.whatsapp.net";
        }
      } catch (e) {
      } finally {
        let users = m.isGroup
          ? participants.find((v) => areJidsSameUser(v.jid == user))
          : {};
        if (!users)
          return conn.reply(
            m.chat,
            `*_Target atau Nomor tidak ditemukan, mungkin sudah keluar atau bukan anggota grup ini.*_`,
            m
          );
        if (user === m.sender)
          return conn.reply(
            m.chat,
            `_*Tidak bisa berpacaran dengan diri sendiri.*_`,
            m
          );
        if (user === conn.user.jid)
          return conn.reply(
            m.chat,
            `_*Tidak bisa berpacaran dengan saya. :')*_`,
            m
          );
        if (typeof global.db.data.users[user] == "undefined")
          return m.reply(
            "_*Orang yang anda tag tidak terdaftar di dalam database.*_"
          );
        var pacar = global.db.data.users[user].pasangan;
        var spac = global.db.data.users[m.sender].pasangan;
        if (
          global.db.data.users[m.sender].pasangan != "" &&
          global.db.data.users[global.db.data.users[m.sender].pasangan]
            .pasangan == m.sender &&
          global.db.data.users[m.sender].pasangan != user
        ) {
          conn.reply(
            m.chat,
            `Kamu sudah berpacaran dengan @${
              global.db.data.users[m.sender].pasangan.split("@")[0]
            }\n\nSilahkan putus dulu (ketik .putus untuk memutuskan hubungan) untuk menembak @${
              user.split("@")[0]
            }\n\nBtw yang setia dikit banget!`,
            m,
            {
              contextInfo: {
                mentionedJid: [user, global.db.data.users[m.sender].pasangan],
              },
            }
          );
        } else if (global.db.data.users[user].pasangan != "") {
          if (pacar) {
            if (
              m.sender == pacar &&
              global.db.data.users[m.sender].pasangan == user
            )
              return conn.reply(
                m.chat,
                `Anda sudah berpacaran dengan ${spac.split("@")[0]}`,
                m,
                { contextInfo: { mentionedJid: [spac] } }
              );
            conn.reply(
              m.chat,
              `Maaf, @${user.split("@")[0]} sudah berpacaran dengan @${
                pacar.split("@")[0]
              }\nSilahkan cari pasangan lain!`,
              m,
              { contextInfo: { mentionedJid: [user, pacar] } }
            );
          } else {
            global.db.data.users[m.sender].pasangan = user;
            conn.reply(
              m.chat,
              `${await ktnmbk.getRandom()}\n\nAnda baru saja mengajak @${
                user.split("@")[0]
              } berpacaran\n\nSilahkan menunggu jawaban darinya!\n\nKetik *${usedPrefix}terima @user* untuk menerima\n*${usedPrefix}tolak @user untuk menolak*`,
              m,
              { contextInfo: { mentionedJid: [user] } }
            );
          }
        } else if (global.db.data.users[user].pasangan == m.sender) {
          global.db.data.users[m.sender].pasangan = user;
          conn.reply(
            m.chat,
            `Selamat anda resmi berpacaran dengan @${
              user.split("@")[0]
            }\n\nSemoga langgeng dan bahagia selalu 🥳🥳🥳`,
            m,
            { contextInfo: { mentionedJid: [user] } }
          );
        } else {
          global.db.data.users[m.sender].pasangan = user;
          conn.reply(
            m.chat,
            `${await ktnmbk.getRandom()}\n\nKamu baru saja mengajak @${
              user.split("@")[0]
            } berpacaran\n\nSilahkan menunggu jawaban darinya!\n\nKetik *${usedPrefix}terima @user* untuk menerima\n*${usedPrefix}tolak @user untuk menolak*`,
            m,
            { contextInfo: { mentionedJid: [user] } }
          );
        }
      }
      break;
    case "terima":
      if (isNaN(text)) {
        var number = text.split`@`[1];
      } else if (!isNaN(text)) {
        var number = text;
      }
      if (!text && !m.quoted)
        return conn.reply(
          m.chat,
          `Berikan nomor, tag atau balas pesan target.`,
          m
        );
      if (isNaN(number))
        return conn.reply(m.chat, `Nomor yang anda masukan tidak salah!`, m);
      if (number.length > 15) return conn.reply(m.chat, `Format salah!`, m);
      try {
        if (text) {
          var user = number + "@s.whatsapp.net";
        } else if (m.quoted.sender) {
          var user = m.quoted.sender;
        } else if (m.mentionedJid) {
          var user = number + "@s.whatsapp.net";
        }
      } catch (e) {
      } finally {
        let users = m.isGroup
          ? participants.find((v) => areJidsSameUser(v.jid == user))
          : {};
        if (!users)
          return conn.reply(
            m.chat,
            `Target atau Nomor tidak ditemukan, mungkin sudah keluar atau bukan anggota grup ini.`,
            m
          );
        if (user === m.sender)
          return conn.reply(
            m.chat,
            `Tidak bisa berpacaran dengan diri sendiri!`,
            m
          );
        if (user === conn.user.jid)
          return conn.reply(m.chat, `Tidak bisa berpacaran dengan saya t_t`, m);
        let me = m.sender;

        if (global.db.data.users[user].pasangan != m.sender) {
          conn.reply(
            m.chat,
            `Maaf @${user.split("@")[0]} tidak sedang menembak anda`,
            m,
            { contextInfo: { mentionedJid: [user] } }
          );
        } else {
          global.db.data.users[m.sender].pasangan = user;
          conn.reply(
            m.chat,
            `Selamat anda resmi berpacaran dengan @${
              user.split("@")[0]
            }\n\nSemoga langgeng dan bahagia selalu @${
              user.split("@")[0]
            } 💓 @${me.split("@")[0]} 🥳🥳🥳`,
            m,
            { contextInfo: { mentionedJid: [user, me] } }
          );
        }
      }
      break;
    case "tolak":
      if (isNaN(text)) {
        var number = text.split`@`[1];
      } else if (!isNaN(text)) {
        var number = text;
      }
      if (!text && !m.quoted)
        return conn.reply(
          m.chat,
          `Masukan nomor, tag atau balas pesan target.`,
          m
        );
      if (isNaN(number))
        return conn.reply(m.chat, `Nomor yang anda masukan salah!`, m);
      if (number.length > 15) return conn.reply(m.chat, `Format salah!`, m);
      try {
        if (text) {
          var user = number + "@s.whatsapp.net";
        } else if (m.quoted.sender) {
          var user = m.quoted.sender;
        } else if (m.mentionedJid) {
          var user = number + "@s.whatsapp.net";
        }
      } catch (e) {
      } finally {
        let users = m.isGroup
          ? participants.find((v) => areJidsSameUser(v.jid == user))
          : {};
        if (!users)
          return conn.reply(
            m.chat,
            `Target atau Nomor tidak ditemukan, mungkin sudah keluar atau bukan anggota grup ini.`,
            m
          );
        if (user === m.sender)
          return conn.reply(
            m.chat,
            `Tidak bisa berpacaran dengan diri sendiri!`,
            m
          );
        if (user === conn.user.jid)
          return conn.reply(
            m.chat,
            `*Tidak bisa berpacaran dengan saya t_t`,
            m
          );

        if (global.db.data.users[user].pasangan != m.sender) {
          conn.reply(
            m.chat,
            `Maaf @${user.split("@")[0]} tidak sedang menembak anda`,
            m,
            {
              contextInfo: {
                mentionedJid: [user],
              },
            }
          );
        } else {
          global.db.data.users[user].pasangan = "";
          conn.reply(
            m.chat,
            `Anda baru saja menolak @${
              user.split("@")[0]
            } untuk menjadi pasangan anda!`,
            m,
            {
              contextInfo: {
                mentionedJid: [user],
              },
            }
          );
        }
      }
      break;
    case "putus":
      var ayg = global.db.data.users[m.sender];
      var beb = global.db.data.users[global.db.data.users[m.sender].pasangan];
      if (ayg.pasangan == "") {
        return conn.reply(m.chat, `Anda tidak memiliki pasangan.`, m);
      }
      if (typeof beb == "undefined") {
        conn.reply(
          m.chat,
          `Berhasil putus hubungan dengan @${
            global.db.data.users[m.sender].pasangan.split("@")[0]
          }`,
          m,
          {
            contextInfo: {
              mentionedJid: [global.db.data.users[m.sender].pasangan],
            },
          }
        );
        ayg.pasangan = "";
      }
      if (m.sender == beb.pasangan) {
        conn.reply(
          m.chat,
          `Berhasil putus hubungan dengan @${
            global.db.data.users[m.sender].pasangan.split("@")[0]
          }`,
          m,
          {
            contextInfo: {
              mentionedJid: [global.db.data.users[m.sender].pasangan],
            },
          }
        );
        ayg.pasangan = "";
        beb.pasangan = "";
      } else {
        conn.reply(m.chat, `Anda tidak memiliki pasangan.`, m);
      }
      break;
    case "iklas":
      if (global.db.data.users[m.sender].pasangan == "")
        return conn.reply(m.chat, `Kamu sedang tidak menembak siapapun!`, m);
      if (
        global.db.data.users[global.db.data.users[m.sender].pasangan]
          .pasangan == m.sender
      )
        return conn.reply(
          m.chat,
          `Kamu telah berpacaran dengan @${
            global.db.data.users[m.sender].pasangan.split("@")[0]
          }`,
          m,
          {
            contextInfo: {
              mentionedJid: [global.db.data.users[m.sender].pasangan],
            },
          }
        );
      conn.reply(
        m.chat,
        `Kamu sudah mengikhlaskan @${
          global.db.data.users[m.sender].pasangan.split("@")[0]
        } karena dia tidak memberikan jawaban diterima atau ditolak`,
        m,
        {
          contextInfo: {
            mentionedJid: [global.db.data.users[m.sender].pasangan],
          },
        }
      );
      global.db.data.users[m.sender].pasangan = "";
      break;
    case "cekpacar":
      function no(number) {
        return number.replace(/\s/g, "").replace(/([@+-])/g, "");
      }
      text = no(text);
      if (isNaN(text)) {
        var number = text.split`@`[1];
      } else if (!isNaN(text)) {
        var number = text;
      }
      if (number.length > 15 || (number.length < 9 && number.length > 0))
        return conn.reply(m.chat, `Maaf, Nomor yang anda masukan salah!`, m);
      if (!text && !m.quoted) {
        var user = m.sender;
        var orang = "Kamu";
      } else if (text) {
        var user = number + "@s.whatsapp.net";
        var orang = "Orang yang kamu tag";
      } else if (m.quoted.sender) {
        var user = m.quoted.sender;
        var orang = "Orang yang kamu balas";
      } else if (m.mentionedJid) {
        var user = number + "@s.whatsapp.net";
        var orang = "Orang yang kamu tag";
      }
      if (typeof global.db.data.users[user] == "undefined") {
        return m.reply("Target tidak terdaftar di dalam database!");
      }
      if (
        typeof global.db.data.users[global.db.data.users[user].pasangan] ==
          "undefined" &&
        global.db.data.users[user].pasangan != ""
      ) {
        return m.reply("Target tidak terdaftar di dalam database!");
      }
      if (global.db.data.users[user].pasangan == "") {
        conn.reply(
          m.chat,
          `${orang} tidak memiliki pasangan dan tidak sedang menembak siapapun\n\n*Ketik .jadian @user untuk menembak seseorang*`,
          m
        );
      } else if (
        global.db.data.users[global.db.data.users[user].pasangan].pasangan !=
        user
      ) {
        conn.reply(
          m.chat,
          `${orang} sedang menunggu jawaban dari @${
            global.db.data.users[user].pasangan.split("@")[0]
          } karena sedang tidak diterima atau di tolak\n\nKetik *${usedPrefix}ikhlasin* untuk mengikhlaskan!`,
          m,
          {
            contextInfo: {
              mentionedJid: [global.db.data.users[user].pasangan],
            },
          }
        );
      } else {
        conn.reply(
          m.chat,
          `${orang} sedang menjalani hubungan dengan @${
            global.db.data.users[user].pasangan.split("@")[0]
          } 💓💓💓`,
          m,
          {
            contextInfo: {
              mentionedJid: [global.db.data.users[user].pasangan],
            },
          }
        );
      }
      break;
  }
};
handler.help = handler.command = [
  "tembak",
  "jadian",
  "terima",
  "tolak",
  "putus",
  "iklas",
  "cekpacar",
];
handler.tags = ["jadian"];

handler.group = true;
handler.limit = false;

export default handler;
