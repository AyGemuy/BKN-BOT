// By Arifzyn, Yang Hapus Yatim

let buatall = 1;
let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
  conn.casino = conn.casino ? conn.casino : {};
  if (db.data.users[m.sender].premiumTime < 1)
    return m.reply("FITUR INI KHUSUS PREMIUM USER");
  if (m.chat in conn.casino)
    return m.reply(
      "Masih ada yang melakukan casino disini, tunggu sampai selesai!!"
    );
  else conn.casino[m.chat] = true;
  try {
    let randomaku = `${Math.floor(Math.random() * 1)}`.trim();
    let randomkamu = `${Math.floor(Math.random() * 15)}`.trim(); //hehe Biar Susah Menang :v
    let Aku = randomaku * 1;
    let Kamu = randomkamu * 1;
    let count = args[0];
    count = count
      ? /all/i.test(count)
        ? Math.floor(global.db.data.users[m.sender].money / buatall)
        : parseInt(count)
      : args[0]
      ? parseInt(args[0])
      : 1;
    count = Math.max(1, count);
    if (args.length < 1) return conn.reply(m.chat, "Masukan Jumlah Money", m);
    if (global.db.data.users[m.sender].money >= count * 1) {
      global.db.data.users[m.sender].money -= count * 1;
      if (Aku > Kamu) {
        let caption = `💰 *C A S I N O* 💰\n\n${htjava} *@${
          m.sender.split("@")[0]
        }* - [USER]\n┗┅⭑ ${Kamu} Point\n${htjava} *@${
          nomorbot.split("@")[0]
        }* - [BOT]\n┗┅⭑ ${Aku} Point\n\n❌ *LOSE* ❌\nKamu kehilangan ${count} Money`.trim();
        conn.reply(m.chat, caption, m, {
          mentions: conn.parseMention(caption),
          quoted: fkontak,
        });
      } else if (Aku < Kamu) {
        let caption = `💰 *C A S I N O* 💰\n\n${htjava} *@${
          m.sender.split("@")[0]
        }* - [USER]\n┗┅⭑ ${Kamu} Point\n${htjava} *@${
          nomorbot.split("@")[0]
        }* - [BOT]\n┗┅⭑ ${Aku} Point\n\n🎉 *WIN* 🎉\nKamu mendapatkan ${
          count * 2
        } Money`.trim();
        conn.reply(m.chat, caption, m, {
          mentions: conn.parseMention(caption),
          quoted: fkontak,
        });
        global.db.data.users[m.sender].money += count * 2;
      } else {
        let caption = `💰 *C A S I N O* 💰\n\n${htjava} *@${
          m.sender.split("@")[0]
        }* - [USER]\n┗┅⭑ ${Kamu} Point\n${htjava} *@${
          nomorbot.split("@")[0]
        }* - [BOT]\n┗┅⭑ ${Aku} Point\n\n🔖*DRAW* 🔖\nKamu mendapatkan ${
          count * 1
        } Money`.trim();
        conn.reply(m.chat, caption, m, {
          mentions: conn.parseMention(caption),
          quoted: fkontak,
        });
        global.db.data.users[m.sender].money >= count * 1;
      }
    } else
      conn.reply(
        m.chat,
        `Money kamu tidak mencukupi untuk Casino silahkan *.claim* terlebih dahulu!`.trim(),
        m
      );
  } catch (e) {
    console.log(e);
    m.reply("Error!!");
    if (DevMode) {
      for (let jid of global.owner
        .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
        .filter((v) => v != conn.user.jid)) {
        conn.reply(
          jid,
          "casino.js error\nNo: *" +
            m.sender.split`@`[0] +
            "*\nCommand: *" +
            m.text +
            "*\n\n*" +
            e +
            "*",
          m
        );
      }
    }
  } finally {
    delete conn.casino[m.chat];
  }
};

handler.help = ["casino <jumlah>"];
handler.tags = ["rpg"];
handler.command = /^(casinop|csnp|csnpremium|casinopremium)$/i;

handler.premium = true;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
