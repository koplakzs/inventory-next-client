"use client";

import { AlignJustify } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import api from "@/lib/axios";
import { deleteAuthCookies, getAuthCookies } from "@/app/actions";
import { useRouter } from "next/navigation";
import { postLogout } from "@/services/api";

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const router = useRouter();

  const logout = async () => {
    const token = await getAuthCookies();
    await postLogout(token!);

    await deleteAuthCookies();
    router.push("/");
  };
  return (
    <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
      <div className="container flex items-center justify-between px-6  text-purple-600 dark:text-purple-300">
        {/* Mobile Hamburger */}
        <Button
          onClick={toggleSidebar}
          className="p-1  rounded-md md:hidden hover:cursor-pointer bg-purple-600 hover:bg-purple-700"
        >
          <AlignJustify />
        </Button>

        {/* Search Input */}
        <div className="flex-1 max-w-xl mx-6">
          <p className="font-bold">Inventory App</p>
        </div>
        <Menubar className="border-0 shadow-none bg-transparent">
          <MenubarMenu>
            <MenubarTrigger className="border-no">
              <Avatar className="hover:cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </MenubarTrigger>

            <MenubarContent className="me-5">
              <MenubarItem onClick={logout}>Logout</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </header>
  );
}
