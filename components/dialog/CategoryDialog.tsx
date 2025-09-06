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
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UseFormReturn } from "react-hook-form";
import { CategorySchemaInfer } from "@/lib/schema";

interface CategoryDialogProps {
  isOpen: boolean;
  handleDialog: () => void;
  form: UseFormReturn<CategorySchemaInfer>;
  onSubmit: (data: CategorySchemaInfer) => Promise<void>;
  isEdit?: boolean;
}

const CategoryDialog = ({
  handleDialog,
  isOpen,
  form,
  onSubmit,
  isEdit = false,
}: CategoryDialogProps) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  return (
    <Dialog open={isOpen} onOpenChange={handleDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> {isEdit ? "Edit" : "Tambah"} Kategori</DialogTitle>
          <DialogDescription>
            {isEdit ? "Edit" : "Tambah"} kategori produk inventory
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Kategori</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama kategori" {...field} />
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

export default CategoryDialog;
