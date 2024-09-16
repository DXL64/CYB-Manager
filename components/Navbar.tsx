"use client";

import { Book, Edit, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../lib/utils";
import { usePathname } from "next/navigation";

const routes = [
  {
    name: "Trang chủ",
    href: "/",
    icon: <Home className="size-4" />,
  },
  {
    name: "Chỉnh sửa thông tin",
    href: "/manage",
    icon: <Edit className="size-4" />,
  },
  {
    name: "Hướng dẫn",
    href: "/docs",
    icon: <Book className="size-4" />,
  },
];

const Navbar = () => {
  const path = usePathname();

  return (
    <nav className={cn("fixed top-0 left-0 right-0 bg-white", "flex px-8 py-1 border justify-between items-center")}>
      {/* NextJS nen dung Link de routing toi uu hon */}
      <Link
        href="/"
        className="p-2"
      >
        {/* NextJS nen dung Image nay de co cacheing */}
        <Image
          src={"/assets/logo-cyb.jpg"}
          alt="logo"
          className="size-10"
          width={64}
          height={64}
        />
      </Link>
      <div className="flex gap-4">
        {routes.map((route, index) => {
          return (
            <Link
              key={index}
              href={route.href}
              className={cn(
                "hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded flex items-center gap-2 text-sm",
                (route.href === path || (path !== "/" && route.href.includes(path))) && "bg-accent text-accent-foreground"
              )}
            >
              <span>{route.icon}</span>
              {route.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
