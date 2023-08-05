import fetch from "node-fetch";
import axios from "axios";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw "Masukan Query Anime";
  try {
    let anu = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(text)}`
    );
    let res = await anu.json();
    if (isNaN(text)) {
      let array = [];
      for (var x of res.data) {
        array.push({
          title: x.title,
          rowId: usedPrefix + command + ` ${x.mal_id}`,
          description: `Status : ${x.status}\nRating : ${x.score} ( ${x.rating} )`,
        });
      }
      const sections = [
        {
          title: `Search From ${text}`,
          rows: array,
        },
      ];
      const listMessage = {
        text: `Hai, @${
          m.sender.split("@")[0]
        },\nSilahkan Pilih Anime\nYang Anda Cari Du Bawah...`,
        buttonText: "CLICK HERE",
        mentions: [m.sender],
        footer: "© Create By ArifzynXD",
        title: htki + " Anime Search " + htka,
        sections,
      };
      await conn.sendMessage(m.chat, listMessage, { quoted: fkontak });
    } else {
      let { data } = await axios.get(
        `https://api.jikan.moe/v4/anime/${text}/full`
      );
      let anu = data.data;
      let ini_txt =
        `${anu.title}\n\n` +
        `*title_en :* ${anu.title_english}\n` +
        `*title_japanese :* ${anu.title_japanese}\n` +
        `*Type :* ${anu.type}\n` +
        `*Source :* ${anu.source}\n` +
        `*Episode :* ${anu.episodes}\n` +
        `*Status :* ${anu.status}\n\n` +
        `*Duration :* ${anu.title_english}\n` +
        `*Rating :* ${anu.rating}\n` +
        `*Score :* ${anu.score}\n` +
        `*scored_by :* ${anu.scored_by}\n` +
        `*Rank :* ${anu.rank}\n` +
        `*Popularity :* ${anu.popularity}\n\n` +
        `_"${anu.synopsis}"_`;
      await conn.sendMessage(
        m.chat,
        { image: { url: anu.images.jpg.image_url }, caption: ini_txt },
        { quoted: m }
      );
    }
  } catch (e) {
    console.log(e);
    throw "Tidak ditemukan hasil.";
  }
};
handler.help = ["anime", "animesearch"];
handler.tags = ["info"];
handler.command = /^(anime|animesearch)$/i;

handler.limit = true;

export default handler;
