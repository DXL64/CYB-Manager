import React from "react";
import Sidebar from "../../components/Sidebar";

export default function ManageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-6 h-full relative w-full ">
      <Sidebar />
      <div className="bg-white rounded-lg flex flex-col p-6 w-full overflow-hidden">{children}</div>
    </div>
  );
}
