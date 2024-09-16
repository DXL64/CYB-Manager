import { BarChart2, Database, PersonStanding, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white p-6 hidden md:block space-y-2">
      <Button
        variant="ghost"
        className="w-full justify-start"
      >
        <BarChart2 className="mr-2 h-4 w-4" />
        Overview
      </Button>
      <Link href={"/teachers"}>
        <Button
          variant="ghost"
          className="w-full justify-start"
        >
          <Database className="mr-2 h-4 w-4" />
          Teacher
        </Button>
      </Link>
      <Link href="/students">
        <Button
          variant="ghost"
          className="w-full justify-start"
        >
          <PersonStanding className="mr-2 h-4 w-4" />
          Student
        </Button>
      </Link>
      <Link href="#">
        <Button
          variant="ghost"
          className="w-full justify-start"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </Link>
    </aside>
  );
};

export default Sidebar;
