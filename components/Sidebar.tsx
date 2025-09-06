"use client";

import {
  FileText,
  Grip,
  LayoutDashboard,
  LucideIcon,
  Package,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isSidebarOpen: boolean;
  handleSidebar: () => void;
}

interface MenuItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const menuItems: MenuItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/category", label: "Category", icon: Grip },
  { href: "/product", label: "Produk", icon: Package },
  { href: "/report", label: "Laporan", icon: FileText },
];

export default function Sidebar({
  isSidebarOpen,
  handleSidebar,
}: SidebarProps) {
  const pathname = usePathname();
  const renderMenu = () => (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <h1 className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
        Inventory
      </h1>
      <ul className="mt-6">
        {menuItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={label} className="relative px-6 py-3">
              <Link
                href={href}
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-800 dark:text-gray-100 hover:text-purple-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="ml-4">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <>
      <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
        {renderMenu()}
      </aside>

      <div
        onClick={handleSidebar}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {renderMenu()}
      </aside>
    </>
  );
}
