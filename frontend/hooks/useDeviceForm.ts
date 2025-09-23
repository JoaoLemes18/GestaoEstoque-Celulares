import { useState } from "react";

export function useDeviceForm() {
  const [imei, setImei] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const resetForm = () => {
    setImei("");
    setBrand("");
    setModel("");
    setStatus("");
    setColor("");
    setSize("");
  };

  return {
    imei, setImei,
    brand, setBrand,
    model, setModel,
    status, setStatus,
    color, setColor,
    size, setSize,
    resetForm
  };
}
