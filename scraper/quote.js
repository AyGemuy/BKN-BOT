import axios from "axios";
import { sticker } from "../lib/sticker.js";

export async function quote(text, name, avatar) {
  const json = {
    type: "quote",
    format: "png",
    backgroundColor: "#FFFFFF",
    width: 512,
    height: 768,
    scale: 2,
    messages: [
      {
        entities: [],
        avatar: true,
        from: {
          id: 1,
          name: name,
          photo: {
            url: avatar,
          },
        },
        text: text,
        replyMessage: {},
      },
    ],
  };
  const res = await axios.post("https://bot.lyo.su/quote/generate", json, {
    headers: { "Content-Type": "application/json" },
  });
  const buffer = await sticker(
    Buffer.from(res.data.result.image, "base64"),
    false,
    "By ArifzynXD",
    "Bot WhatsApp"
  );
  return {
    status: "200",
    creator: "ArifzynXD",
    result: buffer,
  };
}
