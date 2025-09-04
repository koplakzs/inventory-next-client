"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleSidebar={() => setIsSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 w-full">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="h-full overflow-y-auto p-6">
          <div className="container md:px-6 mx-auto grid">{children}</div>
        </main>
      </div>
    </div>
  );
}
