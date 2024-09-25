import { IBaseService, ObjectToForm, ResponseModel } from "./base.service";
import axiosClient from "../axios.client";
import { stringify } from "querystring";
import { Student } from "@/models/student.model";

const StudentService: IBaseService<Student> = {
    List: async (query?: {}): Promise<ResponseModel<Student>> => {
        const queryString = stringify(query);
        const result = await axiosClient.get(`http://localhost:8080/v1/students?${queryString}`);
        return result.data;
    },
    Get: async (id: string): Promise<Student> => {
        const result = await axiosClient.get(`http://localhost:8080/v1/students/${id}`)
        return result.data
    },
    Update: async (id: string, model: Student): Promise<Student> => {
        const formData = ObjectToForm(model)
        console.log(formData)
        const result = await axiosClient.put(`http://localhost:8080/v1/students/${id}`, formData)
        return result.data
    },
    Create: async (model: Student): Promise<Student> => {
        const formData = ObjectToForm(model)
        const result = await axiosClient.post(`http://localhost:8080/v1/students`, formData)
        return result.data
    }
}

export default StudentService