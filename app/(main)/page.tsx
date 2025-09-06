import CardDashboard from "@/components/dashboard/CardDashboard";
import { CardItem } from "@/lib/interfaces";
import { Box, Calculator, Grip } from "lucide-react";

import { getAuthCookies } from "../actions";
import { getDashboard } from "@/services/api";
import { ChartBar } from "@/components/dashboard/ChartBar";
import TableProduct from "@/components/dashboard/TableProduct";

async function DashboardData() {
  const token = await getAuthCookies();

  const response = await getDashboard(token!);
  return response.data.data;
}

export default async function Home() {
  const data = await DashboardData();

  const cards: CardItem[] = [
    {
      name: "Total Kategori",
      count: data?.countCategories ?? 0,
      icon: Grip,
    },
    {
      name: "Total Produk",
      count: data.countProducts ?? 0,
      icon: Box,
    },
    {
      name: "Total Stok",
      count: data.countStocks ?? 0,
      icon: Calculator,
    },
  ];
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
            <TableProduct products={data.products} />
          </div>
        </div>
      </div>
      <section className="mb-8">
        <h2 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-200">
          Grafik Total Produk
        </h2>

        <div className="w-full overflow-hidden p-5 rounded-lg bg-white shadow">
          <ChartBar chartData={data.monthlyProduct} />
        </div>
      </section>
    </section>
  );
}
