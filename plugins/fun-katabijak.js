import fetch from "node-fetch";
import { quotes } from "../scraper/kata.js";

const img = await conn.getFile(
  await conn.resize(
    "https://telegra.ph/file/0f5c7a4224e82b5a47d71.jpg",
    200,
    200
  )
);

let handler = async (m, { conn, usedPrefix, command, args }) => {
  const ftexx = {
    key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: "status@broadcast" } : {}),
    },
    message: {
      extendedTextMessage: {
        text: "RESULT FROM : KATA BIJAK",
        title: author,
        jpegThumbnail: img.data,
      },
    },
  };

  const sections = [
    {
      title: "Silahkan Pilih !",
      rows: [
        { title: "Cinta", rowId: usedPrefix + command + " cinta" },
        { title: "Rindu", rowId: usedPrefix + command + " rindu" },
        { title: "Mimpi", rowId: usedPrefix + command + " mimpi" },
        { title: "Sendiri", rowId: usedPrefix + command + " sendiri" },
        { title: "Sabar", rowId: usedPrefix + command + " sabar" },
        { title: "Kesedihan", rowId: usedPrefix + command + " kesedihan" },
        { title: "Pernikahan", rowId: usedPrefix + command + " pernikahan" },
        { title: "Kemerdekaan", rowId: usedPrefix + command + " kemerdekaan" },
      ],
    },
  ];
  const listMessage = {
    text: `Hai @${
      m.sender.split(`@`)[0]
    },\nKata Kata Bijak\nSilahkan Pilih Kata Bijak Di Bawah !`,
    mentions: [m.sender],
    footer: "Kata Bijak By : https://jagokata.com/",
    title: htki + " 𝐼𝑡'𝑠 𝑀𝑒 𝐴𝑟𝑖𝑓𝑧𝑦𝑛 " + htka,
    buttonText: `Click Here !`,
    sections,
  };

  if (!args[0])
    return await conn.sendMessage(m.chat, listMessage, { quoted: fkontak });
  let res = await quotes(args[0]);
  let { data } = res;
  let caption = `Hai Hai @${m.sender.split(`@`)[0]}, 

*RESULT FROM :* ${args[0]}

*AUTHOR :* ${data[0].author}
*BIO :* ${data[0].bio}
*QUOTES :* ${data[0].quote}`;

  await conn.sendMessage(
    m.chat,
    { text: caption, mentions: [m.sender] },
    { quoted: ftexx }
  );
};
handler.help = ["katabijak"];
handler.tags = ["fun"];
handler.command = /^(katabijak)$/i;

export default handler;
