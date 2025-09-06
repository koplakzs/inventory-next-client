"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { reportSchema, ReportSchemaInfer } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getReport } from "@/services/api";
import { getAuthCookies } from "@/app/actions";
import { ProductInterface } from "@/lib/interfaces";
import TableReport from "./TableReport";

const ReportResult = () => {
  const [data, setData] = useState<ProductInterface[]>([]);
  const form = useForm<ReportSchemaInfer>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      end: "",
      start: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = form;
  const onSubmit = async (data: ReportSchemaInfer) => {
    try {
      const token = await getAuthCookies();
      const response = await getReport(token!, data.start, data.end);
      setData(response.data.data);
    } catch (error: any) {
      const message =
        error.response.data.message ?? "Terjadi kesalahan. Silakan coba lagi.";
      setError("root", {
        type: "server",
        message,
      });
    }
  };
  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex gap-7 items-center justify-start"
        >
          <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
              <FormItem className="w-52 lg:w-sm">
                <FormLabel>Tanggal Mulai</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end"
            render={({ field }) => (
              <FormItem className="w-52 lg:w-sm">
                <FormLabel>Tanggal Akhir</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errors.root && (
            <p className="text-sm text-red-500 text-center">
              {errors.root.message}
            </p>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Buat Laporan"}
          </Button>
        </form>
      </Form>
      {data.length === 0 ? (
        <div className="w-full text-center my-10">
          <p>Laporan belum dibuat</p>
        </div>
      ) : (
        <TableReport data={data} />
      )}
    </section>
  );
};

export default ReportResult;
