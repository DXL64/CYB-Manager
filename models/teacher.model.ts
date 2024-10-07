export type Teacher = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  imgSrc?: string;
  position?: string;
  major?: string;
  dob?: string;
  workSince?: string;
  workUntil?: string;
  gender: "male" | "female";
  achievements?: string;
  file?: File
};


export const defaultValue: Teacher = {
  id: "",
  name: "",
  email: "",
  phone: "",
  imgSrc: "",
  position: "",
  major: "math",
  dob: "",
  workSince: "",
  workUntil: "",
  gender: "male",
  achievements: "",
  file: undefined
};