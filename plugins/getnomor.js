import PhoneNumber from "awesome-phonenumber";

let handler = async (m, { conn, text }) => {
  let who = text
    ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
    : !m.isGroup
    ? m.chat
    : m.quoted
    ? m.quoted.sender
    : m.mentionedJid
    ? m.mentionedJid[0]
    : "";
  if (!who) throw "Reply Pesannya Atau Tag Orangnya";
  let res = await PhoneNumber(`+${who.split`@`[0]}`);
  const { input, international, national, significant } = res.g.number;
  let id = `${who.split`@`[0]}@s.whatsapp.net`;
  let tag = `@${who.split`@`[0]}`;
  let caption = `*Nomor ID :* ${who}
*Nomor Tag :* ${tag}
*Input :* ${input}
*Nomor :* ${who.split`@`[0]}
*International :* ${international}
*National :* ${national} 
*Significant :* ${significant}`;
  conn.reply(m.chat, caption, fkontak, { mentions: [who] });
};
handler.help = ["getnomor"];
handler.tags = ["tools"];
handler.command = ["getnomor"];

export default handler;
