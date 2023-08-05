import { quote } from "../scraper/quote.js";

let handler = async (m, { conn, text }) => {
  try {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text;
    if (!teks) throw "Masukan Text";
    if (db.data.users[m.sender].premiumTime < 1)
      return m.reply("FITUR INI KHUSUS PREMIUM USER");
    let name = await conn.getName(m.sender);
    let avatar = await conn
      .profilePictureUrl(m.sender, "image")
      .catch((_) => "https://telegra.ph/file/a4ec75f6ce8b2b565a3e3.png");
    let { result } = await quote(teks, name, avatar);
    await m.reply("*_Tunggu Sebentar o(〃＾▽＾〃)o_*");
    conn.sendFile(m.chat, result, "sticker.webp", "", m);
  } catch (e) {
    console.log(e);
    m.reply("Terjadi Kesalahan Saat Convert.");
  }
};
handler.command = ["qc"];

export default handler;
