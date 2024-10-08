import { IBaseService, ObjectToForm, ResponseModel, utf8ToBase64 } from "./base.service";
import axiosClient from "../axios.client";
import { stringify } from "querystring";
import config from "@/config/config";
import { Post } from "@/models/post.model";

const baseUrl = `${config.backend.end_point}/v1`;
const prefix = `posts`

const PostService: IBaseService<Post> = {
  List: async (query): Promise<ResponseModel<Post>> => {
    let path = `${baseUrl}/${prefix}`;
    if (query) {
      const queryString = stringify(query);
      path = `${baseUrl}/${prefix}?${queryString}`;
    }
    const result = await axiosClient.get(path, {
      params: {
        limit: 1000,
      },
    });
    return result.data;
  },
  Get: async (id: string): Promise<Post> => {
    const result = await axiosClient.get(`${baseUrl}/${prefix}/${id}`);
    return result.data;
  },
  Update: async (id: string, model: Post): Promise<Post> => {
    if (model.content) {
      model.content = utf8ToBase64(model.content); // Mã hóa content với hỗ trợ Unicode
    }
    const formData = ObjectToForm(model);
    const result = await axiosClient.put(`${baseUrl}/${prefix}/${id}`, formData);
    return result.data;
  },
  Create: async (model: Post): Promise<Post> => {
    if (model.content) {
      model.content = utf8ToBase64(model.content); // Mã hóa content với hỗ trợ Unicode
    }
    const formData = ObjectToForm(model);
    const result = await axiosClient.post(`${baseUrl}/${prefix}`, formData);
    return result.data;
  },
  Delete: async (id: string): Promise<object> => {
    const result = await axiosClient.delete(`${baseUrl}/${prefix}/${id}`)
    return result
  }
};

export default PostService;
