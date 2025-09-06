"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, LoginSchemaInfer } from "@/lib/schema";
import { setAuthCookies } from "@/app/actions";
import { useRouter } from "next/navigation";
import { postLogin } from "@/services/api";

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginSchemaInfer>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = form;
  const onSubmit = async (data: LoginSchemaInfer) => {
    try {
      const res = await postLogin(data);
      const { user, token } = res.data.data!;
      await setAuthCookies(token, user);
      router.push("/");
    } catch (error: any) {
      const message =
        error.response.data.message ?? "Terjadi kesalahan. Silakan coba lagi.";
      setError("root", {
        type: "server",
        message,
      });
    }
  };
  return (
    <div className="w-full max-w-sm mx-auto p-6 ">
      <h1 className="mb-6 text-2xl font-bold text-center text-primary">
        Login
      </h1>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="***************"
                    {...field}
                  />
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
          {/* Submit button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
