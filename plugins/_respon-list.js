/*import {
  isAlreadyResponList,
  getDataResponList,
} from "../ArifzynXD/respon-list.js";

export async function before(m, { conn, isGroup }) {
  let msg = m;
  let type = m.type;
  let chats =
    type === "conversation" && msg.message.conversation
      ? msg.message.conversation
      : type === "imageMessage" && msg.message.imageMessage.caption
      ? msg.message.imageMessage.caption
      : type === "videoMessage" && msg.message.videoMessage.caption
      ? msg.message.videoMessage.caption
      : type === "extendedTextMessage" && msg.message.extendedTextMessage.text
      ? msg.message.extendedTextMessage.text
      : type === "buttonsResponseMessage" &&
        quotedMsg.fromMe &&
        msg.message.buttonsResponseMessage.selectedButtonId
      ? msg.message.buttonsResponseMessage.selectedButtonId
      : type === "templateButtonReplyMessage" &&
        quotedMsg.fromMe &&
        msg.message.templateButtonReplyMessage.selectedId
      ? msg.message.templateButtonReplyMessage.selectedId
      : type === "messageContextInfo"
      ? msg.message.buttonsResponseMessage?.selectedButtonId ||
        msg.message.listResponseMessage?.singleSelectReply.selectedRowId
      : type == "listResponseMessage" &&
        quotedMsg.fromMe &&
        msg.message.listResponseMessage.singleSelectReply.selectedRowId
      ? msg.message.listResponseMessage.singleSelectReply.selectedRowId
      : "";
  let db_respon_list = db.data.datas.store;
  if (isGroup && isAlreadyResponList(m.chat, chats, db_respon_list)) {
    var get_data_respon = getDataResponList(m.chat, chats, db_respon_list);
    if (get_data_respon.isImage === false) {
      conn.sendMessage(
        m.chat,
        { text: sendResponList(m.chat, chats, db_respon_list) },
        { quoted: m }
      );
    } else {
      conn.sendMessage(
        m.chat,
        {
          image: { url: get_data_respon.image_url },
          caption: get_data_respon.response,
        },
        { quoted: m }
      );
    }
  }
}
*/
