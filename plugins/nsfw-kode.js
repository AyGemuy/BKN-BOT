let handler = async (m, { conn, usedPrefix }) => {
  let txt = `${kode.getRandom()}
Tuh Kode nya!!`;
  conn.sendButton(
    m.chat,
    txt,
    wm,
    [["Nhentai", `.nhentai ${kode.getRandom()}`]],
    m
  );
};
handler.help = ["kodenuklir"];
handler.tags = ["nsfw"];
handler.command = /^(kodenuklir)$/i;

export default handler;

global.kode = [
  "229144",
  "253687",
  "238577",
  "236509",
  "227675",
  "229085",
  "233245",
  "266177",
  "254351",
  "239749",
  "251974",
  "260614",
  "262158",
  "244530",
  "243725",
  "261830",
  "261789",
  "262252",
  "262889",
  "128983",
  "110332",
  "266116",
  "205089",
  "184068",
  "251524",
  "163532",
  "247103",
  "168941",
  "225496",
  "199613",
  "233547",
  "258382",
  "245023",
  "245023",
  "232887",
  "262870",
  "239312",
  "255129",
  "246963",
  "256050",
  "215459",
  "224942",
  "232887",
  "233770",
  "250704",
  "215658",
  "261819",
  "256404",
  "260028",
  "241254",
  "268580",
  "262407",
];
//FG - JB Made By 𝙁𝘾 么 Glitch Editz#0433
