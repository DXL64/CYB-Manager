export type Student = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  imgSrc?: string;
  schoolYear?: string;
  major?: string;
  dob?: string;
  studySince?: string;
  studyUntil?: string;
  gender: "male" | "female";
  priority: number;
  active: boolean;
  achievements?: string;
  file?: File
};

export const defaultValue: Student = {
  id: "",
  name: "",
  email: "",
  phone: "",
  imgSrc: "",
  schoolYear: "",
  major: "math",
  dob: "",
  studySince: "",
  studyUntil: "",
  gender: "male",
  priority: 100,
  active: false,
  achievements: "",
  file: undefined
}
