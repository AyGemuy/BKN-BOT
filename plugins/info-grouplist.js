let handler = async (m, { conn, usedPrefix, command, isOwner }) => {
  let ListGroup = await conn.groupFetchAllParticipating();
  let GetGroup = Object.values(ListGroup);
  let caption = `Berikut Adalah List Group & Announcement\n`;
  let TextListAnnounce = "Group Announcement\n\n";
  let TextListGroup = "Group Chatting\n\n";

  caption += `*Total Group Chatting:* ${
    GetGroup.filter((x) => x.announce == false).length
  }\n`;
  caption += `*Total Group Announcement :* ${
    GetGroup.filter((x) => x.announce == true).length
  }\n`;
  for (let x of GetGroup) {
    let isMem = x.participants;
    let isAdmin = isMem.filter((v) => v.admin == "admin");
    let isPemilik = isMem.filter((v) => v.admin == "superadmin");
    let adminGroup = x.participants
      .filter((p) => p.admin)
      .map((v, i) => `\n${i + 1}. @${v.id.split("@")[0]}`)
      .join(" [admin]");
    if (!x.announce) {
      TextListGroup += `${sym3} *Name :* ${x.subject}\n`;
      TextListGroup += `${sym3} *Owner :* ${
        x.owner ? "@" + x.owner.split("@")[0] : "Unknown"
      }\n`;
      TextListGroup += `${sym3} *Subject Owner :* ${
        x.subjectOwner ? "@" + x.subjectOwner.split("@")[0] : "Unknown"
      }\n`;
      TextListGroup += `${sym3} *ID :* ${x.id}\n`;
      TextListGroup += `${sym3} *Restrict :* ${x.restrict}\n`;
      TextListGroup += `${sym3} *Announce :* ${x.announce}\n`;
      TextListGroup += `${sym3} *Ephemeral :* ${new Date(
        x.ephemeralDuration * 1000
      ).toDateString()}\n`;
      TextListGroup += `${sym3} *Desc ID :* ${x.descId}\n`;
      TextListGroup += `${sym3} *Description :* ${
        x.desc?.toString().slice(0, 10) + "..." || "unknown"
      }\n`;
      TextListGroup += `*Admins :* ${adminGroup}\n`;
      TextListGroup += `${
        isOwner ? `*Participants :* ${x.participants?.length}` : ""
      }\n`;
      //caption += `${isOwner ? `*isBotAdmin :* [ ${!!data.participants.find(v => v.id == conn.user.jid).admin} ]` : ''}\n`
      TextListGroup += `${sym3} *Created :* ${new Date(
        x.subjectTime * 1000
      ).toDateString()}\n`;
      TextListGroup += `${sym3} *Creation :* ${new Date(
        x.creation * 1000
      ).toDateString()}\n`;
      TextListGroup += `${sym3} *Size :* ${x.size}\n`;
      TextListGroup += `\n\n===========================\n\n`;
    } else {
      TextListAnnounce += `${sym3} *Name :* ${x.subject}\n`;
      TextListAnnounce += `${sym3} *Owner :* ${
        x.owner ? "@" + x.owner.split("@")[0] : "Unknown"
      }\n`;
      TextListAnnounce += `${sym3} *Subject Owner :* ${
        x.subjectOwner ? "@" + x.subjectOwner.split("@")[0] : "Unknown"
      }\n`;
      TextListAnnounce += `${sym3} *ID :* ${x.id}\n`;
      TextListAnnounce += `${sym3} *Restrict :* ${x.restrict}\n`;
      TextListAnnounce += `${sym3} *Announce :* ${x.announce}\n`;
      TextListAnnounce += `${sym3} *Ephemeral :* ${new Date(
        x.ephemeralDuration * 1000
      ).toDateString()}\n`;
      TextListAnnounce += `${sym3} *Desc ID :* ${x.descId}\n`;
      TextListAnnounce += `${sym3} *Description :* ${
        x.desc?.toString().slice(0, 10) + "..." || "unknown"
      }\n`;
      TextListAnnounce += `*Admins :* ${adminGroup}\n`;
      TextListAnnounce += `${
        isOwner ? `*Participants :* ${x.participants?.length}` : ""
      }\n`;
      //caption += `${isOwner ? `*isBotAdmin :* [ ${!!data.participants.find(v => v.id == conn.user.jid).admin} ]` : ''}\n`
      TextListAnnounce += `${sym3} *Created :* ${new Date(
        x.subjectTime * 1000
      ).toDateString()}\n`;
      TextListAnnounce += `${sym3} *Creation :* ${new Date(
        x.creation * 1000
      ).toDateString()}\n`;
      TextListAnnounce += `${sym3} *Size :* ${x.size}\n`;
      TextListAnnounce += `\n\n===========================\n\n`;
    }
  }

  conn.reply(m.chat, caption, m, {
    mentions: await conn.parseMention(caption),
  });
  sleep(2000);
  conn.reply(m.chat, TextListGroup, m, {
    mentions: await conn.parseMention(TextListGroup),
  });
  sleep(4000);
  conn.reply(m.chat, TextListAnnounce, m, {
    mentions: await conn.parseMention(TextListAnnounce),
  });
};
handler.help = ["groups", "grouplist"];
handler.tags = ["group"];
handler.command = /^((gro?ups?list)|(listgro?ups?)|(listgc))$/i;

export default handler;
