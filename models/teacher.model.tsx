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
  email: undefined,
  phone: undefined,
  imgSrc: undefined,
  position: undefined,
  major: undefined,
  dob: undefined,
  workSince: undefined,
  workUntil: undefined,
  gender: "male",
  achievements: undefined,
  file: undefined
};