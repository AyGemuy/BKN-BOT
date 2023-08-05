let handler = async (m, { conn, command }) => {
  const grup = await conn.groupMetadata(m.chat);
  let mmk = grup.participants;
  let groupMembers = mmk.getRandom().id;
  switch (command) {
    case "bego":
    case "tolol":
    case "pinter":
    case "pintar":
    case "asu":
    case "bodoh":
    case "gay":
    case "lesby":
    case "bajingan":
    case "jancok":
    case "anjing":
    case "ngentod":
    case "ngentot":
    case "monyet":
    case "mastah":
    case "newbie":
    case "bangsat":
    case "bangke":
    case "sange":
    case "sangean":
    case "dakjal":
    case "horny":
    case "wibu":
    case "puki":
    case "pantek":
      let teks = `*Siapa Yang ${command}?*\n*Yaitu* @${
        groupMembers.split("@")[0]
      }`;
      conn.sendMessage(
        m.chat,
        { text: teks, mentions: [groupMembers] },
        { quoted: m }
      );
      break;
  }
};
handler.help = handler.command = [
  "bego",
  "tolol",
  "pinter",
  "pintar",
  "asu",
  "bodoh",
  "gay",
  "lesby",
  "bajingan",
  "jancok",
  "anjing",
  "ngentod",
  "ngentot",
  "monyet",
  "mastah",
  "newbie",
  "bangsat",
  "bangke",
  "sange",
  "sangean",
  "dakjal",
  "horny",
  "wibu",
  "puki",
  "pantek",
];
handler.tags = ["fun"];

handler.group = true;

export default handler;
