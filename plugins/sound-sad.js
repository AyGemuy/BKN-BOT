import fetch from "node-fetch";

let handler = async (m, { conn, command }) => {
  switch (command) {
    case "sad1":
    case "sad2":
    case "sad3":
    case "sad4":
    case "sad5":
    case "sad6":
    case "sad7":
    case "sad8":
    case "sad9":
    case "sad10":
    case "sad11":
    case "sad12":
    case "sad13":
    case "sad14":
    case "sad15":
    case "sad16":
    case "sad17":
    case "sad18":
    case "sad19":
    case "sad20":
    case "sad21":
    case "sad22":
    case "sad23":
    case "sad24":
    case "sad25":
    case "sad26":
    case "sad27":
    case "sad28":
    case "sad29":
    case "sad30":
    case "sad31":
    case "sad32":
    case "sad33":
    case "sad34":
    case "sad35":
      {
        let res = await (
          await fetch(
            `https://raw.githubusercontent.com/ArifzynXD/data-arifzynapi/master/sound/${command}.mp3`
          )
        ).buffer();
        await conn.sendMessage(
          m.chat,
          { audio: res, mimetype: "audio/mp4", ptt: true },
          { quoted: m }
        );
      }
      break;
  }
};
handler.help = handler.command = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
].map((v) => "sad" + v);
handler.tags = ["sound"];

handler.limit = true;

export default handler;
