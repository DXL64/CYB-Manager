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