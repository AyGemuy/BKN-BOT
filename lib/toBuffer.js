import fetch from "node-fetch";

export async function toBuffer(url) {
  const res = await fetch(url);
  const anu = Buffer.from(await res.arrayBuffer());
  return anu;
}
