let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Contoh : ${usedPrefix + command} domain@apikey@c_apikey`;
  let [lnk, apik, capi] = text.split`@`;
  m.reply(`Sukses Set Api Panel

*Domain:* ${lnk}
*Apikey:* ${apik}
*C_Apikey:* ${capi}`);
  db.data.datas.domain = lnk;
  db.data.datas.apikey = apik;
  db.data.datas.c_apikey = capi;
};
handler.help = ["setapipanel"];
handler.tags = ["panel"];
handler.command = ["setapipanel"];

handler.owner = true;

export default handler;
