let handler = async (m, { conn }) => {
  let url = "https://zenzapis.xyz/randomasupan/justina?apikey=cahyokun";
  let weem = "Next ? Click Di Bawah !";
  conn.sendButtonImg(
    m.chat,
    url,
    "```➩ Random : justina ```",
    weem,
    "⇄ Next ⇄",
    ".justina",
    m
  );
};
handler.help = ["cecan"];
handler.tags = ["internet", "random"];
handler.command = /^(justina)$/i;

handler.limit = true;

export default handler;
