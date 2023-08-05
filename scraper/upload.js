import FormData from "form-data";
import fetch from "node-fetch";
import { fileTypeFromBuffer } from "file-type";

export const uploadFile = async (buffer) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { ext } = await fileTypeFromBuffer(buffer);
      let form = new FormData();
      form.append("sampleFile", buffer, "file." + ext);
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
        creator: "ArifzynXD",
        status: false,
        msg: e.message,
      });
    }
  });
};
