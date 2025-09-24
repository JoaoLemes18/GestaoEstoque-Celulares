import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#16A34A" }} // Verde
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
      }}
      text2Style={{
        fontSize: 14,
        color: "#374151",
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#DC2626" }} // Vermelho
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
      }}
      text2Style={{
        fontSize: 14,
        color: "#374151",
      }}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#2563EB" }} // Azul
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
      }}
      text2Style={{
        fontSize: 14,
        color: "#374151",
      }}
    />
  ),
};
