import db from "../lib/database.js";

//const cooldown = 1000 // 1 detik
//const cooldown = 60000 // 1 menit
//const cooldown = 3600000 // 1 jam
//const cooldown = 86400000 // 1 hari
//const cooldown = 2592000000 // 1 bulan

const cooldown = 1800000;
const cooldownn = 10000;

function ranNumb(min = null, max = null) {
  if (max !== null) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return Math.floor(Math.random() * min) + 1;
  }
}

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let user = global.db.data.users[m.sender];
  const need = 100;
  if (new Date() - user.lastberkebon <= cooldown)
    return m.reply(
      `Kamu sudah ${command}, tunggu beberapa saat untuk dapat ${command} lagi.\n\nSisa Waktu : 🕖 *${(
        user.lastberkebon +
        cooldown -
        new Date()
      ).toTimeString()}*`
    );
  if (user.pickaxe == 0)
    return m.reply(
      `Perlu *${usedPrefix}craft* pickaxe terlebih dahulu.\n\nAnda memiliki :\n━ ⛏️ ${user.pickaxe} PickAxe`
    );
  let ran = [{ buah: 0 }, { buah: 0 }, { buah: 0 }, { buah: 0 }, { buah: 0 }];
  for (let x of ran) {
    let random = ranNumb(80, 100);
    x.buah += random;
  }
  let gmkeb = `https://i.ibb.co/XpyTNc6/pickebon.jpg`;
  if (
    user.bibitmangga > need - 1 &&
    user.bibitapel > need - 1 &&
    user.bibitpisang > need - 1 &&
    user.bibitjeruk > need - 1 &&
    user.bibitanggur > need - 1
  ) {
    user.bibitmangga -= need;
    user.bibitapel -= need;
    user.bibitpisang -= need;
    user.bibitjeruk -= need;
    user.bibitanggur -= need;

    user.pickaxedurability -= ranNumb(80, 120);
    if (user.pickaxedurability <= 0) {
      user.pickaxedurability = 0;
      user.pickaxe = 0;
    }

    setTimeout(() => {
      user.mangga += ran[0].buah;
      user.apel += ran[1].buah;
      user.pisang += ran[2].buah;
      user.jeruk += ran[3].buah;
      user.anggur += ran[4].buah;
      conn.sendButton(
        m.chat,
        `*[ SELESAI ]*\n\nKamu mendapatkan :\n🥭 +${ran[0].buah} Mangga\n🍎 +${ran[1].buah} Apel\n🍌 +${ran[2].buah} Pisang\n🍊 +${ran[3].buah} Jeruk\n🍇 +${ran[4].buah} Anggur`,
        author,
        [[`List Buah`, `${usedPrefix}buah`]],
        m
      );
    }, cooldownn);
    m.reply("_Sedang Berkebun..._");
    user.lastberkebon = new Date() * 1;
  } else {
    return m.reply(
      `Diperlukan masing-masing *${need}* bibit terdiri dari bibitmangga, bibitapel, bibitpisang, bibitjeruk, bibitanggur\n\nKamu memiliki :\n━ 🌾 ${user.bibitmangga} bibitmangga\n━ 🌾 ${user.bibitapel} bibitapel\n━ 🌾 ${user.bibitpisang} bibitpisang\n━ 🌾 ${user.bibitjeruk} bibitjeruk\n━ 🌾 ${user.bibitanggur} bibitanggur`
    );
  }
};

handler.help = ["berkebun"];
handler.tags = ["rpg"];
handler.command = /^(berkeb(o|u)n)$/i;

handler.cooldown = cooldown;
handler.group = true;

export default handler;
