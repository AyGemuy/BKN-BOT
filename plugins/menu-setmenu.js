let handler = async (m, { conn, usedPrefix, command, args }) => {
  let setbot = global.db.data.settings[conn.user.jid];

  if (args[0] === "templateImage") {
    setbot.templateImage = true;
    setbot.templateVideo = false;
    setbot.templateGif = false;
    setbot.templateMsg = false;
    setbot.templateDocument = false;
    setbot.templateLoc = false;
    m.reply(`Succes Set menu ${args[0]}`);
  } else if (args[0] === "templateVideo") {
    setbot.templateImage = false;
    setbot.templateVideo = true;
    setbot.templateGif = false;
    setbot.templateMsg = false;
    setbot.templateLoc = false;
    m.reply(`Succes Set menu ${args[0]}`);
  } else if (args[0] === "templateGif") {
    setbot.templateImage = false;
    setbot.templateVideo = false;
    setbot.templateGif = true;
    setbot.templateMsg = false;
    setbot.templateDocument = false;
    setbot.templateLoc = false;
    m.reply(`Succes Set menu ${args[0]}`);
  } else if (args[0] === "templateMessage") {
    setbot.templateImage = false;
    setbot.templateVideo = false;
    setbot.templateGif = false;
    setbot.templateMsg = true;
    setbot.templateDocument = false;
    setbot.templateLoc = false;
    m.reply(`Succes Set menu ${args[0]}`);
  } else if (args[0] === "templateDocument") {
    setbot.templateImage = false;
    setbot.templateVideo = false;
    setbot.templateGif = false;
    setbot.templateMsg = false;
    setbot.templateDocument = true;
    setbot.templateLoc = false;
    m.reply(`Succes Set menu ${args[0]}`);
  } else if (args[0] === "templateLoc") {
    setbot.templateImage = false;
    setbot.templateVideo = false;
    setbot.templateGif = false;
    setbot.templateMsg = false;
    setbot.templateDocument = false;
    setbot.templateLoc = true;
    m.reply(`Succes Set menu ${args[0]}`);
  } else {
    const sections = [
      {
        title: "CHANGE BOT MENU",
        rows: [
          {
            title: "Image Menu",
            rowId: `.setmenu templateImage`,
            description: `Klik untuk mengubah menu ke Image Menu`,
          },
          {
            title: "Gif Menu",
            rowId: `.setmenu templateGif`,
            description: `Klik untuk mengubah menu ke Gif Menu`,
          },
          {
            title: "Video Menu",
            rowId: `.setmenu templateVideo`,
            description: `Klik untuk mengubah menu ke Video Menu`,
          },
          {
            title: "Text Menu",
            rowId: `.setmenu templateMessage`,
            description: `Klik untuk mengubah menu ke Text Menu`,
          },
          {
            title: "Document Menu",
            rowId: `.setmenu templateDocument`,
            description: `Klik untuk mengubah menu ke Document Menu`,
          },
          {
            title: "Location Menu",
            rowId: `.setmenu templateLoc`,
            description: `Klik untuk mengubah menu ke Location Menu`,
          },
        ],
      },
    ];
    await conn.sendMessage(
      m.chat,
      {
        text: `Pilih salah satu mode menu di bawah`,
        footer: `© By ArifzynXD`,
        title: "*CHANGE MENU*",
        buttonText: `Click Here`,
        sections,
      },
      { quoted: m }
    );
  }
};
handler.help = ["setmenu"];
handler.tags = ["main", "owner"];
handler.command = /^(setmenu)$/i;

handler.owner = true;

export default handler;
