let handler = async (m, { conn }) => {
  let url = "https://zenzapis.xyz/randomasupan/rosw?apikey=cahyokun";
  let weem = "Next ? Click Di Bawah !";
  conn.sendButtonImg(
    m.chat,
    url,
    "```➩ Random : Rose ```",
    weem,
    "⇄ Next ⇄",
    ".rose",
    m
  );
};
handler.help = ["cecan"];
handler.tags = ["internet", "random"];
handler.command = /^(rose)$/i;

handler.limit = 5;

export default handler;
