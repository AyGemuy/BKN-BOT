import fetch from "node-fetch";
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  try {
    const sentMsg = await conn.sendContactArray(
      m.chat,
      [
        [
          `${nomorown}`,
          `${await conn.getName(nomorown + "@s.whatsapp.net")}`,
          `👑 Developer Bot `,
          `🚫 Don't call me 🥺`,
          `Caubong202@gmail.com`,
          `🇮🇩 Indonesia`,
          `🚀 https://lynk.id/cahyo_kun`,
          `👤 Gada pawang nih senggol dong 😔`,
        ],
        [
          `${conn.user.jid.split("@")[0]}`,
          `${await conn.getName(conn.user.jid)}`,
          `🔥 Bot WhatsApp 🐣`,
          `📵 Don't spam/call me 😢`,
          `Nothing`,
          `🇮🇩 Indonesia`,
          `🚀 https://lynk.id/cahyo_kun`,
          `🤖 Hanya bot biasa yang kadang suka eror ☺`,
        ],
      ],
      m
    );
    await conn.reply(
      m.chat,
      `Halo kak @${
        m.sender.split(`@`)[0]
      } itu nomor ownerku , jangan di spam ya ka😉`,
      sentMsg,
      { mentions: [m.sender] }
    );
  } catch {
    const sentMsg = await conn.sendContact(
      m.chat,
      `${nomorown}`,
      `${await conn.getName(nomorown + "@s.whatsapp.net")}`,
      m
    );
    await conn.reply(
      m.chat,
      `Halo kak @${
        m.sender.split(`@`)[0]
      } itu nomor team developerku, jangan di apa-apain ya kak😖`,
      sentMsg,
      { mentions: [m.sender] }
    );
  }
};
handler.command = /^(own)$/i;

export default handler;
