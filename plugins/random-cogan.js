let handler = async (m, { conn }) => {
  let url = "https://api.lolhuman.xyz/api/random/cogan?apikey=cahyokun";
  let weem = "Next ? Click Di Bawah !";
  conn.sendButtonImg(
    m.chat,
    url,
    "```➩ Random : Cogan ```",
    weem,
    "⇄ Next ⇄",
    ".cecan",
    m
  );
};
handler.help = ["cogan"];
handler.tags = ["internet", "random"];
handler.command = /^(cogan)$/i;

export default handler;
