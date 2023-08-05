import pkg from "@adiwajshing/baileys";
import fs from "fs";

const { prepareWAMessageMedia, generateWAMessageFromContent, proto } = pkg;

let handler = async (m, { conn }) => {
  let img = await conn.resize(
    "https://telegra.ph/file/8f2cb36ffaa7f5bd5fc39.jpg",
    300,
    300
  );
  var messa = await prepareWAMessageMedia(
    { image: img },
    { upload: conn.waUploadToServer }
  );
  var catalog = generateWAMessageFromContent(
    m.chat,
    proto.Message.fromObject({
      productMessage: {
        product: {
          productImage: messa.imageMessage,
          productId: "5326844927399395",
          title: `Bot WhatsApp By ArifzynXD`,
          description: `gaktau`,
          currencyCode: "IDR",
          bodyText: `gaktaukalo`,
          footerText: `koncol`,
          priceAmount1000: "30000000",
          productImageCount: 100,
          firstImageId: 1,
          salePriceAmount1000: "30000000",
          retailerId: `Arifzyn⿻ꫂ`,
          url: "wa.me/6289503433262",
        },
        businessOwnerJid: "6289503433262@s.whatsapp.net",
      },
    }),
    { userJid: m.chat, quoted: m }
  );
  conn.relayMessage(m.chat, catalog.message, { messageId: catalog.key.id });
};
handler.help = ["sewa", "premium"];
handler.tags = ["main"];
handler.command = /^(catalog)$/i;

export default handler;
