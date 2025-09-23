export const validateDevice = (device: any) => {
  return Object.values(device).every((v) => v && v.trim() !== "");
};
