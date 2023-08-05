let handler = async (m, { conn, text, command }) => {
  if (!text)
    throw `Contoh : .${command} list,key,tile,detail\nContoh : .${command} 1,100,sewa,10K`;
  let data = global.db.data.datas;
  let [lis, key, tile, dei] = text.split`,`;
  if (!lis) throw "Masukan Angka List";
  if (!key) throw "Masukan Key List";
  if (!tile) throw "Masukan Title";
  if (!dei) throw "Masukan Detai";
  conn.sendMessage(m.chat, { text: "Sukses Update List Store" }, { quoted: m });
  data.store[lis] = {
    key: key,
    title: tile,
    detail: dei,
  };
};
handler.help = ["updatelist"];
handler.tags = ["store"];
handler.command = /^(updatelist|listupdate)$/i;

handler.admin = true;

export default handler;
