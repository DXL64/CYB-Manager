import React from "react";
import Sidebar from "../../components/Sidebar";

export default function ManageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-6 h-full relative">
      <Sidebar />
      <div className="bg-white rounded-lg flex-1 p-6">{children}</div>
    </div>
  );
}
