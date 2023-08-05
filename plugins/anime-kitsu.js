import fetch from "node-fetch";

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!text)
    throw `[!] Input Query\n\n*Example :* ${
      usedPrefix + command
    } Gotoubun no Hanayome`;
  try {
    if (text.includes("https://kitsu.io")) {
      let res = await fetch(`${text}`);
      let anu = await res.json();
      anu = anu.data.attributes;
      let res2 = await fetch(`${text}/streaming-links`);
      let anu2 = await res2.json();
      anu2 = anu2.data;
      let txt = `*${anu.slug}*\n\n`;
      txt += `*Status :* ${anu.status}\n`;
      txt += `*Age Rate :* ${anu.ageRating} ( ${anu.ageRatingGuide} )\n`;
      txt += `*Rating : ${anu.averageRating}*\n\n`;
      if (anu2.length == 0) {
        txt += `*No Stream Available**\n`;
      } else {
        txt += `*Stream Available :*`;
        for (let x of anu2) {
          txt += `\n_${x.attributes.url}_\n`;
        }
      }
      txt += `\n*Synopsis :*\n"${anu.synopsis}"`;
      await conn.sendMessage(
        m.chat,
        { image: { url: anu.posterImage.medium }, caption: txt },
        { quoted: m }
      );
    } else {
      let response = await fetch(
        `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(
          text
        )}`
      );
      let anu = await response.json();
      let array = [];
      anu.data.forEach(function (i) {
        array.push({
          title: `🎯 ${i.attributes.titles.en_jp}`,
          rowId: usedPrefix + command + ` ${i.links.self}`,
          description: `${
            i.attributes.synopsis.length > 60
              ? i.attributes.synopsis.slice(0, 60) + "..."
              : i.attributes.synopsis
          }`,
        });
      });
      const sections = [
        {
          title: `━ ━ ━ ━ 『 Anime STREAM Links 』 ━ ━ ━ ━`,
          rows: array,
        },
      ];
      const listMessage = {
        text: `*Request From :* @${m.sender.split`@`[0]}\n\n*Result :* ${text}`,
        mentions: [m.sender],
        footer: author,
        title: `━ ━ 『 *Anime Stream* 』 ━ ━`,
        buttonText: `Search Results`,
        sections,
      };
      await conn.sendMessage(m.chat, listMessage, { quoted: m });
    }
  } catch (e) {
    console.log(e);
    m.reply(`[!] Tidak ditemukan hasil.`);
  }
};

handler.menuanime = ["kitsu <judul_anime>"];
handler.tagsanime = ["search"];
handler.command = /^((kitsu|apiary)(stream)?(web|search)?)$/i;

handler.premium = true;
handler.limit = true;

export default handler;
