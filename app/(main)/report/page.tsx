import FormSearch from "@/components/report/FormSearch";
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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
export default function Report() {
  return (
    <section>
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Report Product
      </h2>
      <div className="bg-white p-4 rounded-2xl shadow">
        <FormSearch />
        <div className="w-full overflow-x-auto p-4 ">
          <Table className="">
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
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="px-4 py-2 font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {invoice.paymentStatus}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {invoice.paymentMethod}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
