import fetch from "node-fetch";

let handler = async (m, { conn, command, usedPrefix }) => {
  let url = await fetch(
    `https://api-arifzyn-dev.frteamapp.me/api/wallpaper/nsfwloli?apikey=ArifzynDev`
  );
  let res = await url.json();
  let cap = `_${sym} Random Picture_ :> ${command}`;
  conn.sendButtonImg(
    m.chat,
    res.url,
    cap,
    sym2 + " Charater Name : " + res.nama,
    "Next",
    usedPrefix + "husbu",
    m
  );
};
handler.command = /^(WaifuTest)$/i;
handler.tags = ["anime"];
handler.help = ["waifucahyo"];
handler.limit = true;
export default handler;
