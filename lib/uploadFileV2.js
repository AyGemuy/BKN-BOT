import fetch from "node-fetch";
import { fileTypeFromBuffer } from "file-type";
import FromData from "form-data";
import fs from "fs";

const uploadFile = (buffer) => {
  return new Promise(async (resolve, reject) => {
    try {
      const type = await fileTypeFromBuffer(buffer);
      let form = new FormData();
      form.append("sampleFile", buffer, "file." + type.ext);
      let json = await (
        await fetch(`https://api.arifzynstore.my.id/api/tools/upload`, {
          method: "POST",
          body: form,
        })
      ).json();
      resolve(json);
    } catch (e) {
      console.log(e);
      return resolve({
        creator: global.creator,
        status: false,
        msg: e.message,
      });
    }
  });
};
