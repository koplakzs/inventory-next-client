import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductInterface } from "@/lib/interfaces";

interface TableProductProps {
  products: ProductInterface[];
}

const TableProduct = ({ products }: TableProductProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
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
        {products.map((data) => (
          <TableRow key={data.id}>
            <TableCell className="px-4 py-2 font-medium">{data.code}</TableCell>
            <TableCell className="px-4 py-2">{data.category.name}</TableCell>
            <TableCell className="px-4 py-2">{data.name}</TableCell>
            <TableCell className="px-4 py-2 text-right">{data.stock}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableProduct;
