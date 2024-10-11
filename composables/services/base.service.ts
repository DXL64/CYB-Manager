import config from "@/config/config";
import axiosClient from "../axios.client";
import { ParsedUrlQueryInput, stringify } from "querystring";

export type ResponseModel<T> = {
    results: T[],
    page: number,
    limit: number,
    totalPages: number,
    totalResults: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ObjectToForm = (model: any) => {
    const formData = new FormData();

    Object.keys(model).forEach(key => {
        const value = model[key];

        if (value && key !== 'id') {

            if (value instanceof File || value instanceof Blob) {
                formData.append(key, value);
            }

            else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item);
                });
            }

            else if (typeof value === 'object') {
                formData.append(key, JSON.stringify(value));
            }

            else {
                formData.append(key, value);
            }
        }
    });

    return formData;
};

export const utf8ToBase64 = (str: string): string => {
    const utf8Bytes = new TextEncoder().encode(str);
    const binaryString = Array.from(utf8Bytes) 
    .map(byte => String.fromCharCode(byte)) 
    .join(''); 
    return btoa(binaryString); 
}

export const base64ToUtf8 = (base64: string): string => {
    const decodedString = atob(base64);
    
    const byteArray = new Uint8Array(decodedString.length);
    for (let i = 0; i < decodedString.length; i++) {
        byteArray[i] = decodedString.charCodeAt(i);
    }
    const utf8Decoder = new TextDecoder("utf-8");
    return utf8Decoder.decode(byteArray);
}

export interface IBaseService<T> {
    prefix: string,
    baseUrl: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    List: (query?: {}) => Promise<ResponseModel<T>>,
    Get: (id: string) => Promise<T>,
    Update: (id: string, model: T) => Promise<T>,
    Create: (model: T) => Promise<T>,
    Delete: (id: string) => Promise<object>
}


const BaseService = <T>(prefix: string): IBaseService<T> => {
    const baseUrl = `${config.backend.end_point}/v1`;

    return {
        baseUrl,
        prefix,

        List: async (query: ParsedUrlQueryInput | undefined): Promise<ResponseModel<T>> => {
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

        Get: async (id: string): Promise<T> => {
            const result = await axiosClient.get(`${baseUrl}/${prefix}/${id}`);
            return result.data;
        },

        Update: async (id: string, model: T): Promise<T> => {
            const formData = ObjectToForm(model);
            const result = await axiosClient.put(`${baseUrl}/${prefix}/${id}`, formData);
            return result.data;
        },

        Create: async (model: T): Promise<T> => {
            const formData = ObjectToForm(model);
            const result = await axiosClient.post(`${baseUrl}/${prefix}`, formData);
            return result.data;
        },

        Delete: async (id: string): Promise<object> => {
            const result = await axiosClient.delete(`${baseUrl}/${prefix}/${id}`);
            return result;
        },
    };
};

export default BaseService;