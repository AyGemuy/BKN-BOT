let handler = async (m, { conn, usedPrefix }) => {
  let id = m.chat;
  conn.vote = conn.vote ? conn.vote : {};
  if (!(id in conn.vote))
    throw `_*tidak ada voting digrup ini!*_\n\n*${usedPrefix}mulaivote* - untuk memulai vote`;

  let [reason, upvote, devote] = conn.vote[id];
  let mentionedJid = [...upvote, ...devote];
  let cap = `*「 VOTE 」*

*Alasan:* ${reason}

*UPVOTE*
_Total: ${upvote.length}_
${upvote.map((u) => "@" + u.split("@")[0]).join("\n")}

*DEVOTE*
_Total: ${devote.length}_
${devote.map((u) => "@" + u.split("@")[0]).join("\n")}

*${usedPrefix}hapusvote* - untuk menghapus vote`;
  await conn.sendButton(
    m.chat,
    cap,
    author,
    [
      ["Upvote", usedPrefix + "upvote"],
      ["Devote", usedPrefix + "devote"],
    ],
    fkontak,
    { mentions: conn.parseMention(cap) }
  );
};
handler.help = ["cekvote"];
handler.tags = ["vote"];
handler.command = /^cekvote$/i;
handler.group = true;
export default handler;
