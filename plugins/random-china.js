let handler = async (m, { conn }) => {
  let url = "https://zenzapis.xyz/randomasupan/china?apikey=cahyokun";
  let weem = "Next ? Click Di Bawah !";
  conn.sendButtonImg(
    m.chat,
    url,
    "```➩ Random : china ```",
    weem,
    "⇄ Next ⇄",
    ".china",
    m
  );
};
handler.help = ["cecan"];
handler.tags = ["internet", "random"];
handler.command = /^(china)$/i;

handler.limit = true;

export default handler;
