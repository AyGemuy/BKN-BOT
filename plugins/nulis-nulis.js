import fetch from "node-fetch";

let handler = async (m, { conn, args }) => {
  let txt = args.join` `;
  if (txt.length == 0) throw "Mana Text nya";
  await m.reply(wait);
  let lea = await fetch(
    API("https://d2a9469e-1213-4d50-9547-e3a32099faed.id.repl.co", "/", {
      nama: await m.name.slice(0, 40),
      txt,
    })
  );
  let data = await lea.json();
  for (const buff of data.img) {
    await conn.sendFile(m.chat, buff, "nulis.jpg", "Hati² ketahuan:v", m);
  }
};
handler.help = ["n"].map((v) => v + "ulis <teks>");
handler.tags = ["nulis"];
handler.command = /^nulis$/i;

export default handler;

// CODE BY FONGSIDEV
