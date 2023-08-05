import rp from "request-promise";

class Imgbb {
  constructor({ key }) {
    this.key = key;
  }
  async upload(image, name = null) {
    const options = {
      method: "POST",
      uri: "https://api.imgbb.com/1/upload",
      form: {
        key: this.key,
        image,
        name,
      },
      json: true,
    };
    try {
      const res = await rp(options);
      return {
        success: true,
        status: 200,
        data: res.data,
      };
    } catch (e) {
      return {
        success: false,
        status: e.error.status_code,
        message: e.error.status_txt,
        error: e.error.error,
      };
    }
  }
}

export { Imgbb };
