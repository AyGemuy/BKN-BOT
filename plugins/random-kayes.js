let handler = async (m, { conn }) => {
  let url = "https://zenzapis.xyz/randomasupan/kayes?apikey=cahyokun";
  let weem = "Next ? Click Di Bawah !";
  conn.sendButtonImg(
    m.chat,
    url,
    "```➩ Random : kayes ```",
    weem,
    "⇄ Next ⇄",
    ".kayes",
    m
  );
};
handler.help = ["cecan"];
handler.tags = ["internet", "random"];
handler.command = /^(kayes)$/i;

handler.limit = true;

export default handler;
