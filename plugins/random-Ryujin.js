let handler = async (m, { conn }) => {
  let url = "https://zenzapis.xyz/randomasupan/ryujin?apikey=cahyokun";
  let weem = "Next ? Click Di Bawah !";
  conn.sendButtonImg(
    m.chat,
    url,
    "```➩ Random : Ryujin ```",
    weem,
    "⇄ Next ⇄",
    ".ryujin",
    m
  );
};
handler.help = ["cecan"];
handler.tags = ["internet", "random"];
handler.command = /^(ryujin)$/i;

handler.limit = 5;

export default handler;
