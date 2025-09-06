"use client";

import { flexRender } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Columns } from "./Columns";
import { CategoryInterface, PaginatedInterface } from "@/lib/interfaces";

import CategoryDialog from "../dialog/CategoryDialog";
import DeleteDialog from "../dialog/DeleteDialog";
import useDataTable from "@/features/category/useDataTable";

interface DataTableProps {
  data: CategoryInterface[];
  meta: PaginatedInterface;
}

export function DataTable({ data, meta }: DataTableProps) {
  const {
    dialog,
    form,
    handleDialog,
    onDelete,
    onEdit,
    onSubmit,
    paginated,
    search,
    setPaginated,
    setSearch,
    table,
  } = useDataTable({ data, meta });
  return (
    <div className="w-full ">
      <div className="flex items-center flex-wrap gap-4 justify-between py-4">
        <Input
          placeholder="Cari nama kategori..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPaginated((prev) => ({
              ...prev,
              currentPage: 1,
            }));
          }}
          className="w-full lg:max-w-sm"
        />
        <Button
          onClick={() => handleDialog("category")}
          className="ml-auto lg:ml-0"
        >
          Tambah Data
          <Plus />
        </Button>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={Columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <p className="text-sm text-gray-600">
          Page {paginated.currentPage} of {paginated.lastPage} — Total{" "}
          {paginated.total} items
        </p>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPaginated((prev) => ({
                ...prev,
                currentPage: prev.currentPage - 1,
              }))
            }
            disabled={paginated.currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPaginated((prev) => ({
                ...prev,
                currentPage: prev.currentPage + 1,
              }))
            }
            disabled={paginated.currentPage === paginated.lastPage}
          >
            Next
          </Button>
        </div>
      </div>

      <CategoryDialog
        isOpen={dialog.category}
        handleDialog={() => handleDialog("category")}
        form={form}
        onSubmit={onSubmit}
      />
      <CategoryDialog
        isOpen={dialog.edit}
        handleDialog={() => handleDialog("edit")}
        form={form}
        onSubmit={onEdit}
        isEdit
      />
      <DeleteDialog
        isOpen={dialog.delete}
        handleDialog={() => handleDialog("delete")}
        handleDelete={onDelete}
      />
    </div>
  );
}
