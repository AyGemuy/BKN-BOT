import pkg from "@sefinek/random-animals";
const { cat } = pkg;

let handler = async (m, { conn }) => {
  let res = await cat();
  conn.sendFile(m.chat, res.message, "", "", m);
};
handler.command = ["animal-cat"];

export default handler;
