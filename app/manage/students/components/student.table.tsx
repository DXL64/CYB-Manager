// pages/students.tsx
'use client'
import StudentList from "./student.list";
import { useEffect, useState } from "react";
import { Student } from "@/models/student.model";
import axiosClient from "@/composables/axios.client";

const StudentsTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetch = () => {
    axiosClient.get('http://localhost:8000/v1/students').then((res) => {
      const list: Student[] = res.data.results
      setStudents(list)
    })
  }

  useEffect(() => {
    fetch()
  }, [setStudents])

  return (
    <div>
      <StudentList students={students} searchTerm={searchTerm} setSearchTerm={setSearchTerm} fetch={fetch} />
    </div>
  );
};

export default StudentsTable;
