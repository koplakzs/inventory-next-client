import React from "react";

const LoginForm = () => {
  return (
    <div className="w-full">
      <h1 className="mb-4 text-xl font-semibold text-orange-700 dark:text-gray-200">
        Login
      </h1>
      <label className="block text-sm">
        <span className="text-gray-700 dark:text-gray-400">Email</span>
        <input
          className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          placeholder="Jane Doe"
        />
      </label>
      <label className="block mt-4 text-sm">
        <span className="text-gray-700 dark:text-gray-400">Password</span>
        <input
          className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          placeholder="***************"
          type="password"
        />
      </label>

      <a
        className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        href="../index.html"
      >
        Log in
      </a>
    </div>
  );
};

export default LoginForm;
