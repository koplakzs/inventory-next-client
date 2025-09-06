import { getAuthCookies } from "@/app/actions";
import { Columns } from "@/components/category/Columns";
import { CategoryInterface, PaginatedInterface } from "@/lib/interfaces";
import { categorySchema, CategorySchemaInfer } from "@/lib/schema";
import {
  deleteCategory,
  getCategory,
  postCategory,
  putCategory,
} from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
interface UseDataTableProps {
  data: CategoryInterface[];
  meta: PaginatedInterface;
}
const useDataTable = ({ data, meta }: UseDataTableProps) => {
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
        setIdCategory(category.id);
        handleDialog("edit");
      },
      onDelete: (category) => {
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
  return {
    table,
    search,
    setSearch,
    setPaginated,
    handleDialog,
    paginated,
    dialog,
    form,
    onEdit,
    onSubmit,
    onDelete,
  };
};

export default useDataTable;
