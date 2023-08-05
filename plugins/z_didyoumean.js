import didyoumean from "didyoumean";
import similarity from "similarity";
export async function before(m, { match, usedPrefix, command }) {
  let pp = `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=inferno-logo&doScale=false&scaleWidth=400&scaleHeight=400&fontsize=50&fillTextType=0&backgroundColor=black&text=Apakah Benar?`;
  if (!m.isCommand && (usedPrefix = (match[0] || "")[0])) {
    let noPrefix = m.text.replace(usedPrefix, "");
    let args = noPrefix.trim().split` `.slice(1);
    let text = args.join` `;
    let help = Object.values(plugins)
      .filter((v) => v.help && !v.disabled)
      .map((v) => v.help)
      .flat(1);
    if (help.includes(noPrefix)) return;
    let mean = didyoumean(noPrefix, help);
    let sim = similarity(noPrefix, mean);
    let som = sim * 100;
    let who =
      m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.fromMe
        ? conn.user.jid
        : m.sender;
    let name = await conn.getName(who);
    let caption = `👋 Hallo @${who.split("@")[0]},\n\nApakah Kamu mencari *${
      usedPrefix + mean
    }* ?\n\nHasil Kemiripan ➲ *${parseInt(som)}%*\n\nBot by ${nameown}`;
    if (mean)
      this.sendFile(m.chat, pp, null, caption, m, false, {
        mentions: this.parseMention(caption),
      });
  }
}
export const disabled = false;
