/*import fs from "fs";
import fetch from "node-fetch";
import uploadImage from "../lib/uploadImage.js";
import {
  addResponList,
  delResponList,
  isAlreadyResponList,
  isAlreadyResponListGroup,
  sendResponList,
  updateResponList,
  getDataResponList,
} from "../ArifzynXD/respon-list.js";

let db_respon_list = db.data.datas.store;

let handler = async (m, { conn, usedPrefix, command, text }) => {
  switch (command) {
    case "additem":
      var args1 = text.split("@")[0];
      var args2 = text.split("@")[1];
      if (!text.includes("@"))
        return m.reply(
          `Gunakan dengan cara ${
            usedPrefix + command
          } *key@response*\n\n_Contoh_\n\n${usedPrefix + command} tes@apa`
        );
      addResponList(m.chat, args1, args2, false, "-", db_respon_list);
      m.reply(`Berhasil menambah List menu : *${args1}*`);
      break;
    case "cekitem":
      {
        let groupName = await conn.getName(m.chat);
        text = text.split("||");
        if (db_respon_list.length === 0)
          return m.reply(`Belum ada list message di database`);
        if (!isAlreadyResponListGroup(m.chat, db_respon_list))
          return m.reply(`Belum ada list message yang terdaftar di group ini`);
        if (!text[1]) {
          var arr_rows = [],
            j = 0;
          for (let x of db_respon_list) {
            if (x.id === m.chat) {
              arr_rows.push({
                title: x.key,
                rowId: usedPrefix + command + ` ||${j}`,
              });
            }
          }
          var listMsg = {
            text: `Hi @${m.sender.split("@")[0]}`,
            buttonText: "Click Here!",
            footer: `*_itemList ${groupName}_*`,
            mentions: [m.sender],
            sections: [
              {
                title: groupName,
                rows: arr_rows,
              },
            ],
          };
          conn.sendMessage(m.chat, listMsg, { quoted: m });
        } else {
          conn.sendMessage(
            m.chat,
            { text: db_respon_list.respon },
            { quoted: m }
          );
        }
      }
      break;
  }
};
handler.command = ["additem", "cekitem"];

handler.group = true;
*/
export default null;
