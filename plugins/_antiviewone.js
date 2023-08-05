let { downloadContentFromMessage } = await import("@adiwajshing/baileys");
import fetch from "node-fetch";

export async function before(m, { isAdmin, isBotAdmin }) {
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
      ? conn.user.jid
      : m.sender;
  let pp = await conn.profilePictureUrl(who).catch((_) => hwaifu.getRandom());
  let name = await conn.getName(who);

  let chat = global.db.data.chats[m.chat];
  if (/^[.~#/\$,](read)?viewonce/.test(m.text)) return;
  if (!chat.viewonce || chat.isBanned) return;
  if (m.mtype == "viewOnceMessage") {
    let msg = m.message.viewOnceMessage.message;
    let type = Object.keys(msg)[0];
    let media = await downloadContentFromMessage(
      msg[type],
      type == "imageMessage" ? "image" : "video"
    );
    let buffer = Buffer.from([]);
    for await (const chunk of media) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    if (/video/.test(type)) {
      return this.sendFile(m.chat, buffer, ucapan, msg[type].caption || "", m);
    } else if (/image/.test(type)) {
      return this.sendFile(m.chat, buffer, ucapan, msg[type].caption || "", m);
    }
  }
}
