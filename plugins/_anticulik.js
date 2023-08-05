import fs from "fs";
import fetch from "node-fetch";
import moment from "moment-timezone";
import { WAMessageStubType } from "@adiwajshing/baileys";

export async function all(m) {
  // ketika ada yang invite/kirim link grup di chat pribadi
  if (m.messageStubType || m.isGroup) {
    let chats = global.db.data.chats[m.chat];
    if (!chats) chats = global.db.data.chats[m.chat] = {};
    if (m.messageStubType == 20) {
      if (!chats.JoinLst) {
        let group = m.chat;
        let edtr = `@${m.sender.split`@`[0]}`;
        await this.sendMessage(
          m.chat,
          {
            text: `Hey ${edtr}\nAnda mencoba untuk menambahkan saya ke group ini tetapi maaf.\nBot akan keluar karena tidak ada izin dari pihak owner!\n\nSilahkan chat owner saya https://wa.me/${nomorown} untuk memberi izin.\n\nNOTE: JANGAN NYOLONG NAPA `,
            mentions: [m.sender],
          },
          { quoted: fkontak }
        ).then(async (x) => {
          await conn.groupLeave(group);
        });
      } else {
        await this.sendMessage(
          m.chat,
          {
            text: `Halo, Saya adalah bot.\nDi sini saya membantu anda melakukan kegiatan sehari hari.\nMisalnya downloader Video Dari yt, Tiktok atau membuat Sticker atau atau bermain dengan bot pakai cmd yg seru.\nKetik !menu untuk menampilkan cmd bot.`,
            mentions: [m.sender],
          },
          { quoted: fkontak }
        );
        chats.JoinLst = null;
      }
    }
  }
  if (
    (m.mtype === "groupInviteMessage" ||
      m.text.startsWith("Undangan untuk bergabung") ||
      m.text.startsWith("Invitation to join") ||
      m.text.startsWith("Buka tautan ini")) &&
    !m.isBaileys &&
    !m.isGroup &&
    !m.isBlocked
  ) {
    this.sendButton(
      m.chat,
      `${wm}

        $B(,(,(,(,!V(B SEWA $B!W(B
         Hemat: 5k/grup (1 minggu)
         Normal: 15k/grup (1 bulan)
         Standar: 30k/grup (2 bulan)
         Pro: 35k/grup (4 bulan)                                                      
         Vip: = 65k/grup (12 bulan)
        $B(,(B
        
        $B(,(,(,(,!V(B PREMIUM $B!W(B
         Hemat: 5k (1 minggu)
         Normal: 20k (1 bulan)
         Pro: 40k (4 bulan)
         Vip: 50k (8 bulan)                                               
         Permanent: = 70k (Unlimited)
        $B(,(B
        
         PAYMENT:
         Pulsa Telkomsel: []
         Dana: []
         Gopay: []
         Ovo: []
         Link Aja: []
        
        Nomor Owner :
        wa.me/6289503433262
        
        $B("("(B
        
        #blueckkn
        `.trim(),
      wm,
      "Pemilik Bot",
      ".owner",
      m
    );
    await this.reply(
      global.logs.anticulik,
      `Ada Yang Mau Nyulik nih :v \n\ndari: @${
        m.sender.split("@")[0]
      } \n\npesan: ${m.text}`,
      m,
      { mentions: [m.sender] }
    );
  }
  //console.log(m)
  return !0;
}
//FG - JB Made By 𝙁𝘾 么 Glitch Editz#0433