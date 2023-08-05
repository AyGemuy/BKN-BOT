let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
      ? conn.user.jid
      : m.sender;
  let name = m.name;
  //------------ BIO
  let ppown = await conn
    .profilePictureUrl(nomorown + "@s.whatsapp.net", "image")
    .catch((_) => hwaifu[1]);
  let teksbio = `${htki} *BIODATA* ${htka}
${htjava} *💌 Nama* : BLUECKKN
${htjava} *✉️ Nama RL* : HAMBA ALLAH
${htjava} *♂️ Gender* : Girls
${htjava} *🕋 Agama* : Islam
${htjava} *⏰ Tanggal lahir* : Private 🥶
${htjava} *🎨 Umur* : ${getAge(global.ageowner)}
${htjava} *🧮 Kelas* : Private 💀
${htjava} *🧩 Hobby* : Gamer, Main Stumble Guys, dll
${htjava} *💬 Sifat* : ASIK DAH KALAU DAH KENAL :D
${htjava} *🗺️ Tinggal* : Malaysia, Ampang
${htjava} *❤️ Waifu* : Semua

${htjava} *📷 ɪɴsᴛᴀɢʀᴀᴍ* : ${sig}
${htjava} *❤️ уσυтυвє:* ${syt}
•·––––––––––––––––––––––––––·•
`;
  let teksnomor = `${htki} *OWNER* ${htka}
✦ @${nomorown.split`@`[0]} ✦
------- ${nameown} -------

📮 *Note:*
• Owner tidak menerima save contact
• Owner berhak blockir tanpa alasan
• Berbicaralah yang sopan & tidak spam
• Owner Hanya merespon yang berkaitan dengan BOT
• No Telp`;
  let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp;Saya Owner WHMODS;Bot;;Md\nFN:${nameown}\nNICKNAME:👑 Owner Bot\n🚫 Don't call me 🥺\nTITLE:MODS\nitem1.TEL;waid=${nomorown}:+62 895-0343-3262\nitem1.X-ABLabel:📞 Nomor Owner\nitem2.URL:${global.syt}\nitem2.X-ABLabel:💬 More\nitem3.EMAIL;type=INTERNET:blcnayu@gmail.com\nitem3.X-ABLabel:💌 Mail Owner BOT\nitem4.ADR:;;🇲🇾 Malaysia;;;;\nitem4.X-ABADR:💬 More\nitem4.X-ABLabel:📍 Lokasi Saya\nBDAY;value=date:2021-5-4\nEND:VCARD`;
  let caption = `👋 Hai *${name} @${who.split("@")[0]}*, Nih Owner *${
    conn.user.name
  }* kak`;
  let Bio = await conn.sendButton(
    m.chat,
    teksbio,
    wm,
    ppown,
    [
      ["Sewa Bot", `${usedPrefix}sewa`],
      ["Menu", `${usedPrefix}menu`],
    ],
    m
  );
  let TextOwn = await conn.reply(m.chat, teksnomor, m);
  let ContOwn = await conn.sendMessage(
    m.chat,
    { contacts: { displayName: wm, contacts: [{ vcard }] } },
    { quoted: TextOwn }
  );
  await conn.reply(m.chat, caption, ContOwn);
};
handler.help = ["owner", "creator"];
handler.tags = ["info"];

handler.command = /^(owner|pengembang|creator)$/i;

export default handler;
