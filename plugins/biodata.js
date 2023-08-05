let handler = async (m, { conn, usedPrefix }) => {
  let caption = `
⫹⫺ *💌 Nama* : 𝑨𝒓𝒊𝒇
⫹⫺ *✉️ Nama RL* : 𝑨𝒓𝒊𝒇𝒛𝒚𝒏
⫹⫺ *♂️ Gender* : Boys
⫹⫺ *🕉 Agama* : 𝑰𝒔𝒍𝒂𝒎
⫹⫺ *⏰ Tanggal lahir* : Private 
⫹⫺ *🎨 Umur* : 17
⫹⫺ *🧮 Kelas* : 11
⫹⫺ *🧩 Hobby* : 𝑵𝒐𝒏𝒕𝒐𝒏 𝑩𝒐𝒌𝒆𝒑
⫹⫺ *💬 Sifat* : 𝐒𝗼𝐊𝐮𝐥𝐥🥶
⫹⫺ *🗺️ Tinggal* : 𝑰𝒏𝒅𝒐, 𝑱𝒂𝒘𝒂 𝑩𝒂𝒓𝒂𝒕, 𝑩𝒐𝒈𝒐𝒓

•·––––––––––––––––––––––––––·•
`;
  const sections = [
    {
      title: "List Other",
      rows: [
        {
          title: "Nomor Arifzyn",
          rowId: ".owner",
          description: "Info Nomor Owner Saya",
        },
        {
          title: "Back To Menu",
          rowId: ".menu",
          description: "Balik Ke Menu Utama",
        },
      ],
    },
    {
      title: "My Social Medi",
      rows: [
        { title: " YouTube ", rowId: ".", description: " " },
        { title: " Instagram ", rowId: ".", description: " " },
        { title: " TikTok ", rowId: ".", description: " " },
        { title: " WhatsApp ", rowId: ".", description: " " },
        { title: " Telegram ", rowId: ".", description: " " },
        { title: " Facebook ", rowId: ".", description: " " },
        { title: " Twitter ", rowId: ".", description: " " },
      ],
    },
    {
      title: "My Website",
      rows: [
        { title: " Website Store ", rowId: ".", description: " " },
        { title: " Website Rest Api ", rowId: ".", description: " " },
      ],
    },
  ];
  const listMessage = {
    text: caption,
    footer: "Biodata - Arifzyn",
    mentions: [m.sender],
    title: "––––––『 *BIODATA* 』––––––",
    buttonText: "Click Here",
    sections,
  };
  await conn.sendMessage(m.chat, listMessage, { quoted: m });
};
handler.help = ["biodata"];
handler.tags = ["info"];
handler.command = /^(biodata|arif|bioowner)$/i;

export default handler;
