"use client";

import { flexRender } from "@tanstack/react-table";
import { ChevronDown, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  CategoryInterface,
  PaginatedInterface,
  ProductInterface,
} from "@/lib/interfaces";

import DeleteDialog from "../dialog/DeleteDialog";
import ProductPictureDialog from "../dialog/ProductPictureDialog";
import ProductDialog from "../dialog/ProductDialog";

import useDataTable from "@/features/product/useDataTable";

interface DataTableProps {
  data: ProductInterface[];
  meta: PaginatedInterface;
  categories: CategoryInterface[];
}

export function DataTable({ data, meta, categories }: DataTableProps) {
  const {
    dialog,
    form,
    handleDialog,
    onDelete,
    onEdit,
    images,
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
          placeholder="Cari kode atau nama produk..."
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
        <div className="ml-auto lg:ml-0 space-x-5">
          <Button onClick={() => handleDialog("product")}>
            Tambah Data
            <Plus />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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

      <ProductDialog
        isOpen={dialog.product}
        handleDialog={() => handleDialog("product")}
        form={form}
        onSubmit={onSubmit}
        categories={categories}
      />
      <ProductDialog
        isOpen={dialog.edit}
        handleDialog={() => handleDialog("edit")}
        form={form}
        onSubmit={onEdit}
        categories={categories}
        isEdit
      />

      <DeleteDialog
        isOpen={dialog.delete}
        handleDialog={() => handleDialog("delete")}
        handleDelete={onDelete}
      />
      <ProductPictureDialog
        isOpen={dialog.picture}
        handleDialog={() => handleDialog("picture")}
        images={images}
      />
    </div>
  );
}
