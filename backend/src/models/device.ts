import { db } from "../config/db";

export async function getAllDevices() {
  const [rows] = await db.query("SELECT * FROM devices");
  return rows;
}

export async function insertDevice(device: {
  imei: string;
  brand: string;
  model: string;
  status: string;
  color: string;
  size: string;
}) {
  const { imei, brand, model, status, color, size } = device;
  await db.query(
    "INSERT INTO devices (imei, brand, model, status, color, size) VALUES (?, ?, ?, ?, ?, ?)",
    [imei, brand, model, status, color, size]
  );
}

export async function deleteDevice(imei: string) {
  await db.query("DELETE FROM devices WHERE imei = ?", [imei]);
}
