import { canLevelUp, xpRange } from "../lib/levelling.js";
import { levelup } from "../lib/canvas.js";

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  if (!canLevelUp(user.level, user.exp, global.multiplier)) {
    let { min, xp, max } = xpRange(user.level, global.multiplier);
    throw `
Level ${user.level} 📊
*${user.exp - min} / ${xp}*
Kurang *${max - user.exp}* lagi! ✨
`.trim();
  }
  let before = user.level * 1;
  while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
  if (before !== user.level) {
    let role = (Object.entries(global.roles)
      .sort((a, b) => b[1] - a[1])
      .find(([, minLevel]) => user.level > minLevel) ||
      Object.entries(global.roles)[0])[0];
    let { min, xp, max } = xpRange(user.level, global.multiplier);

    user.role = role;
    const Canvas = API(
      "https://39f7d1cb-8f2d-4f1f-98f5-6463c6881656.id.repl.co",
      "/",
      {
        username: m.name,
        bannerURL: "https://telegra.ph/file/e0e1ee70480759e2d0ac7.jpg",
        defaultAvatarURL: await conn
          .profilePictureUrl(m.sender, "image")
          .catch((e) => "https://telegra.ph/file/2d06f0936842064f6b3bb.png"),
        discriminator: 10,
        createdTimestamp: Date.now(),
        bot: false,
        customTag: "GoodBye",
        rankData: JSON.stringify({
          currentXp: user.exp - min,
          requiredXp: xp,
          rank: getKeyByValue(global.roles, role),
          level: user.level,
          barColor: "0b7b95",
        }),
      }
    );
    let str = `_Hey, ${conn.getTag(m.sender)}_
    
*🎉 C O N G R A T S, L E V E L  U P🎉*
_• 📚Level: *${before}* ➔ *${user.level}*_
_• 💎Role: ~*[ ${role} ]*~_
_• 🧬Level Sebelumnya : *${before}*_
_• 🧬Level Baru : *${user.level}*_
_• ⏰Pada Jam : *${new Date().toLocaleString("id-ID")}*_

*Note:* _Semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_
`.trim();

    let { data } = await conn.getFile(Canvas);
    conn.sendButton(m.chat, str, botdate, data, [["INVENTORY", ".inv"]], m, {
      mentions: conn.parseMention(str),
    });
  }
};
function getKeyByValue(obj, value) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (obj[prop] === value) return prop;
    }
  }
}

handler.help = ["levelup"];
handler.tags = ["xp"];

handler.command = /^level(|up)$/i;

export default handler;

//By FongsiDev LevelUp
