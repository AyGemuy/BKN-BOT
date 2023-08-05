import { Configuration, OpenAIApi } from "openai";
const openAiApiKey = "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";

let handler = async (m, { conn, command, text: q, usedPrefix }) => {
  if (db.data.users[m.sender].premiumTime < 1)
    return m.reply("KHUSUS PREMIUM USER");
  switch (command) {
    case "ai":
      {
        if (!q)
          return m.reply(
            `Yaa? Ada yang bisa saya bantu?\nContoh :\n${
              usedPrefix + command
            } apa itu bot wa`
          );
        try {
          const configuration = new Configuration({
            apiKey: openAiApiKey,
          });
          const openai = new OpenAIApi(configuration);
          const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: q }],
          });
          m.reply(response.data.choices[0].message.content);
        } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            m.reply("Maaf, sepertinya ada yang error :" + error.message);
          }
        }
      }
      break;
    case "ai-img":
      {
        if (!q)
          return reply(
            `Membuat gambar dari AI.\n\nContoh :\n${
              usedPrefix + command
            } rumah mewah`
          );
        try {
          const configuration = new Configuration({
            apiKey: openAiApiKey,
          });
          const openai = new OpenAIApi(configuration);
          const response = await openai.createImage({
            prompt: q,
            n: 1,
            size: "512x512",
          });
          conn.sendFile(m.chat, response.data.data[0].url, "me.jpg", q, m);
        } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            m.reply("Maaf, sepertinya ada yang error :" + error.message);
          }
        }
      }
      break;
  }
};
handler.command = ["ai", "ai-img"];

export default handler;
