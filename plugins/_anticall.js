const { WAMessageStubType } = (await import("@adiwajshing/baileys")).default;
import { sleep } from "../lib/sleep.js";

export async function all(
  m,
  { conn, text, usedPrefix, command, participants }
) {
  if (m.fromMe && m.isBaileys) return !0;
  let text;
  let vcard =
    "BEGIN:VCARD\n" +
    "VERSION:3.0\n" +
    "N:;Arifzyn;;;" +
    "FN:Arifzyn\n" +
    "ORG:ArifzynXD;\n" +
    "item1.TEL;type=CELL;type=VOICE;waid=6289503433262:+62 895-3471-98105\n" +
    "item1.X-ABLabel:Creator Bot WhatsApp\n" +
    "item2.EMAIL;type=INTERNET:arifzyn906@gmail.com\n" +
    "item2.X-ABLabel:Email\n" +
    "item3.URL:https://instagram.com/ArifzynXD19\n" +
    "item3.X-ABLabel:Instagram\n" +
    "item4.ADR:;;Indonesia;;;;\n" +
    "item4.X-ABLabel:Region\n" +
    "END:VCARD";
  if (
    m.messageStubType ===
    (WAMessageStubType.CALL_MISSED_VOICE || WAMessageStubType.CALL_MISSED_VIDEO)
  ) {
    conn.ev.on("call", (m) => {
      const _call = m[0];
      if (_call.status == "offer") {
        conn.rejectCall(_call.id);
      }
    });
    let cap =
      "Terdeteksi Telepon Bot\n\nKamu Di banned + block + warn + oleh bot karena telah melanggar aturan bot\n\n*📮Dilarang menelepon Bot!*\nSilahkan Lapor Ke Owner Jika Ini Di Buka Ban.";
    await conn.sendButton(m.chat, cap, author, [["OWNER", ".owner"]], null);
    await conn.sendMessage(
      m.chat,
      { contacts: { displayName: "ArifzynXD", contacts: [{ vcard }] } },
      { quoted: m }
    );
    await sleep(500);
    global.db.data.users[ban].banned = true;
    await conn.updateBlockStatus(m.chat, "block");
  }
}
