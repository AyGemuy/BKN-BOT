const pay = db.data.datas.payment;

let handler = async (m, { conn, usedPrefix, command }) => {
  const { data } = await conn.getFile(await conn.resize(pay[0].qris, 200, 200));
  const ftexx = {
    key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: "status@broadcast" } : {}),
    },
    message: {
      extendedTextMessage: {
        text: "Thank You For Donate",
        title: author,
        jpegThumbnail: data,
      },
    },
  };

  let caption = `Hai @${m.sender.split`@`[0]}, Ingin Donasi ?

Pilih Type Payment Di Bawah,`;
  let foot = `1. Note : Jika Tidak Ingin Donasi, Tidak Usah 
Di Click List Yang Ada Di Bawah

2. Note : Jika Sudah Donasi Silahkan Kirim Bukti
Ke Owner !`;
  const sections = [
    {
      title: "Silahkan Pilih Payment",
      rows: [
        {
          title: "Dana",
          rowId: usedPrefix + "dana",
          description: "Donate Via Dana",
        },
        {
          title: "Gopay",
          rowId: usedPrefix + "gopay",
          description: "Donate Via Gopay",
        },
        {
          title: "Pulsa",
          rowId: usedPrefix + "pulsa",
          description: "Donate Via Pulsa",
        },
        {
          title: "Saweria",
          rowId: usedPrefix + "saweria",
          description: "Donate Via Saweria Link",
        },
        {
          title: "Qris",
          rowId: usedPrefix + "qris",
          description: "Donate Via Qris",
        },
      ],
    },
    {
      title: "List Other",
      rows: [
        {
          title: "Owner Bot",
          rowId: usedPrefix + "owner",
          description: "Info Bot Owner",
        },
      ],
    },
  ];
  const listMessage = {
    text: caption,
    mentions: [m.sender],
    footer: foot,
    title: null,
    buttonText: "Click Here !",
    sections,
  };
  switch (command) {
    case "donasi":
    case "donate":
      {
        conn.sendMessage(m.chat, listMessage, { quoted: ftexx });
      }
      break;
    case "dana":
      {
        conn.sendMessage(
          m.chat,
          { text: `Payment To ${command} = ${pay[0].dana}` },
          { quoted: ftexx }
        );
      }
      break;
    case "gopay":
      {
        conn.sendMessage(
          m.chat,
          { text: `Payment To ${command} = ${pay[0].gopay}` },
          { quoted: ftexx }
        );
      }
      break;
    case "pulsa":
      {
        conn.sendMessage(
          m.chat,
          { text: `Payment To ${command} = ${pay[0].pulsa}` },
          { quoted: ftexx }
        );
      }
      break;
    case "saweria":
      {
        conn.sendMessage(m.chat, {
          text: "Click To Coppy URL",
          templateButtons: [
            {
              index: 1,
              urlButton: {
                displayText: `Copy Link`,
                url: `${pay[0].saweria}`,
              },
            },
          ],
          footer: "Pay To Saweria",
        });
      }
      break;
    case "qris":
      {
        conn.sendMessage(
          m.chat,
          {
            image: {
              url: pay[0].qris,
            },
            caption: `Scan Di Atas Untuk Bayar`,
          },
          { quoted: ftexx }
        );
      }
      break;
  }
};
handler.help = handler.command = [
  "donasi",
  "donate",
  "dana",
  "gopay",
  "pulsa",
  "saweria",
  "qris",
];
handler.tags = ["info"];

export default handler;
