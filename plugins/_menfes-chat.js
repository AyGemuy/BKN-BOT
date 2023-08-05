import { anonymous } from "../lib/menfess.js";

export async function all(m, participant) {
  if (!m.message) return;
  let room = Object.values(anonymous).find(
    (p) => p.state == "CHATTING" && p.check(m.sender)
  );
  if (room) {
    let other = room.other(m.sender);
    m.copyNForward(
      other,
      true,
      m.quoted && m.quoted.fromMe
        ? {
            contextInfo: {
              ...m.msg.contextInfo,
              forwardingScore: 0,
              isForwarded: true,
              participant: other,
            },
          }
        : {}
    );
  }
}
