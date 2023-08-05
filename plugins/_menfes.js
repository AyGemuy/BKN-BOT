export async function all(m) {
  this.menfess = this.menfess ? this.menfess : {};
  if (
    this.menfess[m.sender] &&
    this.menfess[m.sender].id != 0 &&
    m.quoted.footerText == "_Menfess - Whatsapp Bot_"
  ) {
    var txt = `🚩 Hi kamu mendapatkan balasan menfess dari @${
      m.sender.split("@")[0]
    }\n\n*Isi Balasan :* ${m.text}`.trim();
    this.reply(this.menfess[m.sender].dari, txt, null, {
      mentions: this.parseMention(txt),
    });
    this.reply(m.from, "🚩 Berhasil mengirim balasan.", m);
    await slep(750);
    delete this.menfess[m.sender];
  }
}
