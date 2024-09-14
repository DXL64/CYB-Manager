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
};
