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
} = await import("@adiwajshing/baileys");

async function sendArif(chatId, message, options = {}) {
  let generate = await generateWAMessage(chatId, message, options);
  let type2 = getContentType(generate.message);
  if ("contextInfo" in options)
    generate.message[type2].contextInfo = options?.contextInfo;
  if ("contextInfo" in message)
    generate.message[type2].contextInfo = message?.contextInfo;
  return await conn.relayMessage(chatId, generate.message, {
    messageId: generate.key.id,
  });
}

export { sendArif };
