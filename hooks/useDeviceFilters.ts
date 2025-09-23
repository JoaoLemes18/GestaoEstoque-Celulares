import { useState } from "react";

export function useDeviceFilters() {
  const [imeiSearch, setImeiSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [sizeFilter, setSizeFilter] = useState("Todos");

  return {
    imeiSearch,
    setImeiSearch,
    brandFilter,
    setBrandFilter,
    statusFilter,
    setStatusFilter,
    sizeFilter,
    setSizeFilter,
  };
}
