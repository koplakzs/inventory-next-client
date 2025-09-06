"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MonthlyProductInterface } from "@/lib/interfaces";

const chartConfig = {
  month: {
    label: "Month",
    color: "oklch(0.541 0.281 293.009)",
  },
  countProduct: {
    label: "Total Product",
    color: "oklch(0.7 0.25 145)",
  },
} satisfies ChartConfig;

interface ChartBarProps {
  chartData: MonthlyProductInterface[];
}

export function ChartBar({ chartData }: ChartBarProps) {
  return (
    <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="countProduct" fill="var(--color-month)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
