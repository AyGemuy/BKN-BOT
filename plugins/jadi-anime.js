import fs from "fs";
import waifu2x from "waifu2x";
import { createCanvas, loadImage } from "canvas"; // Tambahkan ini

let handler = async (m, { conn }) => {
  /*let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime.startsWith('image')) throw 'Reply gambar saja'
  let buffer = await q.download()
  let canvas = createCanvas(512, 512) 
  let image = await loadImage(buffer) 
  let waifu2xStream = new waifu2x({ canvas }) 
  let waifu2xBuffer = await waifu2xStream.push(image).result() 
  let filename = 'hasil-waifu2x.png'
  fs.writeFileSync(filename, waifu2xBuffer)
  m.reply('Tunggu sebentar ya, hasil konversi sedang diproses...')
  await conn.sendMessage(m.chat, {
    mimetype: 'image/png',
    url: 'data:image/png;base64,' + waifu2xBuffer.toString('base64'),
    filename: 'hasil-waifu2x.png'
  }, MessageType.image, { quoted: q }) */
};

handler.help = ["jadianime"];
handler.tags = ["convert"];
handler.command = /^(to|jadi)anime$/i;

export default handler;
