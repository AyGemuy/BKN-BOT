import findLyrics from "simple-find-lyrics";

export async function lirik(s) {
  const lyrics = await findLyrics(s);
  const hasil = {
    status: "200",
    hasil: "sukses",
    creator: "Arifzyn",
    result: lyrics,
  };
  return hasil;
}
