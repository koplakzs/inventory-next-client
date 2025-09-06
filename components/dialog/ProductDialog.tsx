import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UseFormReturn } from "react-hook-form";
import { ProductSchemaInfer, UpdateProductSchemaInfer } from "@/lib/schema";
import { CategoryInterface } from "@/lib/interfaces";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductDialogProps {
  isOpen: boolean;
  handleDialog: () => void;
  form: UseFormReturn<ProductSchemaInfer | UpdateProductSchemaInfer>;
  onSubmit: (
    data: ProductSchemaInfer | UpdateProductSchemaInfer
  ) => Promise<void>;
  categories: CategoryInterface[];
  isEdit?: boolean;
}

const ProductDialog = ({
  handleDialog,
  isOpen,
  form,
  onSubmit,
  isEdit = false,
  categories,
}: ProductDialogProps) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  return (
    <Dialog open={isOpen} onOpenChange={handleDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> {isEdit ? "Edit" : "Tambah"} Produk</DialogTitle>
          <DialogDescription>
            {isEdit ? "Edit" : "Tambah"} Produk inventory
          </DialogDescription>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Produk</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama produk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Kategori</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={isEdit ? field.value.toString() : ""}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih kategori produk" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((item, index) => (
                          <SelectItem key={index} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode Produk</FormLabel>
                    <FormControl>
                      <Input placeholder="Kode produk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stok Produk</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="stok produk"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto Produk</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = e.target.files
                            ? Array.from(e.target.files)
                            : [];
                          field.onChange(files);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Unggah minimal 3 gambar produk (format JPG, PNG, atau
                      JPEG).
                    </FormDescription>{" "}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {errors.root && (
                <p className="text-sm text-red-500 text-center">
                  {errors.root.message}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Simpan"}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
