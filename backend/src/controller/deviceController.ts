import { Request, Response } from "express";
import * as Device from "../models/device";

export async function getDevices(req: Request, res: Response) {
  const devices = await Device.getAllDevices();
  res.json(devices);
}

export async function createDevice(req: Request, res: Response) {
  try {
    await Device.insertDevice(req.body);
    res.status(201).json({ message: "Dispositivo criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao inserir dispositivo" });
  }
}

export async function removeDevice(req: Request, res: Response) {
  try {
    await Device.deleteDevice(req.params.imei);
    res.json({ message: "Dispositivo excluído" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir dispositivo" });
  }
}
