import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("inventory.db");

export function createTable() {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS devices (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      imei TEXT, 
      brand TEXT, 
      model TEXT, 
      status TEXT, 
      color TEXT, 
      size TEXT
    );
  `);
}

export async function insertDevice(
  imei: string,
  brand: string,
  model: string,
  status: string,
  color: string,
  size: string
) {
  await db.runAsync(
    "INSERT INTO devices (imei, brand, model, status, color, size) VALUES (?, ?, ?, ?, ?, ?);",
    imei,
    brand,
    model,
    status,
    color,
    size
  );
}

export async function fetchDevices() {
  return await db.getAllAsync("SELECT * FROM devices;");
}

export async function deleteDevice(imei: string) {
  await db.runAsync("DELETE FROM devices WHERE imei = ?;", imei);
}
