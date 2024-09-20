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


export const defaultValue: Teacher = {
  id: "", // Giá trị mặc định cho ID
  name: "", // Giá trị mặc định cho tên
  email: undefined, // Giá trị mặc định cho email
  phone: undefined, // Giá trị mặc định cho số điện thoại
  imgSrc: undefined, // Giá trị mặc định cho hình ảnh
  position: undefined, // Giá trị mặc định cho vị trí
  major: undefined, // Giá trị mặc định cho môn chuyên
  dob: undefined, // Giá trị mặc định cho ngày sinh
  workSince: undefined, // Giá trị mặc định cho năm bắt đầu làm việc
  workUntil: undefined, // Giá trị mặc định cho năm kết thúc làm việc
  gender: "male", // Giá trị mặc định cho giới tính, có thể là "male" hoặc "female"
  achievements: undefined, // Giá trị mặc định cho thành tích
};