import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";

export default function Auth() {
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <Image
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="/assets/login-office.jpeg"
              alt="Office"
              width={500}
              height={500}
            />
            <Image
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src="/assets/login-office-dark.jpeg"
              alt="Office"
              width={500}
              height={500}
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
