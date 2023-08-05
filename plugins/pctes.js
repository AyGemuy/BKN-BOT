let handler = async (m, { conn, isPrems }) => {
  if (!isPrems)
    return conn.sendButton(
      m.chat,
      "Khusus Premium",
      botdate,
      [
        ["ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ", ".premium"],
        ["ᴏᴡɴᴇʀ", ".owner nomor"],
      ],
      m
    );
  conn.reply(m.chat, wm, m);
};
handler.command = ["pctes"];

export default handler;
