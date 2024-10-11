import BaseService from "./base.service";
import { Student } from "@/models/student.model";

const StudentService = BaseService<Student>("students")

export default StudentService;
