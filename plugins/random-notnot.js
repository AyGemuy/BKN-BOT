let handler = async (m, { conn }) => {
  let url = "https://zenzapis.xyz/randomasupan/notnot?apikey=cahyokun";
  let weem = "Next ? Click Di Bawah !";
  conn.sendButtonImg(
    m.chat,
    url,
    "```➩ Random : NotNot ```",
    weem,
    "⇄ Next ⇄",
    ".notnot",
    m
  );
};
handler.help = ["cecan"];
handler.tags = ["internet", "random"];
handler.command = /^(notnot)$/i;

handler.limit = 5;

export default handler;
