// pages/students.tsx
'use client'
import TeacherList from "./teacher.list";
import { useEffect, useState } from "react";
import axiosClient from "@/composables/axios.client";
import { Teacher } from "@/models/teacher.model";

const TeachersTable = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetch = () => {
    axiosClient.get('http://localhost:8000/v1/teachers').then((res) => {
      const list: Teacher[] = res.data.results
      setTeachers(list)
    })
  }

  useEffect(() => {
    fetch()
  }, [setTeachers])

  return (
    <div>
      <TeacherList teachers={teachers} searchTerm={searchTerm} setSearchTerm={setSearchTerm} fetch={fetch} />
    </div>
  );
};

export default TeachersTable;
