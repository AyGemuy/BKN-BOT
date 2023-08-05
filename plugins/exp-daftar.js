import { createHash } from "crypto";
import fetch from "node-fetch";
let Reg = /\|?(.*)([.|] *?)([\-/0-9]*)$/i;

let handler = async function (m, { text, usedPrefix, command }) {
  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
  let namae = conn.getName(m.sender);
  const sections = [
    {
      title: "Select Your Age Here !",
      rows: [
        {
          title: "Random Years",
          rowId:
            ".daftar " +
            namae +
            "." +
            pickRandom([
              "30",
              "29",
              "28",
              "27",
              "26",
              "25",
              "24",
              "23",
              "22",
              "21",
              "20",
              "19",
              "18",
              "17",
              "16",
              "15",
              "14",
              "13",
              "12",
              "11",
              "10",
              "9",
            ]),
        },
      ],
    },
    {
      title: "O L D",
      rows: [
        { title: "30 Years", rowId: ".daftar " + namae + ".30 " },
        { title: "29 Years", rowId: ".daftar " + namae + ".29 " },
        { title: "28 Years", rowId: ".daftar " + namae + ".28 " },
        { title: "27 Years", rowId: ".daftar " + namae + ".27 " },
        { title: "26 Years", rowId: ".daftar " + namae + ".26 " },
        { title: "25 Years", rowId: ".daftar " + namae + ".25 " },
        { title: "24 Years", rowId: ".daftar " + namae + ".24 " },
        { title: "23 Years", rowId: ".daftar " + namae + ".23 " },
        { title: "22 Years", rowId: ".daftar " + namae + ".22 " },
        { title: "21 Years", rowId: ".daftar " + namae + ".21 " },
      ],
    },
    {
      title: "Y O U N G",
      rows: [
        { title: "20 Years", rowId: ".daftar " + namae + ".20 " },
        { title: "19 Years", rowId: ".daftar " + namae + ".19 " },
        { title: "18 Years", rowId: ".daftar " + namae + ".18 " },
        { title: "17 Years", rowId: ".daftar " + namae + ".17 " },
        { title: "16 Years", rowId: ".daftar " + namae + ".16 " },
        { title: "15 Years", rowId: ".daftar " + namae + ".15 " },
        { title: "14 Years", rowId: ".daftar " + namae + ".14 " },
        { title: "13 Years", rowId: ".daftar " + namae + ".13 " },
        { title: "12 Years", rowId: ".daftar " + namae + ".12 " },
        { title: "11 Years", rowId: ".daftar " + namae + ".11 " },
        { title: "10 Years", rowId: ".daftar " + namae + ".10 " },
        { title: "9 Years", rowId: ".daftar " + namae + ".9 " },
      ],
    },
  ];

  const listMessage = {
    text: `Silakan pilih usia Anda di tombol bawah...`,
    footer: `*Your Name:* ${conn.getName(
      m.sender
    )}\n❔ Ingin nama kostum? type *${usedPrefix + command} yourname.age*`,
    title: "▢- - - - - Verify - - - - -",
    buttonText: "Click Here !",
    sections,
  };

  let user = global.db.data.users[m.sender];
  if (user.registered === true)
    throw `[💬] Kamu sudah terdaftar\nMau daftar ulang? *${usedPrefix}unreg <SERIAL NUMBER>*`;
  if (!Reg.test(text))
    throw "Untuk melakukan pendaftaran anda perlu ketik !daftar YourName.2020-1-20 ( Format 2020-10-1 )";
  let [_, name, splitter, age] = text.match(Reg);
  if (!name) throw "Nama tidak boleh kosong (Alphanumeric)";
  if (!age) throw "Tanggal Lahir mu tidak boleh kosong ( Format 2020-10-1 )";
  let age_ = age.split("-");
  if (!age_[0]) {
    throw "TahunNya tidak boleh kosong ( Format 2020-10-1 )";
  } else if (parseInt(age_[0]) > new Date().getFullYear()) {
    throw "TahunNya Terlewat woy 🗿( Format 2020-10-1 )";
  }
  if (!age_[1]) {
    throw "BulanNya tidak boleh kosong ( Format 2020-10-1 )";
  } else if (parseInt(age_[1]) > 12) {
    throw "BulanNya Gk benar woy hanya sampe Bulan 1 SP 12 🗿( Format 2020-10-1 )";
  }
  if (!age_[2]) {
    throw "BulanNya tidak boleh kosong ( Format 2020-10-1 )";
  } else if (parseInt(age_[2]) > daysInMonth(age_[1], age_[0])) {
    throw `TanggalNya Gk benar woy hanya sampe Tanggal 1 SP ${daysInMonth(
      age_[1],
      age_[0]
    )} 🗿( Format 2020-10-1 )`;
  }
  age = getAge(age);
  if (age > 30) throw "WOI TUA (。-`ω´-)";
  if (age < 5) throw "Halah dasar bocil";
  user.name = name.trim();
  user.age = age_.join("-");
  user.regTime = +new Date();
  user.registered = true;
  let ppusr = await conn
    .profilePictureUrl(m.sender, "image")
    .catch((_) => "https://telegra.ph/file/411361bbb8014a54a8d51.jpg");
  let sn = createHash("md5").update(m.sender).digest("hex");
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
      ? m.quoted.sender
      : m.fromMe
      ? conn.user.jid
      : m.sender;
  let cap = `┏─• *Register*
│▸ *Status:* ☑️ sᴜᴄᴄᴇssғᴜʟ
│▸ *ID:* ${m.sender.split("@")[0]}
│▸ *Name:* ${name}
│▸ *Premium:* ${user.premiumTime ? "Yes" : "No"}
│▸ *Age:* ${age} Tahun
│▸ *Money:* ${NumberF(user.money)}
┗────···

Note : SN Sudah Di Kirim Ke Pribadi Chat, Silahkan Cek.`;
  await conn.reply(m.chat, `Membuat Data > @${m.sender.split`@`[0]}`, m, {
    mentions: [m.sender],
  });
  conn.delay(3000);
  await conn.reply(m.sender, `SN : ${sn}`, m);
  await conn.sendButton(
    m.chat,
    cap,
    `${namebot} © ${new Date().getFullYear()}`,
    ppusr,
    [["List Menu", ".menu"]],
    m
  );
};
handler.help = ["daftar", "register"].map((v) => v + " <nama>.<tanggal lahir>");
handler.tags = ["xp"];

handler.command = /^(daftar|verify|reg(ister)?)$/i;

export default handler;

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
//BY FONSGIDEV
