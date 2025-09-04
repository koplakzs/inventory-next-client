import { DataTable } from "@/components/category/DataTable";

export default function Product() {
  return (
    <section>
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Product
      </h2>
      <div className="bg-white p-4 rounded-2xl shadow">
        <DataTable />
      </div>
    </section>
  );
}
