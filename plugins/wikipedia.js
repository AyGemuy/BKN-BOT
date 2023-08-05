import { wikiSearch } from "../scraper/wiki.js";
import { sendArif } from "../lib/sendArif.js";
import fetch from "node-fetch";

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Contoh penggunaan ${usedPrefix}${command} game`;
  let res = await wikiSearch(text);
  let thumbb = await (
    await fetch("https://telegra.ph/file/f69118bc4be53e16e60f2.jpg")
  ).buffer();
  return sendArif(m.chat, {
    text: res[0].wiki,
    mentions: [m.sender],
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        showAdAttribution: true,
        renderLargerThumbnail: true,
        title: "Wikipedia Search",
        containsAutoReply: true,
        mediaType: 1,
        thumbnail: "https://telegra.ph/file/991af10492aaa4e8248dc.jpg",
        mediaUrl: "https://id.m.wikipedia.org",
        sourceUrl: "https://id.m.wikipedia.org",
      },
    },
  });
};
handler.help = ["wikipedia"].map((v) => v + " <apa>");
handler.tags = ["internet"];
handler.command = /^(wiki|wikipedia)$/i;

export default handler;
