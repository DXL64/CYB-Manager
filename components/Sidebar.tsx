"use client";

import { BarChart2, BrickWall, Database, File, PersonStanding, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const navItem = [
  {
    name: "Tổng quan",
    href: "",
    icon: <BarChart2 className="size-4" />,
  },
  {
    name: "Giáo viên",
    href: "/teachers",
    icon: <Database className="size-4" />,
  },
  {
    name: "Học sinh",
    href: "/students",
    icon: <PersonStanding className="size-4" />,
  },
  {
    name: "Cài đặt",
    href: "",
    icon: <Settings className="size-4" />,
  },
  {
    name: "Tường",
    href: "/wallpapers",
    icon: <BrickWall className="size-4" />,
  },
  {
    name: "Bài viết",
    href: "/posts",
    icon: <File className="size-4" />,
  },
  {
    name: "User",
    href: "/users",
    icon: <File className="size-4" />,
  },
];

const Sidebar = () => {
  const path = usePathname();

  return (
    <aside className="w-64 bg-white p-4 hidden md:flex flex-col gap-2 h-full sticky rounded-lg">
      {navItem.map((item, index) => (
        <Link
          key={index}
          href={"/manage" + item.href}
        >
          <Button
            variant={item.href === path.slice(7) ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <span className="mr-2">{item.icon}</span>
            {item.name}
          </Button>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
