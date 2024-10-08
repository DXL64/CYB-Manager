// import {  } from 'next-base64-encoder'
export type ResponseModel<T> = {
    results: T[],
    page: number,
    limit: number,
    totalPages: number,
    totalResults: number
}

export const ObjectToForm = (model: any) => {
    const formData = new FormData();

    Object.keys(model).forEach(key => {
        const value = model[key];

        // Bỏ qua `id` nếu cần thiết
        if (value && key !== 'id') {

            // Kiểm tra nếu giá trị là File hoặc Blob
            if (value instanceof File || value instanceof Blob) {
                formData.append(key, value);
            }

            // Kiểm tra nếu là Array
            else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item);
                });
            }

            // Nếu là Object, có thể stringify hoặc xử lý tùy mục đích
            else if (typeof value === 'object') {
                formData.append(key, JSON.stringify(value));
            }

            // Các kiểu dữ liệu khác (string, number, boolean)
            else {
                formData.append(key, value);
            }
        }
    });

    return formData;
};


export interface IBaseService<T> {
    List: (query?: {}) => Promise<ResponseModel<T>>,
    Get: (id: string) => Promise<T>,
    Update: (id: string, model: T) => Promise<T>,
    Create: (model: T) => Promise<T>,
    Delete: (id: string) => Promise<object>
}

export const utf8ToBase64 = (str: string): string => {
    const utf8Bytes = new TextEncoder().encode(str);
    const binaryString = Array.from(utf8Bytes) // Chuyển Uint8Array thành mảng
        .map(byte => String.fromCharCode(byte)) // Chuyển mỗi byte thành ký tự
        .join(''); // Kết hợp các ký tự thành một chuỗi

    return btoa(binaryString); // Chuyển đổi chuỗi binary thành chuỗi base64
}

export const base64ToUtf8 = (base64: string): string => {
     const decodedString = atob(base64);
    
    // Chuyển đổi chuỗi byte thành một mảng các mã byte
    const byteArray = new Uint8Array(decodedString.length);
    for (let i = 0; i < decodedString.length; i++) {
        byteArray[i] = decodedString.charCodeAt(i);
    }
    // Sử dụng TextDecoder để chuyển đổi byte thành chuỗi UTF-8
    const utf8Decoder = new TextDecoder("utf-8");
    return utf8Decoder.decode(byteArray);
}