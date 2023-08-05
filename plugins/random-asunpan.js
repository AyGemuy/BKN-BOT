import fs from "fs";

const Arifzyn = "𝑰𝒕'𝒔 𝑴𝒆 𝑨𝒓𝒊𝒇𝒛𝒚𝒏";

let handler = async (m, { conn, usedPrefix, command, args }) => {
  let caption = `Halo @${m.sender.split`@`[0]}, 
Mau Cuci Mata ? 

Silahkan Pilih Type Asupan Di Bawah`;
  const sections = [
    {
      title: "Silahkan Pilih Type Asupan",
      rows: [
        {
          title: "𝐵𝑜𝑐𝑖𝑙",
          rowId: usedPrefix + "asupan bocil",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝐶ℎ𝑖𝑛𝑎",
          rowId: usedPrefix + "asupan china",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝐺𝑒𝑎𝑦𝑢𝑏𝑖",
          rowId: usedPrefix + "asupan geayubi",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝐼𝑛𝑑𝑜𝑛𝑒𝑠𝑖𝑎",
          rowId: usedPrefix + "asupan indonesia",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝐽𝑎𝑝𝑎𝑛",
          rowId: usedPrefix + "asupan japan",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝐽𝑢𝑠𝑡𝑖𝑛𝐴𝑥𝑖𝑒",
          rowId: usedPrefix + "asupan justinaxie",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝐾𝑎𝑦𝑒𝑠",
          rowId: usedPrefix + "asupan kayes",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝐾𝑜𝑟𝑒𝑎",
          rowId: usedPrefix + "asupan korea",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝑀𝑎𝑙𝑎𝑠𝑖𝑎",
          rowId: usedPrefix + "asupan malaysia",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝑁𝑜𝑡𝑛𝑜𝑡",
          rowId: usedPrefix + "asupan notnot",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝑅𝑖𝑘𝑎𝑔𝑢𝑠𝑟𝑖𝑎𝑛𝑎",
          rowId: usedPrefix + "asupan rikagusriana",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝑆𝑎𝑛𝑡𝑢𝑖",
          rowId: usedPrefix + "asupan santuy",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝑇ℎ𝑎𝑖𝑙𝑎𝑛𝑑",
          rowId: usedPrefix + "asupan thailand",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝑉𝑖𝑒𝑡𝑛𝑎𝑚",
          rowId: usedPrefix + "asupan vietnam",
          description: "By : " + Arifzyn,
        },
        {
          title: "𝑅𝑎𝑛𝑑𝑜𝑚 𝐴𝑠𝑢𝑝𝑎𝑛",
          rowId: usedPrefix + "asupan asupan",
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
  let res = JSON.parse(fs.readFileSync(`./scraper/asupan/${args[0]}.json`));
  let { url } = res.getRandom();
  let cap = `Hai, @${m.sender.split`@`[0]}, 
Ayoloh Liat Apa 

_*𝕋𝕪𝕡𝕖 𝔸𝕤𝕦𝕡𝕒𝕟 :*_ ${args[0]}`;
  await conn.sendButton(
    m.chat,
    cap,
    "By : " + Arifzyn,
    url,
    [["⤤ 𝑁𝐸𝑋𝑇 ⤣", usedPrefix + `asupan ${args[0]}`]],
    m,
    { mentions: [m.sender] }
  );
};
handler.help = ["asupan"];
handler.tags = ["internet", "random"];
handler.command = /^(asupan)$/i;

handler.premium = true;

export default handler;
