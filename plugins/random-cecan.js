import fetch from "node-fetch";

const Arifzyn = global.author;
let handler = async (m, { conn, usedPrefix, command, args }) => {
  let caption = `Halo @${m.sender.split`@`[0]}, 

Silahkan Pilih Type Cecan Di Bawah`;
  const sections = [
    {
      title: "Silahkan Pilih Type Cecan",
      rows: [
        {
          title: "𝐶ℎ𝑖𝑛𝑎",
          rowId: usedPrefix + "cecan china",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝐼𝑛𝑑𝑜𝑛𝑒𝑠𝑖𝑎",
          rowId: usedPrefix + "cecan indonesia",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝐽𝑎𝑝𝑎𝑛",
          rowId: usedPrefix + "cecan japan",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝐻𝑖𝑗𝑎𝑏𝑒𝑟",
          rowId: usedPrefix + "cecan justinaxie",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝐾𝑜𝑟𝑒𝑎",
          rowId: usedPrefix + "cecan korea",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝑀𝑎𝑙𝑎𝑦𝑠𝑖𝑎",
          rowId: usedPrefix + "cecan malaysia",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝑇ℎ𝑎𝑖𝑙𝑎𝑛𝑑",
          rowId: usedPrefix + "cecan thailand",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝑉𝑖𝑒𝑡𝑛𝑎𝑚",
          rowId: usedPrefix + "cecan vietnam",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝑅𝑎𝑛𝑑𝑜𝑚 𝐶𝑒𝑐𝑎𝑛",
          rowId: usedPrefix + "cecan cecan",
          description: "By : " + Arifzyn,
        },
      ],
    },
  ];
  const listMessage = {
    text: caption,
    mentions: [m.sender],
    footer: "By : " + Arifzyn,
    title: htki + " 𝐼𝑡'𝑠 𝑀𝑒 𝐴𝑟𝑖𝑓𝑧𝑦𝑛 " + htka,
    buttonText: `Click Here !`,
    sections,
  };
  if (!args[0])
    return await conn.sendMessage(m.chat, listMessage, { quoted: fkontak });
  let res = await fetch(
    "https://raw.githubusercontent.com/ArifzynXD/database/main/cecan/" +
      args[0] +
      ".json"
  );
  let rest = await res.json();
  let { url } = rest.getRandom();
  let cap = `Hai, @${m.sender.split`@`[0]}, 
Ayoloh Liat Apa 

_*Random Cecan:*_ ${args[0]}`;
  await conn.sendButtonImg(
    m.chat,
    url,
    cap,
    "By : " + Arifzyn,
    "⤤ 𝑁𝐸𝑋𝑇 ⤣",
    usedPrefix + `asupan ${args[0]}`,
    fkontak
  );
};
handler.help = ["cecan"];
handler.tags = ["internet", "random"];
handler.command = /^(cecan)$/i;

handler.premium = true;

export default handler;
