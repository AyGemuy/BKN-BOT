import Canvas from "canvas";
import canvasGif from "canvas-gif";

const file = process.cwd() + "src/attp.gif";

export async function attp(txt) {
  Canvas.registerFont("./src/SF-Pro.ttf", { family: "SF-Pro" });
  const buffer = await canvasGif(
    file,
    (ctx) => {
      var couler = [
        "#ff0000",
        "#ffe100",
        "#33ff00",
        "#00ffcc",
        "#0033ff",
        "#9500ff",
        "#ff00ff",
      ];
      let jadi = couler[Math.floor(Math.random() * couler.length)];
      function drawStroked(txt, x, y) {
        ctx.lineWidth = 5;
        ctx.font = `90px SF-Pro`;
        ctx.fillStyle = jadi;
        ctx.strokeStyle = "black";
        ctx.textAlign = "center";
        ctx.strokeText(txt, x, y);
        ctx.fillText(txt, x, y);
      }
      drawStroked(txt, 290, 300);
    },
    {
      coalesce: false,
      delay: 0,
      repeat: 0,
      algorithm: "octree",
      optimiser: false,
      fps: 7,
      quality: 100,
    }
  );
  return buffer;
}

export async function ttp(txt) {
  Canvas.registerFont("./src/SF-Pro.ttf", { family: "SF-Pro" });
  let length = txt.length;

  var font = 90;

  var ttp = {};
  ttp.create = Canvas.createCanvas(576, 576);
  ttp.context = ttp.create.getContext("2d");
  ttp.context.font = `${font}px SF-Pro`;
  ttp.context.strokeStyle = "black";
  ttp.context.lineWidth = 3;
  ttp.context.textAlign = "center";
  ttp.context.strokeText(txt, 290, 300);
  ttp.context.fillStyle = "white";
  ttp.context.fillText(txt, 290, 300);
  return ttp.create.toBuffer();
}
