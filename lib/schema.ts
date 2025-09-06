import z from "zod";
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export const loginSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Kategori tidak boleh kosong"),
});

export const productSchema = z.object({
  name: z.string().min(1, "Nama produk tidak boleh kosong"),
  code: z.string().min(1, "Kode produk tidak boleh kosong"),
  category_id: z.number().min(0, "Kategori produk tidak boleh kosong"),
  stock: z.transform(Number).pipe(z.number()),
  images: z.preprocess(
    (val) => (val instanceof FileList ? Array.from(val) : val),
    z
      .array(
        z
          .instanceof(File)
          .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: "Tipe file tidak didukung",
          })
          .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "Ukuran file maksimal 5MB",
          })
      )
      .min(3, "Minimal 3 gambar harus diunggah")
      .max(10, "Maksimal 10 gambar")
  ),
});
export const updateProductSchema = productSchema.extend({
  images: z
    .preprocess(
      (val) => (val instanceof FileList ? Array.from(val) : val),
      z
        .array(
          z
            .instanceof(File)
            .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
              message: "Tipe file tidak didukung",
            })
            .refine((file) => file.size <= MAX_FILE_SIZE, {
              message: "Ukuran file maksimal 5MB",
            })
        )
        .max(10, "Maksimal 10 gambar")
    )
    .optional(),
});

export const reportSchema = z.object({
  start: z.string().min(1, "Tanggal mulai tidak boleh kosong"),
  end: z.string().min(1, "Tanggal akhir tidak boleh kosong"),
});

export type LoginSchemaInfer = z.infer<typeof loginSchema>;
export type CategorySchemaInfer = z.infer<typeof categorySchema>;
export type ProductSchemaInfer = z.infer<typeof productSchema>;
export type UpdateProductSchemaInfer = z.infer<typeof updateProductSchema>;
export type ProductFormType = ProductSchemaInfer | UpdateProductSchemaInfer;
export type ReportSchemaInfer = z.infer<typeof reportSchema>;
