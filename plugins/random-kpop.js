let handler = async (m, { conn }) => {
  let url = "https://zenzapis.xyz/randomasupan/kpop?apikey=cahyokun";
  let weem = "Next ? Click Di Bawah !";
  conn.sendButtonImg(
    m.chat,
    url,
    "```➩ Random : kpop ```",
    weem,
    "⇄ Next ⇄",
    ".kpop",
    m
  );
};
handler.help = ["cecan"];
handler.tags = ["internet", "random"];
handler.command = /^(kpop)$/i;

handler.limit = true;

export default handler;
