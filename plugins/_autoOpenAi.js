import { getChat } from "../scraper/ai.js";

let handler = (m) => m;
handler.before = async function (m) {
  let chat = global.db.data.chats[m.chat];
  if (chat.auto_openai && !chat.isBanned) {
    db.data.chatbot = db.data.chatbot ? db.data.chatbot : {};
    if (!m.text) return;
    if (!/^.*false|disnable|(turn)?off|0/i.test(m.text)) {
      if (/(\s|^)ai(\s|$|\W)/i.test(m.text)) {
        if (!db.data.chatbot[m.sender]) {
          db.data.chatbot[m.sender] = [
            {
              role: "system",
              content: "Aku adalah OpenAI-BOT yang dibuat oleh Blueckkn!",
            },
          ];
        }
        db.data.chatbot[m.sender].push({
          role: "user",
          content: m.text,
        });
        await conn.sendMessage(m.chat, {
          react: {
            text: "⌛",
            key: m.key,
          },
        });
        let res = await getChat(db.data.chatbot[m.sender]);
        if (/ErrorAPISERVERCHATGPT/i.test(res)) {
          let r = db.data.chatbot[m.sender].slice(0, db.data.chatbot[m.sender].length - 1);
          db.data.chatbot[m.sender] = r;
          await conn.sendMessage(m.chat, {
            react: {
              text: "🔴",
              key: m.key,
            },
          });
          return await m.reply("AI Not Responding...");
        } else {
          await m.reply(res);
          db.data.chatbot[m.sender].push({
            role: "system",
            content: res,
          });
          await conn.sendMessage(m.chat, {
            react: {
              text: "💬",
              key: m.key,
            },
          });
        }
      }
    }
  }
};
export default handler;
//Code By FongsiDev