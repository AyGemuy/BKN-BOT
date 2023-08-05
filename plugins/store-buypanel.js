let handler = async (m, { conn, text, command, usedPrefix }) => {
  let ownerNomer = global.nomorown;
  if (!text) {
    let sections = [
      {
        title: "-- LIST HARGA PANEL --",
        rows: [
          {
            title: "RAM 1GB CPU 25%",
            rowId: usedPrefix + "buypanel 1",
            description: "Rp10.000/Bulan",
          },
          {
            title: "RAM 2GB CPU 50%",
            rowId: usedPrefix + "buypanel 2",
            description: "Rp15.000/Bulan",
          },
          {
            title: "RAM 3GB CPU 75%",
            rowId: usedPrefix + "buypanel 3",
            description: "Rp20.000/Bulan",
          },
          {
            title: "RAM 4GB CPU 100%",
            rowId: usedPrefix + "buypanel 4",
            description: "Rp25.000/Bulan",
          },
          {
            title: "RAM 5GB CPU 130%",
            rowId: usedPrefix + "buypanel 5",
            description: "Rp30.000/Bulan",
          },
          {
            title: "RAM 6GB CPU 150%",
            rowId: usedPrefix + "buypanel 6",
            description: "Rp35.000/Bulan",
          },
          {
            title: "RAM 7GB CPU 175%",
            rowId: usedPrefix + "buypanel 7",
            description: "Rp40.000/Bulan",
          },
          {
            title: "RAM 8GB CPU 200%",
            rowId: usedPrefix + "buypanel 8",
            description: "Rp45.000/Bulan",
          },
          {
            title: "RAM UNLIMITED CPU UNLIMITED",
            rowId: usedPrefix + "buypanel 9",
            description: "Rp60.000/Bulan",
          },
        ],
      },
    ];
    let templateMessage = {
      text: "Berikut list harga panel\nYang kami sediakan.",
      footer: author,
      title: "*LIST HARGA PANEL*",
      buttonText: "LIST HARGA",
      sections,
    };
    conn.sendMessage(m.chat, templateMessage, { quoted: m });
  }
  if (/1/.test(text)) {
    m.reply(
      "Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat."
    );
    conn.sendMessage(
      ownerNomer + "@s.whatsapp.net",
      {
        text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp10.000\n*RAM:* 1GB\n*CPU:* 25%\n*DARI:* @${
          m.sender.split("@")[0]
        }`,
        mentions: [m.sender],
      },
      { quoted: m }
    );
  }
  if (/2/.test(text)) {
    m.reply(
      "Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat."
    );
    conn.sendMessage(
      ownerNomer + "@s.whatsapp.net",
      {
        text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp15.000\n*RAM:* 2GB\n*CPU:* 50%\n*DARI:* @${
          m.sender.split("@")[0]
        }`,
        mentions: [m.sender],
      },
      { quoted: m }
    );
  }
  if (/3/.test(text)) {
    m.reply(
      "Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat."
    );
    conn.sendMessage(
      ownerNomer + "@s.whatsapp.net",
      {
        text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp20.000\n*RAM:* 3GB\n*CPU:* 75%\n*DARI:* @${
          m.sender.split("@")[0]
        }`,
        mentions: [m.sender],
      },
      { quoted: m }
    );
  }
  if (/4/.test(text)) {
    m.reply(
      "Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat."
    );
    conn.sendMessage(
      ownerNomer + "@s.whatsapp.net",
      {
        text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp25.000\n*RAM:* 4GB\n*CPU:* 100%\n*DARI:* @${
          m.sender.split("@")[0]
        }`,
        mentions: [m.sender],
      },
      { quoted: m }
    );
  }
  if (/5/.test(text)) {
    m.reply(
      "Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat."
    );
    conn.sendMessage(
      ownerNomer + "@s.whatsapp.net",
      {
        text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp30.000\n*RAM:* 5GB\n*CPU:* 130%\n*DARI:* @${
          m.sender.split("@")[0]
        }`,
        mentions: [m.sender],
      },
      { quoted: m }
    );
  }
  if (/6/.test(text)) {
    m.reply(
      "Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat."
    );
    conn.sendMessage(
      ownerNomer + "@s.whatsapp.net",
      {
        text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp35.000\n*RAM:* 6GB\n*CPU:* 150%\n*DARI:* @${
          m.sender.split("@")[0]
        }`,
        mentions: [m.sender],
      },
      { quoted: m }
    );
  }
  if (/7/.test(text)) {
    m.reply(
      "Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat."
    );
    conn.sendMessage(
      ownerNomer + "@s.whatsapp.net",
      {
        text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp40.000\n*RAM:* 7GB\n*CPU:* 175%\n*DARI:* @${
          m.sender.split("@")[0]
        }`,
        mentions: [m.sender],
      },
      { quoted: m }
    );
  }
  if (/8/.test(text)) {
    m.reply(
      "Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat."
    );
    conn.sendMessage(
      ownerNomer + "@s.whatsapp.net",
      {
        text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp45.000\n*RAM:* 8GB\n*CPU:* 200%\n*DARI:* @${
          m.sender.split("@")[0]
        }`,
        mentions: [m.sender],
      },
      { quoted: m }
    );
  }
  if (/9/.test(text)) {
    m.reply(
      "Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat."
    );
    conn.sendMessage(
      ownerNomer + "@s.whatsapp.net",
      {
        text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp60.000\n*RAM:* Unlimited\n*CPU:* Unlimited\n*DARI:* @${
          m.sender.split("@")[0]
        }`,
        mentions: [m.sender],
      },
      { quoted: m }
    );
  }
};
handler.help = ["buypanel", "belipanel"];
handler.tags = ["store"];
handler.command = ["buypanel", "belipanel"];

export default handler;
