import CardDashboard from "@/components/dashboard/CardDashboard";
import { CardItem } from "@/lib/interfaces";
import { Box, Calculator, Grip, LucideIcon } from "lucide-react";
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
const cards: CardItem[] = [
  {
    name: "Total Kategori",
    count: 10,
    icon: Grip,
  },
  {
    name: "Total Produk",
    count: 10,
    icon: Box,
  },
  {
    name: "Total Stok",
    count: 10,
    icon: Calculator,
  },
];
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
export default function Home() {
  return (
    <section>
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Dashboard
      </h2>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((item, index) => (
          <CardDashboard
            key={index}
            count={item.count}
            name={item.name}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="mb-8">
        <h5 className="my-6 text-lg font-semibold text-gray-700 dark:text-gray-200">
          Produk Terakhir
        </h5>
        <div className="w-full overflow-hidden rounded-lg  bg-white shadow">
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
      </div>
    </section>
  );
}
