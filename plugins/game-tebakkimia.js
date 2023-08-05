import fetch from "node-fetch";
let timeout = 120000;
let poin = 500;

let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {};
  let id = m.chat;
  if (id in conn.tebakkimia)
    return conn.reply(m.chat, "Belum dijawab!", conn.tebakkimia[id][0]);
  let res = await fetch(
    "https://raw.githubusercontent.com/ArifzynXD/database/master/games/tebakkimia.json"
  );
  let hsl = await res.json();
  let json = hsl.getRandom();
  let caption = `
Nama unsur dari lambang ${json.lambang} adalah...

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}teki untuk bantuan
Bonus: ${poin} XP
`.trim();
  conn.tebakkimia[id] = [
    await conn.reply(m.chat, caption, m),
    json,
    poin,
    setTimeout(() => {
      if (conn.tebakkimia[id])
        conn.sendButton(
          m.chat,
          `Waktu habis!\nJawabannya adalah *${json.unsur}*`,
          wm,
          [["Tebak Kimia", ".tebakkimia"]],
          conn.tebakkimia[id][0]
        );
      delete conn.tebakkimia[id];
    }, timeout),
  ];
};
handler.help = ["tebakkimia"];
handler.tags = ["game"];
handler.command = /^tebakkimia/i;

handler.game = true;

export default handler;
