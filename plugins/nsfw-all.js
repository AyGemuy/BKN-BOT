import fetch from "node-fetch";
import axios from "axios";

let handler = async (m, { conn, usedPrefix, command }) => {
  if (db.data.users[m.sender].premiumTime < 1)
    return m.reply("FITUR INI KHUSUS PREMIUM USER");
  switch (command) {
    case "ahegao":
    case "ass":
    case "bad":
    case "bdsm":
    case "blowjob":
    case "cuckold":
    case "cum":
    case "eba":
    case "ero":
    case "femdom":
    case "foot":
    case "gangbang":
    case "gifs":
    case "glasses":
    case "hentai":
    case "neko":
    case "neko2":
    case "nsfwloli":
    case "orgy":
    case "panties":
    case "pussy":
    case "yuri":
    case "zettai":
    case "masturbation":
    case "thighs":
      {
        let { data } = await axios.get(
          "https://raw.githubusercontent.com/ArifzynXD/database/master/nsfw/" +
            command +
            ".json"
        );
        let { url } = data.getRandom();
        let txt = "❏  *N S F W - R A N D O M*\n\nTch, Nieh " + command;
        await conn.sendButton(
          m.chat,
          txt,
          author,
          url,
          [["Next", "." + command]],
          m
        );
      }
      break;
  }
};
handler.help = handler.command = [
  "ahegao",
  "ass",
  "bad",
  "bdsm",
  "blowjob",
  "cuckold",
  "cum",
  "eba",
  "ero",
  "femdom",
  "foot",
  "gangbang",
  "gifs",
  "glasses",
  "hentai",
  "neko",
  "neko2",
  "nsfwloli",
  "orgy",
  "panties",
  "pussy",
  "yuri",
  "zettai",
  "masturbation",
  "thighs",
];
handler.tags = ["nsfw", "premium"];

handler.premium = true;

export default handler;
