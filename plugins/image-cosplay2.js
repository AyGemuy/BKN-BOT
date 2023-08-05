let handler = async (m, { conn }) => {
  let url = "https://zenzapis.xyz/randomimage/cosplay?apikey=cahyokun";
  let weem = "Next ? Click Di Bawah !";
  conn.sendButtonImg(
    m.chat,
    url,
    "```➩ Random : Cosplay ```",
    weem,
    "⇄ Next ⇄",
    ".cosplay2",
    m
  );
};
handler.help = ["cosplay"];
handler.tags = ["anime"];
handler.command = /^(cosplay2)$/i;

handler.limit = true;

export default handler;
