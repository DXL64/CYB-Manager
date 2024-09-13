export type Teacher = {
    name: string;
    email?: string;
    phone?: string;
    imgSrc?: string;
    position?: string;
    major?: string;
    dob?: Date;
    workSince?: string;
    workUntil?: string;
    gender: 'male' | 'female';
    achievements?: string;
}