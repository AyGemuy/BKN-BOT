import fetch from "node-fetch";

let handler = async (m, { conn }) => {
  let imgr = fla.getRandom();
  let pp = imgr + "Kode Bahasa";
  let kode = `┏━━°❀❬ *Kode Bahasa* ❭❀°━━┓
┃
┃• af : Afrikaans
┃• sq : Albanian
┃• ar : Arab
┃• hy : Armenian
┃• ca : Catalan
┃• zh : Chinese
┃• zh-cn : Chinese (Mandarin/China)
┃• zh-tw : Chinese (Mandarin/Taiwan)
┃• zh-yue : Chinese (Cantonese)
┃• hr : Croatian
┃• cs : Czech
┃• da : Danish
┃• nl : Dutch
┃• en : English
┃• en-au : English (Australia)
┃• en-uk : English (United Kingdom)
┃• en-us : English (United States)
┃• eo : Esperanto
┃• fi : Finnish
┃• fr : French
┃• de : German
┃• el : Greek
┃• ht : Haitian Creole
┃• hi : Hindi
┃• hu : Hungarian
┃• is : Icelandic
┃• id : Indonesian
┃• it : Italian
┃• ja : Japanese
┃• ko : Korean
┃• la : Latin
┃• lv : Latvian
┃• mk : Macedonian
┃• no : Norwegian
┃• pl : Polish
┃• pt : Portuguese
┃• pt-br : Portuguese (Brazil)
┃• ro : Romanian
┃• ru : Russian
┃• sr : Serbian
┃• sk : Slovak
┃• es : Spanish
┃• es-es : Spanish (Spain)
┃• es-us : Spanish (United States)
┃• sw : Swahili
┃• sv : Swedish
┃• ta : Tamil
┃• th : Thai
┃• tr : Turkish
┃• vi : Vietnamese
┃• cy : Welsh
┗━━━━━━━━━━━━━━━━`;
  conn.sendButtonDoc(m.chat, kode, "Tch, Kode Bahasa", "Menu", ".menu", m, {
    contextInfo: {
      forwardingScore: fsizedoc,
      externalAdReply: {
        body: "© 𝐒𝐤𝐲𝐁𝗼𝐭",
        containsAutoReply: true,
        mediaType: 1,
        mediaUrl: hwaifu.getRandom(),
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceId: "© 𝐒𝐤𝐲𝐁𝗼𝐭",
        sourceType: "PDF",
        previewType: "PDF",
        sourceUrl: sgc,
        thumbnail: await (await fetch(pp)).buffer(),
        thumbnailUrl: sgc,
        title: "Join Sini Cuy",
      },
    },
  });
};
handler.help = ["kodebahasa"];
handler.tags = ["internet"];
handler.command = /^(kode(negara|bahasa))$/i;

export default handler;
