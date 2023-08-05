import fetch from "node-fetch";
import axios from "axios";

async function ghstalk(username) {
  const res = await axios.get("https://api.github.com/users/" + username);
  const rest = {
    status: "200",
    message: "sukses",
    creator: "ArifzynXD",
    result: res.data,
  };
  return result;
}

export { ghstalk };
