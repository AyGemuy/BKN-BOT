import db from "quick.db";

export async function save(key, jsonData, expirationMin) {
  const expirationMS = expirationMin * 60 * 1000;
  const record = {
    value: JSON.stringify(jsonData),
    timestamp: new Date().getTime() + expirationMS,
  };
  db.set(key, JSON.stringify(record));
}

export async function load(key) {
  const record = JSON.parse(db.get(key));
  if (!data) {
    return false;
  }
  return new Date().getTime() < record.timestamp && JSON.parse(record.value);
}

export async function remove(key) {
  db.delete(key);
}
