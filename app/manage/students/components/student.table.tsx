// pages/students.tsx
'use client'
import StudentList from "./student.list";
import { useEffect, useState } from "react";
import { Student } from "@/models/student.model";
import { StudentService } from "@/composables/services";

const StudentsTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetch = async () => {
    await StudentService.List().then(ls => {
      setStudents(ls.results)
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
