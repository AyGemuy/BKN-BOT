const handler = async (m, { conn, text }) => {
  if (!text) throw "Masukan Text...";
  let grup = Object.keys(await conn.groupFetchAllParticipating());
  let lis = [];
  for (let i of grup) {
    conn.reply(i, text, fkontak);
  }
};
handler.command = ["bctext"];

handler.owner = true;

export default handler;
