import { translate } from "@vitalets/google-translate-api";

let handler = async (m, { args, usedPrefix, command }) => {
  let lang = args ? args[0] : "id";
  if (!lang) throw "Lang nya mana?";
  let text = m.quoted
    ? m.quoted.text
    : args
    ? lang.length
      ? args.slice(1).join(" ")
      : args.join(" ")
    : null;
  if (!text) throw "Text nya mana?";
  let res = await translate(text, { to: lang, autoCorrect: true }).catch(
    (_) => null
  );
  if (!res) throw `Error: The language "${lang}" is not supported`;
  m.reply(`*Dari:* ${res?.raw.src}\n*Ke:* ${lang}\n\n${res?.text}`.trim());
};
handler.help = ["translate"];
handler.tags = ["tools"];
handler.command = /^(tr(anslate)?)$/i;

export default handler;
//FG - JB Made By 𝙁𝘾 么 Glitch Editz#0433
