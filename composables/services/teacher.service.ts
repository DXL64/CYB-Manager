import { Teacher } from "@/models/teacher.model";
import BaseService from "./base.service";

const TeacherService = BaseService<Teacher>("teachers");

export default TeacherService;
