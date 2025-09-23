    import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export async function generateDevicePDF(devices: any[]) {
  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: sans-serif; padding: 16px; }
          h1 { color: #0D6E6D; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 12px; }
          th { background-color: #f0f0f0; }
        </style>
      </head>
      <body>
        <h1>Relatório de Dispositivos</h1>
        <table>
          <thead>
            <tr>
              <th>IMEI</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Status</th>
              <th>Cor</th>
              <th>Tamanho</th>
            </tr>
          </thead>
          <tbody>
            ${devices
              .map(
                (d) => `
              <tr>
                <td>${d.imei}</td>
                <td>${d.brand}</td>
                <td>${d.model}</td>
                <td>${d.status}</td>
                <td>${d.color}</td>
                <td>${d.size}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;
  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri, { mimeType: "application/pdf" });
}
