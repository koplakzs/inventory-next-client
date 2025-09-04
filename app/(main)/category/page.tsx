import { DataTable } from "@/components/category/DataTable";
import { ColumnDef } from "@tanstack/react-table";
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
];
export default function Category() {
  return (
    <section>
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Category
      </h2>
      <div className="bg-white p-4 rounded-2xl shadow">
        <DataTable />
      </div>
    </section>
  );
}
