import Image from "next/image";
import Link from "next/link";
import { cn } from "../lib/utils";

const routes = [
  {
    name: "Trang chủ",
    href: "/  ",
  },
  {
    name: "Chỉnh sửa thông tin",
    href: "/teachers",
  },
  {
    name: "Hướng dẫn",
    href: "/docs",
  },
];

const Navbar = () => {
  return (
    <nav className={cn("fixed top-0 left-0 right-0 bg-white", "flex px-8 py-1 border justify-between items-center")}>
      {/* NextJS nen dung Link de routing toi uu hon */}
      <Link
        href="/"
        className="p-2"
      >
        {/* NextJS nen dung Image nay de co cacheing */}
        <Image
          src="/assets/logo-cyb.jpg"
          alt="logo"
          className="size-10"
          width={64}
          height={64}
        />
      </Link>
      <div className="flex gap-x-10">
        {routes.map((route, index) => {
          return (
            <a
              href={route.href}
              className="hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded"
              key={index}
            >
              {route.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
