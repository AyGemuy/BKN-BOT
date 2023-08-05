let handler = async (m, { conn, args, command }) => {
  conn.duel = conn.duel ? conn.duel : [];
  args.length != 0
    ? conn.duel.push(
        m.mentionedJid
          ? m.mentionedJid[0]
          : args[0].replace(/[@ .+-]/g, "").replace(" ", "") + "@s.whatsapp.net"
      )
    : "";
  let who = conn.duel[0];
  //let kita = conn.duel[m.sender]
  let enemy = global.db.data.users[who];
  let user = global.db.data.users[m.sender];
  let count =
    args[1] && args[1].length > 0
      ? Math.min(100, Math.max(parseInt(args[1]), 1))
      : Math.min(1);
  let nama = conn.getName(m.sender);

  let randomaku = `${Math.floor(Math.random() * 101)}`.trim();
  let randomkamu = `${Math.floor(Math.random() * 81)}`.trim();
  let Aku = randomaku * 1;
  let Kamu = randomkamu * 1;

  let __timers = new Date() - user.lastduel;
  let _timers = 300000 - __timers;
  let timers = clockString(_timers);

  try {
    if (/duel/.test(command)) {
      if (!who) return m.reply("tag yg ingin di ajak duel!");

      let pler = `@${m.sender.replace(/@.+/, "")} Mengajak duel ${
        args[0]
      }\n\nPilih Y Atau No`;
      let mentionedJid = [m.sender];

      if (new Date() - user.lastduel > 300000) {
        conn.sendButton(
          m.chat,
          pler,
          wm,
          null,
          [
            [`Ya`, `+dya`],
            [`No`, `+dno`],
          ],
          m,
          { mentions: conn.parseMention(mentionedJid) }
        );
      } else
        conn.reply(m.chat, `Kamu Sudah Berduel Tunggu hingga ${timers}`, m);
    }

    const jmlh = [999, 1000, 4999, 5999, 63667, 10000].getRandom();

    if (/dya/.test(command)) {
      let kenal = !who.includes(m.sender);
      if (kenal) throw "Lu siapa?\nkok ikut kut mau duel";
      user.lastduel = new Date() * 1;
      if (Aku > Kamu) {
        user.money -= jmlh;
        enemy.money += jmlh * 1;
        delete conn.duel[m.sender];
        conn.reply(
          m.chat,
          `@${
            who.split("@")[0]
          } Menang Gelud🤼\n*Hadiah:*\n${jmlh} Money\n${jmlh} Balance buat beli gorengan`.trim(),
          m,
          { mentions: [who] }
        );
      } else if (Aku < Kamu) {
        user.money += jmlh * 1;
        user.balance += jmlh * 1;
        enemy.money -= jmlh;
        enemy.balance -= jmlh;
        delete conn.duel[m.sender];
        conn.reply(
          m.chat,
          `@${
            who.split("@")[0]
          } Kalah Gelud🤼\n*Hadiah:*\n ${jmlh} Money\n${jmlh} Balance Mayan buat beli Limit`.trim(),
          m,
          { mentions: [who] }
        );
      } else {
        user.money += jmlh * 1;
        user.balance += jmlh * 1;
        enemy.money += jmlh * 1;
        enemy.balance += jmlh * 1;
        delete conn.duel[m.sender];
        conn.reply(
          m.chat,
          `@${
            who.split("@")[0]
          }\n *Seri*\n masing masing ${jmlh} Money\n${jmlh} Balance`.trim(),
          m,
          { mentions: [who] }
        );
      }
    }
    if (/dno/.test(command)) {
      let kenal = !who.includes(m.sender);
      if (kenal)
        return conn.sendButton(
          m.chat,
          `Lu siapa?\nkok ikut kut mau duel`,
          `Sesion`,
          null,
          [[`NO`, `.dno`]],
          m
        );
      //if (!who) return m.reply('tag yg ingin di ajak duel!')
      conn.reply(m.chat, `@${who.split("@")[0]} Membatalkan Ajakan Duel`, m);
      delete conn.duel[m.sender];
    }
  } catch (e) {
    //return conn.sendBut( m.chat, `Sepertinya ada bug`, `laporkan ke owner`, `Kanjut Badag`, `+bug duel ${e.stack}`, m)
    return m.reply(`${e}`);
  }
};

handler.help = ["duel @tag"];
handler.tags = ["rpg"];
handler.command = /^(duel|dya|dno|pvp)/i;
handler.group = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
function clockString(ms) {
  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [
    "\n" + d,
    " *Days ☀️*\n ",
    h,
    " *Hours 🕐*\n ",
    m,
    " *Minute ⏰*\n ",
    s,
    " *Second ⏱️* ",
  ]
    .map((v) => v.toString().padStart(2, 0))
    .join("");
}
