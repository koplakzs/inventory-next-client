import z from "zod";

export const loginSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Kategori tidak boleh kosong"),
});

export type LoginSchemaInfer = z.infer<typeof loginSchema>;
export type CategorySchemaInfer = z.infer<typeof categorySchema>;
