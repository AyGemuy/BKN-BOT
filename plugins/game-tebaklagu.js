import fetch from "node-fetch";

let timeout = 120000;
let poin = 1000;
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {};
  let id = m.chat;
  if (id in conn.tebaklagu) {
    conn.reply(
      m.chat,
      "Masih ada soal belum terjawab di chat ini",
      conn.tebaklagu[id][0]
    );
    throw false;
  }
  // ubah isi 'id' kalo mau ganti playlist spotifynya
  let res = await fetch(
    `https://raw.githubusercontent.com/ArifzynXD/database/master/games/tebaklagu.json`
  );
  if (res.status !== 200) throw await res.text();
  let result = await res.json();
  let json = result.getRandom();
  // if (!json.status) throw json
  let caption = `
TEBAK JUDUL LAGU
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik *${usedPrefix}cek* untuk bantuan
Bonus: ${poin} XP
*Balas pesan ini untuk menjawab!*`.trim();
  conn.tebaklagu[id] = [
    await conn.sendButton(m.chat, caption, wm, [["Bantuan", ".cek"]], m),
    json,
    poin,
    setTimeout(() => {
      if (conn.tebaklagu[id])
        conn.reply(
          m.chat,
          `Waktu habis!\nJawabannya adalah *${json.judul}*`,
          conn.tebaklagu[id][0]
        );
      delete conn.tebaklagu[id];
    }, timeout),
  ];
  await conn.sendFile(m.chat, json.lagu, "coba-lagi.mp3", "", m);
};
handler.help = ["tebaklagu"];
handler.tags = ["game"];
handler.command = /^tebaklagu$/i;
handler.limit = true;
export default handler;
