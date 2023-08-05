let handler = async (
  m,
  { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }
) => {
  let foto = fla.getRandom();
  let thum = foto + "Enable / Desable";

  const listEnab = `*–––––『 SETTINGS 』–––––*

🔖 OPTIONS LIST: 

✨ | Welcome
🚫 | Delete
🚫 | autodelvn
🌎 | Public
🗣️ | Simi
🗣️ | AutoOpenAi
🎮 | Game
🔞 | Nsfw
🌟 | PremNsfwChat
🚫 | Viewonce
🔗 | Antilink
🚫 | Antidelete
📛 | Antitoxic
⏏️ | Autolevelup
🔎 | Detect
📑 | Document
👤 | WhiteListMyContact
❗ | Restrict
😐 | Nyimak
☑️ | Autoread
💬 | PcOnly
🏢 | GcOnly
😱 | Antipiltex:vl
📷 | SwOnly
◾ | Auto Download 

 =========================== 
 ★ USAGE: 
 → ON 
 ${usedPrefix}on [option] 
 → OFF 
 ${usedPrefix}off [option] 

 ★ EXAMPLE: 
 → ON 
 ${usedPrefix}on welcome 
 → OFF 
 ${usedPrefix}off welcome 
`;

  let isEnable = /true|enable|(turn)?on|1/i.test(command);
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];
  let bot = global.db.data.settings[conn.user.jid] || {};
  let type = (args[0] || "").toLowerCase();
  let isAll = false,
    isUser = false;
  switch (type) {
    case "welcome":
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail("group", m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail("admin", m, conn);
        throw false;
      }
      chat.welcome = isEnable;
      break;
    case "detect":
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail("group", m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail("admin", m, conn);
        throw false;
      }
      chat.detect = isEnable;
      break;
    case "delete":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.delete = isEnable;
      break;
    case "antidelete":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.delete = !isEnable;
      break;
    case "autodelvn":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.autodelvn = isEnable;
      break;
    case "document":
      chat.useDocument = isEnable;
      break;
    case "self":
      isAll = true;
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      global.opts["self"] = !isEnable;
      break;
    case "public":
      isAll = true;
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      global.opts["self"] = !isEnable;
      break;
    case "antilink":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.antiLink = isEnable;
      break;
    case "viewonce":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.viewonce = isEnable;
      break;
    case "simi":
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      chat.simi = isEnable;
      break;
    case "game":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.game = isEnable;
      break;
    case "nsfw":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.nsfw = isEnable;
      break;
    case "antivirtex":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.antiVirtex = !isEnable;
      break;
    case "autoopenai":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.auto_openai = isEnable;
      break;
    case "premnsfwchat":
      if (m.isGroup) {
        if (!isROwner) {
          global.dfail("rowner", m, conn);
          throw false;
        }
      }
      chat.premnsfw = isEnable;
      break;
    /*    case 'toxic':
       if (m.isGroup) {
       if (!(isAdmin || isOwner)) {
       global.dfail('admin', m, conn)
           throw false
         }
     }
      chat.antiToxic = !isEnable
      break*/
    case "antitoxic":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          throw false;
        }
      }
      chat.antiBadword = isEnable;
      break;
    case "autolevelup":
      isUser = true;
      user.autolevelup = isEnable;
      break;
    case "mycontact":
    case "mycontacts":
    case "whitelistcontact":
    case "whitelistcontacts":
    case "whitelistmycontact":
    case "whitelistmycontacts":
      if (!isOwner) {
        global.dfail("owner", m, conn);
        throw false;
      }
      conn.callWhitelistMode = isEnable;
      break;
    case "restrict":
      isAll = true;
      if (!isOwner) {
        global.dfail("owner", m, conn);
        throw false;
      }
      bot.restrict = isEnable;
      break;
    case "nyimak":
      isAll = true;
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      global.opts["nyimak"] = isEnable;
      break;
    case "autoread":
      isAll = true;
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      global.opts["autoread"] = isEnable;
      break;
    case "pconly":
    case "privateonly":
      isAll = true;
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      global.opts["pconly"] = isEnable;
      break;
    case "gconly":
    case "grouponly":
      isAll = true;
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      global.opts["gconly"] = isEnable;
      break;
    case "swonly":
    case "statusonly":
      isAll = true;
      if (!isROwner) {
        global.dfail("rowner", m, conn);
        throw false;
      }
      global.opts["swonly"] = isEnable;
      break;
    case "autodl":
    case "autodownloader":
      if (m.isGroup) {
        if (!isROwner) {
          global.dfail("rowner", m, conn);
          throw false;
        }
      }
      chat.autodl = isEnable;
      break;
    default:
      if (!/[01]/.test(command))
        return await conn.sendButton(
          m.chat,
          listEnab,
          author,
          await conn.resize(thum, 300, 150),
          [
            ["Donasi", ".donasi"],
            ["Creator", ".owner"],
          ],
          m
        );
      throw false;
  }
  conn.reply(
    m.chat,
    `*${type}* berhasil Di *${isEnable ? "Nyalakan" : "Matikan"}* ${
      isAll ? "Untuk Bot Ini" : isUser ? "" : "Untuk Chat Ini"
    }`,
    fkontak
  );
};
handler.help = ["en", "dis"].map((v) => v + "able <option>");
handler.tags = ["group", "owner"];
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i;

export default handler;
