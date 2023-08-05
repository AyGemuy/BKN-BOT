let handler = async (m, { conn, usedPrefix }) => {
  let listpnl = `Hai @${m.sender.split`@`[0]}, 
Berikut Afa List Cmd Panel 

*List Command Panel :*

${usedPrefix}addusr 
${usedPrefix}delusr
${usedPrefix}listusr
${usedPrefix}detusr
${usedPrefix}addsrv 
${usedPrefix}delsrv
${usedPrefix}listsrv
${usedPrefix}detsrvadd
${usedPrefix}reinstall
${usedPrefix}updatesrv
${usedPrefix}startsrv
${usedPrefix}stopsrrv
${usedPrefix}restartsrv`;
  conn.reply(m.chat, listpnl, fkontak, { mentions: [m.sender] });
};
handler.help = handler.command = ["panel"];
handler.tags = ["store"];

export default handler;
