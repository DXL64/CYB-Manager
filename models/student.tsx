export type Student = {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    imgSrc?: string;
    schoolYear?: string;
    major?: string;
    dob?: string;
    studySince?: string;
    studyUntil?: string;
    gender: 'male' | 'female';
    active: boolean;
    achievements?: string;
};