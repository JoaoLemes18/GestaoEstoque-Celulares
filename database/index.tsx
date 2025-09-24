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

type DeviceRow = {
  id: number | string;
  imei: string;
  brand: string;
  model: string;
  status: string;
  color: string;
  size: string;
};

export async function fetchDevices() {
  const result: DeviceRow[] = await db.getAllAsync(
    "SELECT id, imei, brand, model, status, color, size FROM devices;"
  );
  return result.map((d: DeviceRow) => ({ ...d, id: Number(d.id) })); // 👈 garante number
}

export async function updateDevice(device: any) {
  await db.runAsync(
    "UPDATE devices SET imei=?, brand=?, model=?, status=?, color=?, size=? WHERE id=?;",
    device.imei,
    device.brand,
    device.model,
    device.status,
    device.color,
    device.size,
    device.id
  );
}

export async function deleteDevice(id: number) {
  await db.runAsync("DELETE FROM devices WHERE id = ?;", id);
};
