import { IBaseService, ObjectToForm, ResponseModel } from "./base.service";
import axiosClient from "../axios.client";
import { stringify } from "querystring";
import { Student } from "@/models/student.model";
import config from "@/config/config";

const baseUrl = `http://${config.backend.end_point}:${config.backend.port}/v1`


const StudentService: IBaseService<Student> = {
    List: async (query?: {}): Promise<ResponseModel<Student>> => {
        const queryString = stringify(query);
        const result = await axiosClient.get(`${baseUrl}/students?${queryString}`);
        return result.data;
    },
    Get: async (id: string): Promise<Student> => {
        const result = await axiosClient.get(`${baseUrl}/students/${id}`)
        return result.data
    },
    Update: async (id: string, model: Student): Promise<Student> => {
        const formData = ObjectToForm(model)
        console.log(formData)
        const result = await axiosClient.put(`${baseUrl}/students/${id}`, formData)
        return result.data
    },
    Create: async (model: Student): Promise<Student> => {
        const formData = ObjectToForm(model)
        const result = await axiosClient.post(`${baseUrl}/students`, formData)
        return result.data
    }
}

export default StudentService