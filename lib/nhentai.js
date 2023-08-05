import Example from "kasu.nhentaiapi.js";
const ExampleApi = new Example();

export async function nhentai(ID) {
  ExampleApi.url = "https://nhentai.net";
  ExampleApi.connection.start();
  const val = await ExampleApi.getID(ID).json();
  return val.url;
  ExampleApi.connection.close();
}
