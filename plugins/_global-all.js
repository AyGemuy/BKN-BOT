import spit from "performance-now";

let handler = (m) => m;
handler.all = async function (m) {
  let times = spit();
  let latensi = spit() - times;

  global.hing = latensi.toFixed(4) + " ms";

  global.usr = Object.keys(global.db.data.users).length;

  global.apilol = db.data.datas.api;
};
export default handler;
