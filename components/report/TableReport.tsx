import React from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ProductInterface } from "@/lib/interfaces";
import { exportExcel, exportPDF } from "@/lib/exportReport";

interface TableReportProps {
  data: ProductInterface[];
}

const TableReport = ({ data }: TableReportProps) => {
  return (
    <div className="w-full overflow-x-auto p-4 ">
      <div className=" mb-3 w-full flex justify-end gap-5">
        <Button variant={"destructive"} onClick={() => exportPDF(data)}>
          Download PDF
        </Button>
        <Button onClick={() => exportExcel(data)}>Download Excel</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2 font-medium text-base">
              No
            </TableHead>
            <TableHead className="px-4 py-2 font-medium text-base">
              Kode Produk
            </TableHead>
            <TableHead className="px-4 py-2 font-medium text-base">
              Kategori
            </TableHead>
            <TableHead className="px-4 py-2 font-medium text-base">
              Produk
            </TableHead>
            <TableHead className="px-4 py-2 font-medium text-base text-right">
              Stok
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((data, index) => (
            <TableRow key={data.id}>
              <TableCell className="px-4 py-2 font-medium">
                {index + 1}
              </TableCell>
              <TableCell className="px-4 py-2 font-medium">
                {data.code}
              </TableCell>
              <TableCell className="px-4 py-2">{data.category.name}</TableCell>
              <TableCell className="px-4 py-2">{data.name}</TableCell>
              <TableCell className="px-4 py-2 text-right">
                {data.stock}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableReport;
