import Helper from "./helper.js";
import storeSystem from "./store.js";
import fs, { promises } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "wwebjs";

/**
 * Baileys (@adiwajshing/baileys)
 * Using this function is only to save inode
 * Use multi auth state for better function
 * */

const TIME = 1000 * 5;

const authFolder = storeSystem.fixFileName(`${Helper.opts._[0] || ""}sessions`);
const authFile = `${Helper.opts._[0] || "session"}.data.json`;
const { parse, stringify } = JSON;

// from: https://github.com/stafbotz/Qeeratsuki/blob/main/lib/clearSession.js
async function clearSession() {
  try {
    if (
      (Helper.opts["singleauth"] || Helper.opts["singleauthstate"]) &&
      fs.existsSync(authFile)
    ) {
      /**
       * @deprecated use multi file auth state instead please
       * i use simple function with overwrite file
       *
       * If you have more efficient code let me know
       * Please contact me, wa.me/62882016042489
       * */
      if (Date.now() - promises.stat.mtimeMs >= TIME) {
        console.log("[clearSession]", "Fixing session", authFile);
        promises.readFile(authFile, (err, data) => {
          /**
           * Troubleshooting is not JSON
           * */
          const fixSession = stringify(data.toString("utf-8"));
          const useFixed = parse(fixSession);
          promises.writeFile(authFile, stringify(useFixed.creds));
          console.log("[clearSession]", "Succes overwrite session", authFile);
        });
      }
    } else if (fs.existsSync(join(authFolder, "creds.json"))) {
      // inspired: https://github.com/BochilGaming/games-wabot/blob/multi-device/lib/clearTmp.js
      const filename = [];
      const files = await promises.readdir(authFolder);
      for (const file of files) filename.push(join(authFolder, file));
      filename.map(async (file) => {
        const stat = await promises.stat(file);
        if (stat.isFile() && Date.now() - stat.mtimeMs >= TIME) {
          if (file !== join(authFolder, "creds.json")) {
            await promises.unlink(file);
            console.log("[clearSession]", "Succes clearsession", file);
          }
        }
      });
    }
    /**
     * Use your own function for error log output
     * This function belongs to the Renshu Mushy license
     * */
  } catch (e) {
    console.error("[clearSession]", e);
    return e;
  }
}

/**
 * wwebjs (whatsapp-web.js)
 * using puppeteer
 * just to add features not available in Baileys
 * */

// from: https://github.com/amiruldev20/wwebjs-base
let myWhatsapp; /** so that it can be exported */
async function socketWawebjs() {
  myWhatsapp = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      // headless: false, /** @boolean uncomment ini jika ingin live chromium */
      args: ["--no-sandbox"] /** hide ini untuk live chromium */,
    },
  });
  myWhatsapp.on("qr", (qr) => {
    console.log("Please scan this QR");
    qrcode.generate(qr, { small: true });
  });
  myWhatsapp.on("ready", async () => {
    console.log("Wwebjs Bot Ready!!");
  });
  myWhatsapp.on("authenticated", () => {
    console.log("Authenticated");
  });
  myWhatsapp.on("auth_failure", (msg) => {
    console.error("Authentication Failure", msg);
  });
  myWhatsapp.initialize();
  myWhatsapp.on("loading_screen", (percent, message) => {
    console.log("Loading screen", percent, message);
  });
}

/** Export modules here */
export { clearSession, socketWawebjs, myWhatsapp };
