import { deleteAuthCookies, getAuthCookies } from "@/app/actions";
import { DataTable } from "@/components/product/DataTable";
import { getAllCategory, getCategory, getProduct } from "@/services/api";

async function ProductData() {
  const token = await getAuthCookies();
  if (!token) {
    await deleteAuthCookies();
  }
  const responseProduct = await getProduct(token!);
  const responseCategory = await getAllCategory(token!);
  return {
    dataProduct: responseProduct.data.data,
    dataCategory: responseCategory.data.data,
  };
}

export default async function Product() {
  const { dataProduct, dataCategory } = await ProductData();
  return (
    <section>
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Product
      </h2>
      <div className="bg-white p-4 rounded-2xl shadow">
        <DataTable
          data={dataProduct.data}
          meta={dataProduct.meta}
          categories={dataCategory}
        />
      </div>
    </section>
  );
}
