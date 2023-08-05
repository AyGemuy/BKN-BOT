let handler = async (m, { conn }) => {
  m.reply(
    "https://arifzyn.my.id\n\n*Silahkan cek website berikut untuk cek harga*"
  );
};
handler.help = handler.command = [
  "sewa",
  "premium",
  "sewabot",
  "jadibot",
  "jasarun",
  "jadiowner",
];
handler.tags = ["info"];

export default handler;
