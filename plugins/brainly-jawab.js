let handler = async (m, { text }) => {
  if (!text) throw "Masukan Text";
  m.reply(text);
};
handler.command = ["bran"];

export default handler;
