"use client";

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
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
import { useEffect, useState } from "react";
import { CategoryInterface, PaginatedInterface } from "@/lib/interfaces";
import {
  deleteCategory,
  getCategory,
  postCategory,
  putCategory,
} from "@/services/api";
import { getAuthCookies } from "@/app/actions";
import CategoryDialog from "../dialog/CategoryDialog";
import { useForm } from "react-hook-form";
import { categorySchema, CategorySchemaInfer } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import DeleteDialog from "../dialog/DeleteDialog";

interface DataTableProps {
  data: CategoryInterface[];
  meta: PaginatedInterface;
}

export function DataTable({ data, meta }: DataTableProps) {
  const [dataTable, setDataTable] = useState<CategoryInterface[]>(data);
  const [paginated, setPaginated] = useState<PaginatedInterface>(meta);
  const [search, setSearch] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [dialog, setDialog] = useState({
    category: false,
    delete: false,
    edit: false,
  });
  const [idCategory, setIdCategory] = useState<number>();
  const table = useReactTable({
    data: dataTable,
    columns: Columns({
      onEdit: (category) => {
        // setSelectedCategory(category);
        setIdCategory(category.id);
        handleDialog("edit");
      },
      onDelete: (category) => {
        // setSelectedDeleteId(category.id);
        setIdCategory(category.id);
        handleDialog("delete");
      },
    }),
    manualPagination: true,
    pageCount: meta.lastPage,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const handleDialog = (key: "category" | "delete" | "edit") => {
    setDialog((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCloseDialog = () =>
    setDialog({ category: false, delete: false, edit: false });
  const fetchData = async () => {
    try {
      const token = await getAuthCookies();
      const response = await getCategory(token!, search, paginated.currentPage);
      setDataTable(response.data.data.data);
      setPaginated(response.data.data.meta);
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm<CategorySchemaInfer>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const { setError } = form;
  const onSubmit = async (data: CategorySchemaInfer) => {
    try {
      const token = await getAuthCookies();
      await postCategory(token!, data);
      await fetchData();
      handleCloseDialog();
      form.reset();
    } catch (error: any) {
      const message =
        error.response.data.message ?? "Terjadi kesalahan. Silakan coba lagi.";
      setError("root", {
        type: "server",
        message,
      });
    }
  };
  const onDelete = async () => {
    try {
      const token = await getAuthCookies();
      await deleteCategory(token!, idCategory!);
      await fetchData();
      handleCloseDialog();
      form.reset();
    } catch (error: any) {
      const message =
        error.response.data.message ?? "Terjadi kesalahan. Silakan coba lagi.";
      setError("root", {
        type: "server",
        message,
      });
    }
  };
  const onEdit = async (data: CategorySchemaInfer) => {
    try {
      const token = await getAuthCookies();
      await putCategory(token!, idCategory!, data);
      await fetchData();
      handleCloseDialog();
      form.reset();
    } catch (error: any) {
      const message =
        error.response.data.message ?? "Terjadi kesalahan. Silakan coba lagi.";
      setError("root", {
        type: "server",
        message,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, paginated.currentPage]);

  useEffect(() => {
    if (!dialog.edit) {
      form.reset();
    } else {
      const data = dataTable.find((value) => value.id === idCategory);

      form.setValue("name", data?.name!);
    }
  }, [dialog.edit]);

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
