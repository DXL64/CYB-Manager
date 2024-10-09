import { IBaseService, ObjectToForm, ResponseModel } from "./base.service";
import axiosClient from "../axios.client";
import { stringify } from "querystring";
import { Wallpaper } from "@/models/wallpaper.model";
import config from "@/config/config";

const baseUrl = `${config.backend.end_point}/v1`;
const prefix = 'wallpapers'

const WallpaperService: IBaseService<Wallpaper> = {
  List: async (query): Promise<ResponseModel<Wallpaper>> => {
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
  Get: async (id: string): Promise<Wallpaper> => {
    const result = await axiosClient.get(`${baseUrl}/${prefix}/${id}`);
    return result.data;
  },
  Update: async (id: string, model: Wallpaper): Promise<Wallpaper> => {
    const formData = ObjectToForm(model);
    console.log(formData);
    const result = await axiosClient.put(`${baseUrl}/${prefix}/${id}`, formData);
    return result.data;
  },
  Create: async (model: Wallpaper): Promise<Wallpaper> => {
    const formData = ObjectToForm(model);
    const result = await axiosClient.post(`${baseUrl}/${prefix}`, formData);
    return result.data;
  },
  Delete: async (id: string): Promise<object> => {
    const result = await axiosClient.delete(`${baseUrl}/${prefix}/${id}`)
    return result
  }
};

export default WallpaperService;
