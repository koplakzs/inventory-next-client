import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { ProductInterface } from "@/lib/interfaces";

export const exportPDF = (data: ProductInterface[]) => {
  const doc = new jsPDF();

  doc.text("Laporan Produk", 14, 10);

  autoTable(doc, {
    head: [["No", "Kode Produk", "Kategori", "Produk", "Stok"]],
    body: data.map((item, index) => [
      index + 1,
      item.code,
      item.category.name,
      item.name,
      item.stock,
    ]),
    startY: 20,
  });

  doc.save("laporan-produk.pdf");
};

export const exportExcel = (data: ProductInterface[]) => {
  const worksheet = XLSX.utils.json_to_sheet(
    data.map((item) => ({
      "Kode Produk": item.code,
      Kategori: item.category.name,
      Produk: item.name,
      Stok: item.stock,
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Produk");

  XLSX.writeFile(workbook, "laporan-produk.xlsx");
};
