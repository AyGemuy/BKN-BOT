let handler = async (m, { conn }) => {
  const prem = `➠ Pembayaran saat ini hanya tersedia via dana, dan sopipay.

➠ Proses transaksi seperti pada umumnya, chat owner terlebih dahulu untuk menanyakan nomor tujuan transfer setelah itu screenshot bukti pembayaran.

➠ *Penting!* Simpan nomor owner dan gabung kedalam grup official : (https://chat.whatsapp.com/FHb4wFx25lNDVID5TMrhMW), untuk mengetahui update nomor bot terbaru apabila ter-banned oleh pihak whatsapp.`;

  const sections = [
    {
      title: `✃ Daftar List`,
      rows: [
        {
          title: "∫ Premium & Sewa«",
          rowId: ".sewa",
          description: "[ Mulai Dari 5.000 - 30.000 An Saja]",
        },
        {
          title: "∫ Owner «",
          rowId: ".owner",
          description: "[ Kontak Owner  ,Chat Aja Dia Pengangguran Kok:v ]",
        },
        {
          title: "∫ .........«",
          rowId: "Aku pedo Ya Gaes Yak",
          description: "[ Aku Pedo Ya Gaes Ya ]",
        },
      ],
    },
  ];

  const listMessage = {
    text: prem,
    footer: author,
    title: null,
    buttonText: "Tap! ☁︎",
    sections,
  };
  await conn.sendMessage(m.chat, listMessage, { quoted: m });
};
handler.help = ["premium"];
handler.tags = ["info"];
handler.command = ["premium"];

export default handler;
