import axios from "axios";
import BodyForm from "form-data";
import fetch from "node-fetch";
import fs from "fs";
import cheerio from "cheerio";

export async function FromPath(imagePath, apiKey) {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(imagePath)) return reject(new Error("File not Found"));
    try {
      const form = new BodyForm();
      form.append("image_file", fs.createReadStream(imagePath));
      form.append("size", "auto");
      const key = apiKey
        ? { "X-Api-Key": apiKey }
        : {
            "X-CSRF-Token": (
              await s_token("https://remove.bg/", "meta[name='csrf-token']")
            ).attr("content"),
          };
      const data = await axios({
        url: "https://api.remove.bg/v1.0/removebg",
        method: "POST",
        headers: {
          ...key,
          ...form.getHeaders(),
        },
        data: form,
      });
      return resolve({ name: "Fongsidev", img: data.data });
    } catch (err) {
      return reject(new Error(String(err)));
    }
  });
}
export async function RemoveBackground(imageUrl) {
  return new Promise(async (resolve, reject) => {
    try {
      const form = new BodyForm();
      form.append("image_url", imageUrl);
      form.append("action", "REMOVE_BACKGROUND");
      form.append("image_type", "image/jpg");
      await axios({
        url: "https://api.simplified.com/api/v1/growth-tools",
        method: "POST",
        headers: {
          ...form.getHeaders(),
        },
        data: form,
      })
        .then(async (res) => {
          const task_id = await res.data.task_id;
          const url =
            "https://api.simplified.com/api/v1/tasks/" +
            task_id +
            "?format=json";
          await fetch(url);
          return resolve({
            name: "Fongsidev",
            url,
          });
        })
        .catch((err) => reject(err));
    } catch (err) {
      return reject(new Error(String(err)));
    }
  });
}
export async function FromUrl(imageUrl, apiKey) {
  return new Promise(async (resolve, reject) => {
    try {
      const form = new BodyForm();
      form.append("image_url", imageUrl);
      form.append("size", "auto");
      const key = apiKey
        ? { "X-Api-Key": apiKey }
        : {
            "X-CSRF-Token": (
              await s_token("https://remove.bg/", "meta[name='csrf-token']")
            ).attr("content"),
          };
      const data = await axios({
        url: "https://api.remove.bg/v1.0/removebg",
        method: "POST",
        headers: {
          ...key,
          ...form.getHeaders(),
        },
        data: form,
      });
      return resolve({ name: "Fongsidev", img: data.data });
    } catch (err) {
      return reject(new Error(String(err)));
    }
  });
}
async function s_token(host, getToken) {
  return new Promise(async (resolve, reject) => {
    axios
      .request({
        url: host,
        method: "GET",
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          cookie:
            "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
        },
      })
      .then(({ data }) => {
        let $ = cheerio.load(data);
        let token = $(getToken);
        resolve(token);
      });
  });
}

//By FongsiDev
