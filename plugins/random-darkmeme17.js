let handler = async (m, { conn }) => {
  let url = "https://zenzapis.xyz/randomimage/darkjoke?apikey=cahyokun";
  let weem = "Next ? Click Di Bawah !";
  conn.sendButtonImg(
    m.chat,
    url,
    "```➩ Random : Dark Meme ```",
    weem,
    "⇄ Next ⇄",
    ".darkmeme",
    m
  );
};
handler.help = ["darkmeme"];
handler.tags = ["internet", "random"];
handler.command = /^(darkmeme)$/i;

export default handler;
