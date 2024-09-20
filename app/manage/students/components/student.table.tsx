// pages/students.tsx
'use client'
import StudentList from "./student.list";
import { useEffect, useState } from "react";
import { Student } from "@/models/student.model";
import axiosClient from "@/composables/axios.client";

const StudentsTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    // setStudents([
    //   {
    //     id: 1,
    //     name: "Jssa Jas",
    //     email: "@email.com",
    //     phone: "+84123456789",
    //     imgSrc: "http://127.0.0.1:9000/images/student/6ac52a8bb3de326c21361218a9c31d9e.jpg",
    //     schoolYear: "k28",
    //     major: "Ly",
    //     dob: "2021-06-06",
    //     gender: "female",
    //     active: true,
    //   },
    //   {
    //     id: 2,
    //     name: "Pauline Jas",
    //     email: "@email.com",
    //     phone: "+84123456789",
    //     imgSrc: "",
    //     schoolYear: "k28",
    //     major: "Ly",
    //     dob: "26 Jan 2021",
    //     gender: "female",
    //     active: false,
    //   },
    //   {
    //     id: 3,
    //     name: "Thedric Romans",
    //     email: "@email.com",
    //     phone: "+84123456789",
    //     imgSrc: "",
    //     schoolYear: "k28",
    //     major: "Ly",
    //     dob: "12 Jan 2019",
    //     gender: "female",
    //     active: false,
    //   },
    //   {
    //     id: 4,
    //     name: "Haily Carthew",
    //     email: "@email.com",
    //     phone: "+84123456789",
    //     imgSrc: "",
    //     schoolYear: "k28",
    //     major: "Ly",
    //     dob: "27 Jan 2018",
    //     gender: "female",
    //     active: true,
    //   },
    //   {
    //     id: 5,
    //     name: "Dorothea Joicey",
    //     email: "@email.com",
    //     phone: "+84123456789",
    //     imgSrc: "",
    //     schoolYear: "k28",
    //     major: "Ly",
    //     dob: "12 Dec 2017",
    //     gender: "female",
    //     active: true,
    //   },
    // ])
    axiosClient.get('http://localhost:8000/v1/students').then((res) => {
      const list: Student[] = res.data.results
      setStudents(list)
    })
  },[setStudents])

  return (
    <div>
      <StudentList students={students} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
};

export default StudentsTable;
