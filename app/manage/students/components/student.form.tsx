import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { defaultValue, Student } from "@/models/student.model";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axiosClient from "@/composables/axios.client";
import Image from "next/image";
import config from "@/config/config";

interface StudentFormProps {
  student: Student | null;
  onClose: () => void;
  fetch: () => void;
}

export default function StudentForm({ student, onClose, fetch }: StudentFormProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(student?.imgSrc || "");
  const [model, setModel] = useState<Student>(defaultValue);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [img, setImg] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (student) {
      setIsEdit(true); // Chế độ chỉnh sửa
      setModel(student); // Nạp dữ liệu từ sinh viên cần chỉnh sửa
      setUploadedImage(student.imgSrc || "");
    } else {
      setIsEdit(false); // Chế độ thêm mới
      setModel(defaultValue); // Đặt các giá trị mặc định
    }
  }, [student]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImg(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setModel({
      ...model,
      [e.target.id]: e.target.value,
    });
    console.log(model)
  };

  const handleSave = async () => {
    const data = new FormData();
    if (model?.name) data.append("name", model.name);
    if (model?.email) data.append("email", model.email);
    if (model?.phone) data.append("phone", model.phone);
    if (model?.schoolYear) data.append("schoolYear", model.schoolYear);
    if (model?.major) data.append("major", model.major);
    if (model?.dob) data.append("dob", model.dob);
    if (model?.studySince) data.append("studySince", model.studySince);
    if (model?.studyUntil) data.append("studyUntil", model.studyUntil);
    if (model?.gender) data.append("gender", model.gender);
    if (model?.active !== undefined) data.append("active", model.active.toString()); // Nếu là boolean, cần chuyển thành chuỗi
    if (model?.achievements) data.append("achievements", model.achievements);
    if (img) data.append("file", img);
    console.log(model)
    try {
      if (isEdit) {
        // Chỉnh sửa sinh viên
        await axiosClient.put(`http://localhost:8000/v1/students/${model?.id}`, data);
      } else {
        // Thêm mới sinh viên
        await axiosClient.post("http://localhost:8000/v1/students", data);
      }
      fetch(); // Tải lại dữ liệu
      resetForm(); // Reset form
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const resetForm = () => {
    onClose(); // Đóng form sau khi lưu
    setModel(defaultValue); // Reset giá trị
    setImg(undefined);
  };

  return (
    <>
      <DialogContent className="sm:max-w-[625px]" aria-describedby="dialog">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Chỉnh sửa thông tin" : "Thêm sinh viên mới"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center mb-4">
            {
              uploadedImage ?
                <Avatar
                  src={`http://${config.minio.end_point}:9000/images/${model.imgSrc}`}
                  alt={model?.name}
                  className="size-10 rounded-full"
                  size="lg"
                /> :
                <Avatar src={uploadedImage || `${model?.imgSrc}`} alt={model?.name || "Student avatar"} size="lg" />
            }
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avatar" className="text-right">Ảnh đại diện</Label>
            <Input id="avatar" type="file" accept="image/*" onChange={handleImageUpload} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Họ và tên</Label>
            <Input id="name" value={model?.name || ""} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right"> Giới tính</Label>
            <div className="flex items-center gap-3">
              <Input
                id="male"
                type="radio"
                name="gender"
                className="w-4"
                value={model.gender}
                onChange={handleInputChange}
              />
              <Label htmlFor="male" className="text-right"> Nam </Label>
            </div>

            <div className="flex items-center gap-3">
              <Input
                id="female"
                type="radio"
                name="gender"
                className="w-4"
                value={model.gender}
                onChange={handleInputChange}
              />
              <Label htmlFor="female" className="text-right"> Nữ </Label>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Email</Label>
            <Input id="email" value={model?.email || ""} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">Số điện thoại</Label>
            <Input id="phone" value={model?.phone || ""} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="major" className="text-right">Môn chuyên</Label>
            <select
              id="major"
              value={model?.major || ""}
              onChange={handleInputChange}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            >
              <option value="math">Toán</option>
              <option value="information">Toán Tin</option>
              <option value="literature">Văn</option>
              <option value="english">Anh</option>
              <option value="biology">Sinh học</option>
              <option value="history">Lịch sử</option>
              <option value="geography">Địa lý</option>
              <option value="chinese">Trung</option>
              <option value="physics">Vật lý</option>
              <option value="chemistry">Hoá học</option>
              <option value="unknown">Không biết</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dob" className="text-right">Ngày sinh</Label>
            <Input id="dob" type="date" value={model?.dob || ""} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="schoolYear" className="text-right">Niên khoá</Label>
            <Input id="schoolYear" value={model?.schoolYear || ""} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Thành tích</Label>
            <Textarea id="description" value={model?.achievements} onChange={handleInputChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={resetForm}>Hủy</Button>
          <Button type="submit" onClick={handleSave} form="student-form">Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
