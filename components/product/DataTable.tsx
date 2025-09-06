"use client";

import {
  ColumnDef,
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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { useEffect, useState } from "react";
import {
  CategoryInterface,
  PaginatedInterface,
  ProductInterface,
} from "@/lib/interfaces";
import { getAuthCookies } from "@/app/actions";
import {
  deleteProduct,
  getProduct,
  postProduct,
  putProduct,
} from "@/services/api";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductFormType,
  productSchema,
  ProductSchemaInfer,
  updateProductSchema,
} from "@/lib/schema";
import DeleteDialog from "../dialog/DeleteDialog";
import ProductPictureDialog from "../dialog/ProductPictureDialog";
import ProductDialog from "../dialog/ProductDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

interface DataTableProps {
  data: ProductInterface[];
  meta: PaginatedInterface;
  categories: CategoryInterface[];
}

export function DataTable({ data, meta, categories }: DataTableProps) {
  // const [sorting, setSorting] = useState<SortingState>([]);
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // const [rowSelection, setRowSelection] = useState({});
  // const table = useReactTable({
  //   data,
  //   columns: Columns,
  //   onSortingChange: setSorting,
  //   onColumnFiltersChange: setColumnFilters,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   onColumnVisibilityChange: setColumnVisibility,
  //   onRowSelectionChange: setRowSelection,
  //   state: {
  //     sorting,
  //     columnFilters,
  //     columnVisibility,
  //     rowSelection,
  //   },
  // });
  const [dataTable, setDataTable] = useState<ProductInterface[]>(data);
  const [paginated, setPaginated] = useState<PaginatedInterface>(meta);
  const [search, setSearch] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [dialog, setDialog] = useState({
    product: false,
    delete: false,
    edit: false,
    picture: false,
  });
  const [idProduct, setIdProduct] = useState<number>();
  const [images, setImages] = useState<string[]>([]);
  const table = useReactTable({
    data: dataTable,
    columns: Columns({
      onEdit: (product) => {
        setIdProduct(product.id);
        handleDialog("edit");
      },
      onDelete: (product) => {
        setIdProduct(product.id);
        handleDialog("delete");
      },
      onPicture: (images) => {
        setImages(images);
        handleDialog("picture");
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
  const handleDialog = (key: "product" | "delete" | "edit" | "picture") => {
    setDialog((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCloseDialog = () =>
    setDialog({ product: false, delete: false, edit: false, picture: false });
  const fetchData = async () => {
    try {
      const token = await getAuthCookies();
      const response = await getProduct(token!, search, paginated.currentPage);
      setDataTable(response.data.data.data);
      setPaginated(response.data.data.meta);
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm<ProductFormType>({
    resolver: zodResolver(
      dialog.edit ? updateProductSchema : productSchema
    ) as any,
    defaultValues: {
      name: "",
      code: "",
      category_id: 0,
      stock: 0,
      images: [],
    },
  });

  const { setError } = form;
  const onSubmit = async (data: ProductFormType) => {
    try {
      const token = await getAuthCookies();
      await postProduct(token!, data);
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
      await deleteProduct(token!, idProduct!);
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
  const onEdit = async (data: ProductFormType) => {
    try {
      const token = await getAuthCookies();
      await putProduct(token!, idProduct!, data);
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
      const data = dataTable.find((value) => value.id === idProduct);
      if (data) {
        form.setValue("name", data.name);
        form.setValue("code", data.code);
        form.setValue("category_id", data.category.id);
        form.setValue("stock", data.stock);
      }
    }
  }, [dialog.edit]);

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
