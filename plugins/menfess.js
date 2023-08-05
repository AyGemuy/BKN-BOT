import { anonymous, createRoom } from "../lib/menfess.js";

let handler = async (m, { conn, usedPrefix, command, args, text }) => {
  switch (command) {
    case "menfes":
    case "confes":
    case "menfess":
    case "confess":
      {
        if (Object.values(anonymous).find((p) => p.check(m.sender)))
          return m.reply("Anda masih didalam room");
        if (args.length < 1)
          return m.reply(
            `Penggunaan ${usedPrefix + command} nomor|isi pesan\nContoh ${
              usedPrefix + command
            } 6285624823115|Hai Owner`
          );
        if (text > 700) return m.reply(`Teks Kepanjangan`);
        let num = text.split("|")[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        let pesan = text.split("|")[1];
        let cekno = await conn.onWhatsApp(num);
        if (cekno.length == 0)
          return m.reply(
            `Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`
          );
        if (num === m.sender)
          return m.reply(`Tidak Bisa Menfess Ke Nomor Sendiri!!!`);
        if (num === conn.user.jid)
          return m.reply(`Tidak Bisa Menfess Ke Nomor bot!!!`);
        var nomor = m.sender;
        conn.sendButton(
          num,
          `Hi Saya Bot Ada Yang Kirim Pesan Ke Kamu
Seseorang Temanmu
(Pengirim Rahasia)

-------------------------------------->

💌 Pesan : ${pesan}

-------------------------------------->`,
          `PENGIRIM RAHASIA
Anda Ingin Mengirimkan Pesan Ke Pacar/Sahabat/Teman/Doi/Mantan?
Tapi Tidak Ingin Tau Siapa Pengirimnya?
Kamu Bisa Menggunakan Bot Ini
Contoh Penggunaan: ${usedPrefix + command} nomor|pesan untuknya

Contoh: ${usedPrefix + command} 628xxxxxxxx|hai owner`,
          [["Biarin", ".menfesleave"]],
          null
        );
        await conn.sendMessage(
          num,
          {
            text: `𝘈𝘯𝘥𝘢 𝘑𝘶𝘨𝘢 𝘉𝘪𝘴𝘢 𝘔𝘦𝘮𝘣𝘢𝘭𝘢𝘴 𝘗𝘦𝘴𝘢𝘯 𝘕𝘺𝘢 𝘋𝘦𝘯𝘨𝘢𝘯 𝘊𝘢𝘳𝘢 𝘔𝘦𝘯𝘨𝘪𝘳𝘪𝘮 𝘗𝘦𝘴𝘢𝘯, 𝘑𝘪𝘬𝘢 𝘈𝘯𝘥𝘢 𝘛𝘪𝘥𝘢𝘬 𝘔𝘢𝘶 𝘔𝘦𝘮𝘣𝘢𝘭𝘢𝘴 𝘕𝘺𝘢 𝘗𝘦𝘯𝘤𝘦𝘵 𝘉𝘶𝘵𝘵𝘰𝘯 𝘽𝙞𝙖𝙧𝙞𝙣 𝘋𝘪 𝘈𝘵𝘢𝘴 𝘠𝘢𝘩 𝘔𝘢𝘬𝘢𝘴𝘪𝘩`,
          },
          { quoted: m }
        );
        let lidt = `Sukses Mengirim Pesan
👤 Dari : wa.me/${nomor.split("@s.whatsapp.net")[0]}
👥 Ke : wa.me/${text.split("|")[0].replace(/[^0-9]/g, "")}

⬡──⬡─────────⬡──⬡

Isi Pesan : ${pesan}

⬡──⬡─────────⬡──⬡

Silahkan Tunggu Balasan Dari Dia !`;
        var check = Object.values(anonymous).find((p) => p.state == "WAITING");
        if (!check) {
          createRoom(m.sender, num);
          console.log("[ MENFES ] Creating room for: " + m.sender);
          return m.reply(lidt);
        }
      }
      break;
    case "menfesleave":
      var room = Object.values(anonymous).find((p) => p.check(m.sender));
      if (!room) return m.reply("Anda tidak berada didalam room");
      m.reply("Bye...");
      var other = room.other(m.sender);
      delete anonymous[room.id];
      if (other != "") conn.sendMessage(other, { text: "Bye..." });
      if (command == "menfesleave") break;
  }
};
handler.help = handler.command = [
  "menfes",
  "confes",
  "menfess",
  "confess",
  "menfesleave",
];
handler.tags = ["random"];

handler.private = true;

export default handler;
