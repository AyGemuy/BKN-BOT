import moment from "moment-timezone";

let handler = async (m, { conn, command }) => {
  if (command == "wib") {
    let wib = moment.tz("Asia/Jakarta").format("HH:mm:ss");
    m.reply(wib);
  }
  if (command == "wibh") {
    let wibh = moment.tz("Asia/Jakarta").format("HH");
    m.reply(wibh);
  }
  if (command == "wibm") {
    let wibm = moment.tz("Asia/Jakarta").format("mm");
    m.reply(wibm);
  }
  if (command == "wibs") {
    let wibs = moment.tz("Asia/Jakarta").format("ss");
    m.reply(wibs);
  }
  if (command == "wit") {
    let wit = moment.tz("Asia/Jayapura").format("HH:mm:ss");
    m.reply(wit);
  }
  if (command == "wita") {
    let wita = moment.tz("Asia/Makassar").format("HH:mm:ss");
    m.reply(wita);
  }
};
handler.help = handler.command = ["wib", "wibh", "wibm", "wibs", "wit", "wita"];
handler.tags = ["waktu"];

export default handler;
