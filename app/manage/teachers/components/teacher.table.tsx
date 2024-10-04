// pages/students.tsx
'use client'
import TeacherList from "./teacher.list";
import { useEffect, useState } from "react";
import { Teacher } from "@/models/teacher.model";
import { TeacherService } from "@/composables/services";

const TeachersTable = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetch = () => {
    TeacherService.List().then(ls => {
      setTeachers(ls.results)
    })
  }

  useEffect(() => {
    fetch()
  }, [setTeachers])

  return (
    <>
      <TeacherList teachers={teachers} searchTerm={searchTerm} setSearchTerm={setSearchTerm} fetch={fetch} />
    </>
  );
};

export default TeachersTable;
