// utils/validations.ts
export function validateDevice(device: any) {
  const { imei, brand, model, status, color, size } = device;

  return [imei, brand, model, status, color, size].every(
    (v) => typeof v === "string" && v.trim() !== ""
  );
}
