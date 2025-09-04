"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const FormSearch = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ startDate, endDate });
    // TODO: trigger filter / fetch data berdasarkan tanggal
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-4 p-4 "
    >
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Tanggal Mulai</label>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-48"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Tanggal Akhir</label>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-48"
        />
      </div>

      <Button type="submit">Cari</Button>
      <Button variant={"destructive"}>Download PDF</Button>
      <Button>Download Excel</Button>
    </form>
  );
};

export default FormSearch;
