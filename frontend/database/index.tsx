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

export async function deleteDevice(id: number) {
  await db.runAsync("DELETE FROM devices WHERE id = ?;", id);
}

const mockDevices = [
  {
    imei: "351234567890001",
    brand: "Apple",
    model: "iPhone 14 Pro",
    status: "Novo",
    color: "Preto",
    size: "256GB",
  },
  {
    imei: "351234567890002",
    brand: "Samsung",
    model: "Galaxy S23 Ultra",
    status: "Seminovo",
    color: "Verde",
    size: "512GB",
  },
  {
    imei: "351234567890003",
    brand: "Xiaomi",
    model: "Redmi Note 12",
    status: "Usado",
    color: "Azul",
    size: "128GB",
  },
  {
    imei: "351234567890004",
    brand: "Motorola",
    model: "Moto G200",
    status: "Novo",
    color: "Branco",
    size: "256GB",
  },
  {
    imei: "351234567890005",
    brand: "Apple",
    model: "iPhone SE (2022)",
    status: "Seminovo",
    color: "Vermelho",
    size: "64GB",
  },
  {
    imei: "351234567890006",
    brand: "Samsung",
    model: "Galaxy A54",
    status: "Usado",
    color: "Preto",
    size: "128GB",
  },
  {
    imei: "351234567890007",
    brand: "Xiaomi",
    model: "Mi 11 Lite",
    status: "Novo",
    color: "Rosa",
    size: "256GB",
  },
  {
    imei: "351234567890008",
    brand: "Motorola",
    model: "Edge 30 Fusion",
    status: "Seminovo",
    color: "Cinza",
    size: "512GB",
  },
  {
    imei: "351234567890009",
    brand: "Apple",
    model: "iPhone 12",
    status: "Usado",
    color: "Azul-Marinho",
    size: "128GB",
  },
  {
    imei: "351234567890010",
    brand: "Samsung",
    model: "Galaxy Z Flip 5",
    status: "Novo",
    color: "Dourado",
    size: "512GB",
  },
  {
    imei: "351234567890011",
    brand: "Apple",
    model: "iPhone 13 Mini",
    status: "Novo",
    color: "Roxo",
    size: "128GB",
  },
  {
    imei: "351234567890012",
    brand: "Samsung",
    model: "Galaxy S22+",
    status: "Seminovo",
    color: "Branco",
    size: "256GB",
  },
  {
    imei: "351234567890013",
    brand: "Xiaomi",
    model: "Poco X5 Pro",
    status: "Usado",
    color: "Amarelo",
    size: "256GB",
  },
  {
    imei: "351234567890014",
    brand: "Motorola",
    model: "Moto G60",
    status: "Novo",
    color: "Azul",
    size: "128GB",
  },
  {
    imei: "351234567890015",
    brand: "Apple",
    model: "iPhone 11",
    status: "Usado",
    color: "Preto",
    size: "64GB",
  },
  {
    imei: "351234567890016",
    brand: "Samsung",
    model: "Galaxy Note 20 Ultra",
    status: "Seminovo",
    color: "Bronze",
    size: "512GB",
  },
  {
    imei: "351234567890017",
    brand: "Xiaomi",
    model: "Redmi 10C",
    status: "Novo",
    color: "Cinza",
    size: "64GB",
  },
  {
    imei: "351234567890018",
    brand: "Motorola",
    model: "Edge 40 Neo",
    status: "Novo",
    color: "Azul Escuro",
    size: "256GB",
  },
  {
    imei: "351234567890019",
    brand: "Apple",
    model: "iPhone XR",
    status: "Usado",
    color: "Coral",
    size: "128GB",
  },
  {
    imei: "351234567890020",
    brand: "Samsung",
    model: "Galaxy A34",
    status: "Seminovo",
    color: "Verde-Claro",
    size: "128GB",
  },
];

// roda só 1 vez
(async () => {
  await createTable();
  const existing = await fetchDevices();
  if (!existing || existing.length === 0) {
    for (const device of mockDevices) {
      await insertDevice(
        device.imei,
        device.brand,
        device.model,
        device.status,
        device.color,
        device.size
      );
    }
    console.log("✅ Banco populado com 20 dispositivos de teste!");
  }
})();
