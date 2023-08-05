import { Configuration, OpenAIApi } from "openai";
let handler = async (m, { conn, text }) => {
  if (!text) throw "[!] Masukkan teks.";
  let configuration = new Configuration({
    apiKey: "org-JdI9LMccweiz0xTLkI188ZjK",
  });
  let openai = new OpenAIApi(configuration);
  let response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    temperature: 0,
    max_tokens: 3000,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });
  m.reply(response.data.choices[0].text);
};
handler.help = ["ai", "openai"];
handler.tags = ["info", "fun"];
handler.command = /^(ai2|openai2)$/i;
export default handler;
