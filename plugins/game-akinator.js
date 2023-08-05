import { Aki } from "aki-api-v2";
import fs from "fs";

let handler = async (m, { conn, command, args, text }) => {
  if (db.data.users[m.sender].premiumTime < 1)
    return m.reply("FITUR GAME INI KHUSUS USER PREMIUM !");
  const daki = global.db.data.datas.akinator;
  const shp = "•";
  const akin = `*AKINATOR GAME*

Pikirkan seorang karakter fiksi atau nyata.
Bot akan mencoba untuk menebaknya`;
  let footer = `${shp} Start.
• Untuk mulai bermain Akinator
${shp} Stop.
• Untuk mulai bermain Akinator
${shp} Game Session.    
• Untuk melihat sesi Akinator kamu\n`;
  let template = (args[0] || "").toLowerCase();
  if (!args[0]) {
    conn.sendButton(
      m.chat,
      akin,
      footer,
      "https://telegra.ph/file/cdc1f976cffcb98cf8033.jpg",
      [
        ["Start", ".akinator start"],
        ["Stop", ".akinator stop"],
        ["Game Session", ".akinator mysession"],
      ],
      m
    );
  }
  //start akinator
  if (command) {
    switch (template) {
      case "start":
        {
          if (daki[m.sender]) {
            let foundp = "*AKINATOR GAME*\n\n";
            foundp += "Kamu sudah berada didalam permainan\n";
            let footer = `${shp} Game Session.\n    • Untuk melihat sesi akinator anda\n`;
            footer += `${shp} Stop\n    •  Stop bermain Akinator`;
            await conn.sendButton(
              m.chat,
              foundp,
              footer,
              [["Game Session", ".akinator mysession"]],
              m
            );
          } else {
            daki[m.sender] = new Aki({
              region: "id",
              childMode: false,
              proxy: undefined,
            });
            //await fs.writeFileSync(datapath, JSON.stringify(daki, null, 2))
            await daki[m.sender].start();
            //await fs.writeFileSync(datapath, JSON.stringify(daki2, null, 2))
            const sections = [
              {
                rows: [
                  { title: "Ya", rowId: ".akinator answer 0" },
                  { title: "Tidak", rowId: ".akinator answer 1" },
                  { title: "Tidak Tahu", rowId: ".akinator answer 2" },
                  { title: "Mungkin", rowId: ".akinator answer 3" },
                  { title: "Mungkin Tidak", rowId: ".akinator answer 4" },
                ],
              },
            ];
            const listMessage = {
              text: `${shp} Step : ${
                daki[m.sender].currentStep + 1
              }\n${shp} Progress : ${
                daki[m.sender].progress
              }\n${shp} Pertanyaan : ${daki[m.sender].question}`,
              footer: "Klik tombol dibawah untuk menjawab",
              title: "*AKINATOR GAME*",
              buttonText: "Jawab Disini",
              sections: sections,
            };
            await conn.sendMessage(m.chat, listMessage, { quoted: m });
          }
        }
        break;
      //stop akinator
      case "stop": {
        if (daki[m.sender] == undefined)
          return m.reply("Kamu tidak berada didalam permainan!");
        let foundp = "*AKINATOR GAME*\n\n";
        foundp += "Kamu sudah keluar dari Akinator\n";
        let footer = `${shp} Start.\n    • Untuk mulai bermain Akinator\n`;
        const button = [
          {
            quickReplyButton: {
              displayText: "Start",
              id: ".akinator start",
            },
          },
        ];
        await conn.sendButton(
          m.chat,
          foundp,
          footer,
          [["Start", ".akinator start"]],
          m
        );
        delete daki[m.sender];
        //await fs.writeFileSync(datapath, JSON.stringify(daki, null, 2))
      }
      //show game session
      case "mysession":
        {
          if (daki[m.sender] == undefined)
            return m.reply("Kamu tidak berada didalam permainan!");
          const sections = [
            {
              rows: [
                { title: "Ya", rowId: ".akinator answer 0" },
                { title: "Tidak", rowId: ".akinator answer 1" },
                { title: "Tidak Tahu", rowId: ".akinator answer 2" },
                { title: "Mungkin", rowId: ".akinator answer 3" },
                { title: "Mungkin Tidak", rowId: ".akinator answer 4" },
              ],
            },
          ];
          const listMessage = {
            text: `${shp} Step : ${
              daki[m.sender].currentStep + 1
            }\n${shp} Progress : ${
              daki[m.sender].progress
            }\n${shp} Pertanyaan : ${daki[m.sender].question}`,
            footer: "Klik tombol dibawah untuk menjawab",
            title: "*AKINATOR GAME*",
            buttonText: "Jawab Disini",
            sections: sections,
          };
          await conn.sendMessage(m.chat, listMessage);
        }
        break;
      //answer section
      case "answer":
        {
          if (daki[m.sender] == undefined)
            return m.reply("Kamu tidak berada didalam permainan!");
          await daki[m.sender].step(args[1]);
          //if progress > 80 && answers length == 1 ? win
          if (
            daki[m.sender].progress >= 80 ||
            daki[m.sender].currentStep >= 78
          ) {
            await daki[m.sender].win();
            if (daki[m.sender].answers.length == 1) {
              try {
                let res = daki[m.sender].answers[0];
                let ppres = daki[m.sender].answers[0].absolute_picture_path;
                let anuu = `*AKINATOR GAME RESULT*

• *ID :* ${res.id}
• *Name :* ${res.name}
• *Description :* ${res.description}
• *Rangking :* ${res.ranking}
• *Pseudo :* ${res.pseudo}
• *Nsfw :* ${res.nsfw}`;
                await conn.sendButtonImg(
                  m.chat,
                  ppres,
                  anuu,
                  "Klik tombol dibawah untuk memulai kembali",
                  "Start Again",
                  ".akinator start",
                  m
                );
              } catch {
                m.reply(
                  await tool.parseResult(
                    "AKINATOR GAME RESULT",
                    daki[m.sender].answers[0],
                    { delete: ["picture_path", "pseudo", "nsfw"] }
                  )
                );
              }
              return delete daki[m.sender];
            }
          }
          const sections = [
            {
              rows: [
                { title: "Ya", rowId: ".akinator answer 0" },
                { title: "Tidak", rowId: ".akinator answer 1" },
                { title: "Tidak Tahu", rowId: ".akinator answer 2" },
                { title: "Mungkin", rowId: ".akinator answer 3" },
                { title: "Mungkin Tidak", rowId: ".akinator answer 4" },
              ],
            },
          ];
          const listMessage = {
            text: `${shp} Step : ${
              daki[m.sender].currentStep + 1
            }\n${shp} Progress : ${
              daki[m.sender].progress
            }\n${shp} Pertanyaan : ${daki[m.sender].question}`,
            footer: "Klik tombol dibawah untuk menjawab",
            title: "*AKINATOR GAME*",
            buttonText: "Jawab Disini",
            sections: sections,
          };
          await conn.sendMessage(m.chat, listMessage, { quoted: m });
          //await fs.writeFileSync(datapath, JSON.stringify(daki, null, 2))
        }
        break;
    }
  }
};
handler.help = ["akinator"];
handler.tags = ["game"];
handler.command = ["akinator"];

export default handler;
