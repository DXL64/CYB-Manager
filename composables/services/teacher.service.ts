import { Teacher } from "@/models/teacher.model";
import { IBaseService, ObjectToForm, ResponseModel } from "./base.service";
import axiosClient from "../axios.client";
import { stringify } from "querystring";
import config from "@/config/config";

const baseUrl = `http://${config.backend.end_point}:${config.backend.port}/v1`

const TeacherService: IBaseService<Teacher> = {
    List: async (query?: {}): Promise<ResponseModel<Teacher>> => {
        const queryString = stringify(query);
        const result = await axiosClient.get(`${baseUrl}/teachers?${queryString}`);
        return result.data;
    },
    Get: async (id: string): Promise<Teacher> => {
        const result = await axiosClient.get(`${baseUrl}/teachers/${id}`)
        return result.data
    },
    Update: async (id: string, model: Teacher): Promise<Teacher> => {
        const formData = ObjectToForm(model)
        const result = await axiosClient.put(`${baseUrl}/teachers/${id}`, formData)
        return result.data
    },
    Create: async (model: Teacher): Promise<Teacher> => {
        const formData = ObjectToForm(model)
        const result = await axiosClient.post(`${baseUrl}/teachers`, formData)
        return result.data
    }
}

export default TeacherService