import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: global.openai,
});
const openai = new OpenAIApi(configuration);

export async function getChat(chatbot) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chatbot,
    });
    let txt = response.data.choices[0].message?.content.trim();
    return txt;
  } catch (e) {
    console.log(e);
    return "ErrorAPISERVERCHATGPT";
  }
}
