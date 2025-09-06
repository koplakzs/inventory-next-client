import { getAuthCookies } from "@/app/actions";
import { Columns } from "@/components/product/Columns";
import { PaginatedInterface, ProductInterface } from "@/lib/interfaces";
import {
  ProductFormType,
  productSchema,
  updateProductSchema,
} from "@/lib/schema";
import {
  deleteProduct,
  getProduct,
  postProduct,
  putProduct,
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
  data: ProductInterface[];
  meta: PaginatedInterface;
  //   categories: CategoryInterface[];
}

const useDataTable = ({ data, meta }: UseDataTableProps) => {
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
    images,
  };
};

export default useDataTable;
