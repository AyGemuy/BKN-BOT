let handler = async (m, { conn }) => {
  let url = "https://zenzapis.xyz/randomasupan/thailand?apikey=cahyokun";
  let weem = "Next ? Click Di Bawah !";
  conn.sendButtonImg(
    m.chat,
    url,
    "```➩ Random : Thailand ```",
    weem,
    "⇄ Next ⇄",
    ".thailand",
    m
  );
};
handler.help = ["cecan"];
handler.tags = ["internet", "random"];
handler.command = /^(thailand)$/i;

handler.limit = 5;

export default handler;
