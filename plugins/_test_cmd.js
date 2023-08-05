let handler = async (m, { conn }) => {
  await conn.sendMessage(
    m.chat,
    { poll: { name: "apabila", values: ["menu", "x"], selectableCount: 1 } },
    { quoted: m }
  );
};
handler.command = ["test2"];

export default handler;
