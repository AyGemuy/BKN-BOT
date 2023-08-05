import fs from "fs";
import fetch from "node-fetch";
import { pinterest } from "../scraper/pin.js";

let handler = async (m, { command, conn, usedPrefix }) => {
  switch (command) {
    case "akira":
    case "akiyama":
    case "anna":
    case "asuna":
    case "ayuzawa":
    case "boruto":
    case "chiho":
    case "chitoge":
    case "deidara":
    case "erza":
    case "elaina":
    case "eba":
    case "emilia":
    case "hestia":
    case "hinata":
    case "inori":
    case "isuzu":
    case "itachi":
    case "itori":
    case "kaga":
    case "kagura":
    case "kaori":
    case "keneki":
    case "kotori":
    case "kurumi":
    case "madara":
    case "mikasa":
    case "miku":
    case "minato":
    case "naruto":
    case "nezuko":
    case "sagiri":
    case "sasuke":
    case "sakura":
    case "nakanomiku":
    case "shido":
      {
        let res = await pinterest(command);
        let anime = res.getRandom();
        let cap = `乂 A N I M E - I M A G E

*Name :* ${command}

Random Anime Image`;
        conn.sendButtonImg(
          m.chat,
          anime,
          cap,
          author,
          "Next",
          `${usedPrefix + command}`,
          m
        );
      }
      break;
  }
};
handler.command = handler.help = [
  "shido",
  "nakanomiku",
  "akira",
  "akiyama",
  "anna",
  "asuna",
  "ayuzawa",
  "boruto",
  "chiho",
  "chitoge",
  "deidara",
  "erza",
  "elaina",
  "eba",
  "emilia",
  "hestia",
  "hinata",
  "inori",
  "isuzu",
  "itachi",
  "itori",
  "kaga",
  "kagura",
  "kaori",
  "keneki",
  "kotori",
  "kurumi",
  "madara",
  "mikasa",
  "miku",
  "minato",
  "naruto",
  "nezuko",
  "sagiri",
  "sasuke",
  "sakura",
];
handler.tags = ["anime"];
export default handler;
