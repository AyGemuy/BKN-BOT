export async function before(m) {
  let user = global.db.data.users[m.sender];
  if (user.afk > -1) {
    if (user.banned) {
      user.afk = -1;
      user.afkReason = "User Banned Afk";
    } else {
      conn.reply(
        m.chat,
        `Kamu berhenti AFK!\nAlasan: ${
          user.afkReason ? user.afkReason : "No Reason"
        }\nSelama ${(new Date() - user.afk).toTimeString()} Yang Lalu
  `,
        m,
        global?.fakeig
      );
      user.afk = -1;
      user.afkReason = "";
    }
  }
  let jids = [
    ...new Set([
      ...(m.mentionedJid || []),
      ...(m.quoted ? [m.quoted.sender] : []),
    ]),
  ];
  for (let jid of jids) {
    let user = global.db.data.users[jid];
    if (!user) continue;
    if (user.banned) {
      user.afk = -1;
      user.afkReason = "User Banned Afk";
    } else {
      let afkTime = user.afk;
      if (!afkTime || afkTime < 0) continue;
      let reason = user.afkReason || "";
      conn.reply(
        m.chat,
        `Jangan tag dia!\nDia sedang AFK.\nAlasan: ${
          reason ? reason : "No Reason"
        }\nSelama ${(new Date() - afkTime).toTimeString()} Yang Lalu
  `,
        m,
        global?.fakeig
      );
    }
  }
}
//Made By BlueCkkn
