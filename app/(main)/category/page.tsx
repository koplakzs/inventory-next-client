import { getAuthCookies } from "@/app/actions";
import { DataTable } from "@/components/category/DataTable";
import { getCategory } from "@/services/api";

async function CategoryData() {
  const token = await getAuthCookies();

  const response = await getCategory(token!);
  return response.data.data;
}

export default async function Category() {
  const data = await CategoryData();
  return (
    <section>
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Category
      </h2>
      <div className="bg-white p-4 rounded-2xl shadow">
        <DataTable data={data.data} meta={data.meta} />
      </div>
    </section>
  );
}
