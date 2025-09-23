export const formatImei = (imei: string) => imei.replace(/\D/g, "");
export const formatPrice = (price: number) => {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
export const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString("pt-BR");
};
export default { formatImei, formatPrice, formatDate };
