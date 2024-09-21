import { Teacher } from "@/models/teacher.model";
import { IBaseService, ObjectToForm, ResponseModel } from "./base.service";
import axiosClient from "../axios.client";
import { stringify } from "querystring";

const TeacherService: IBaseService<Teacher> = {
    List: async (query?: {}): Promise<ResponseModel<Teacher>> => {
        const queryString = stringify(query);
        const result = await axiosClient.get(`http://localhost:8000/v1/teachers?${queryString}`);
        return result.data;
    },
    Get: async (id: string): Promise<Teacher> => {
        const result = await axiosClient.get(`http://localhost:8000/v1/teachers/${id}`)
        return result.data
    },
    Update: async (id: string, model: Teacher): Promise<Teacher> => {
        const formData = ObjectToForm(model)
        const result = await axiosClient.put(`http://localhost:8000/v1/teachers/${id}`, formData)
        return result.data
    },
    Create: async (model: Teacher): Promise<Teacher> => {
        const formData = ObjectToForm(model)
        const result = await axiosClient.post(`http://localhost:8000/v1/teachers`, formData)
        return result.data
    }
}

export default TeacherService