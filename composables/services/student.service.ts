import { IBaseService, ObjectToForm, ResponseModel } from "./base.service";
import axiosClient from "../axios.client";
import { stringify } from "querystring";
import { Student } from "@/models/student.model";
import config from "@/config/config";

const baseUrl = `${config.backend.end_point}/v1`;

const StudentService: IBaseService<Student> = {
  List: async (query): Promise<ResponseModel<Student>> => {
    let path = `${baseUrl}/students`;
    if (query) {
      const queryString = stringify(query);
      path = `${baseUrl}/students?${queryString}`;
    }
    const result = await axiosClient.get(path, {
      params: {
        limit: 1000,
      },
    });
    return result.data;
  },
  Get: async (id: string): Promise<Student> => {
    const result = await axiosClient.get(`${baseUrl}/students/${id}`);
    return result.data;
  },
  Update: async (id: string, model: Student): Promise<Student> => {
    const formData = ObjectToForm(model);
    console.log(formData);
    const result = await axiosClient.put(`${baseUrl}/students/${id}`, formData);
    return result.data;
  },
  Create: async (model: Student): Promise<Student> => {
    const formData = ObjectToForm(model);
    const result = await axiosClient.post(`${baseUrl}/students`, formData);
    return result.data;
  },
  Delete: async (id: string): Promise<object> => {
    const result = await axiosClient.delete(`${baseUrl}/students/${id}`)
    return result
  }
};

export default StudentService;
