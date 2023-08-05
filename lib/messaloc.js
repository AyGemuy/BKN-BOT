import baileys from "@adiwajshing/baileys";

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
} = baileys;

export async function sendArifLoc(
  jid,
  buffer,
  contentText,
  footer,
  urlbut,
  buturl,
  buttons1,
  row1,
  buttons2,
  row2,
  quoted,
  options
) {
  const type = await conn.getFile(buffer);
  let { res, data: file } = type;
  if ((res && res.status !== 200) || file.length <= 65536) {
    try {
      throw { json: JSON.parse(file.toString()) };
    } catch (e) {
      if (e.json) throw e.json;
    }
  }
  const template = generateWAMessageFromContent(
    jid,
    proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          locationMessage: { jpegThumbnail: file },
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          ...options,
          hydratedButtons: [
            {
              urlButton: {
                displayText: buturl,
                url: urlbut,
              },
            },
            {
              quickReplyButton: {
                displayText: buttons1,
                id: row1,
              },
            },
            {
              quickReplyButton: {
                displayText: buttons2,
                id: row2,
              },
            },
          ],
        },
      },
    }),
    {
      userJid: conn.user.jid,
      quoted: quoted,
      contextInfo: { mentionedJid: conn.parseMention(contentText + footer) },
      ephemeralExpiration: 86400,
      ...options,
    }
  );
  return await conn.relayMessage(jid, template.message, {
    messageId: template.key.id,
  });
}
