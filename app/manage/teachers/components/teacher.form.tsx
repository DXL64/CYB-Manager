import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axiosClient from "@/composables/axios.client";
import Image from "next/image";
import config from "@/config/config";
import { defaultValue, Teacher } from "@/models/teacher.model";

interface TeacherFormProps {
  teacher: Teacher | null;
  onClose: () => void;
  fetch: () => void;
}

export default function TeacherForm({ teacher, onClose, fetch }: TeacherFormProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(teacher?.imgSrc || "");
  const [model, setModel] = useState<Teacher>(defaultValue);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [img, setImg] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (teacher) {
      setIsEdit(true); // Chế độ chỉnh sửa
      setModel(teacher); // Nạp dữ liệu từ sinh viên cần chỉnh sửa
      setUploadedImage(teacher.imgSrc || "");
    } else {
      setIsEdit(false); // Chế độ thêm mới
      setModel(defaultValue); // Đặt các giá trị mặc định
    }
  }, [teacher]);

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
    data.append("id", model?.id || "");
    data.append("name", model?.name || "");
    data.append("email", model?.email || "");
    data.append("phone", model?.phone || "");
    data.append("imgSrc", model?.imgSrc || "");
    data.append("position", model?.position || "");
    data.append("major", model?.major || "");
    data.append("dob", model?.dob || "");
    data.append("workSince", model?.workSince || "");
    data.append("workUntil", model?.workUntil || "");
    data.append("gender", model?.gender || "male");
    data.append("achievements", model?.achievements || "");
    if (img) data.append("file", img);

    try {
      if (isEdit) {
        // Chỉnh sửa sinh viên
        await axiosClient.put(`http://localhost:8000/v1/teachers/${model?.id}`, data);
      } else {
        // Thêm mới sinh viên
        await axiosClient.post("http://localhost:8000/v1/teachers", data);
      }
      fetch(); // Tải lại dữ liệu
      resetForm(); // Reset form
    } catch (error) {
      console.error("Error saving teacher:", error);
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
        <div className="grid grid-cols-4 gap-4 py-4 items-center">
          <div className="col-span-4 flex justify-center mb-4">
            <Avatar
              src={uploadedImage || model?.imgSrc}
              alt={model?.name || "User avatar"}
              size="lg"
            />
          </div>
          <Label htmlFor="avatar" className="text-right col-span-1"> Ảnh đại diện</Label>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="col-span-3"
          />
          <Label htmlFor="fullName" className="text-right col-span-1">
            Họ và tên
          </Label>
          <Input id="name" value={model?.name || ""} onChange={handleInputChange} className="col-span-3" />
          <Label htmlFor="gender" className="text-right col-span-1"> Giới tính</Label>
          <div className="flex items-center gap-3 col-span-3">
            <Input
              id="male"
              type="radio"
              name="gender"
              className="w-4"
              value={model.gender}
              onChange={handleInputChange}
            />
            <Label htmlFor="male" className="text-right"> Nam </Label>
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
          <Label htmlFor="dob" className="text-right col-span-1" >
            Ngày sinh
          </Label>
          <Input
            id="dob"
            type="date"
            className="col-span-3"
            onChange={handleInputChange}
            value={model?.dob}
          />
          <Label htmlFor="email" className="text-right col-span-1">Email</Label>
          <Input
            id="email"
            className="col-span-3"
            value={model?.email}
            onChange={handleInputChange}
          />
          <Label htmlFor="phone" className="text-right col-span-1">Số điện thoại</Label>
          <Input
            id="phone"
            value={model?.phone}
            onChange={handleInputChange}
            className="col-span-3"
          />
          <Label htmlFor="position" className="text-right col-span-1" >Chức vụ</Label>
          <Input
            id="position"
            value={model?.position}
            onChange={handleInputChange}
            className="col-span-3"
          />
          <Label htmlFor="major" className="text-right col-span-1" >Môn chuyên</Label>
          <select
            id="major"
            defaultValue={model?.major || ""}
            value={model?.major}
            onChange={handleInputChange}
            className={
              "col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            }
          >
            <option value="math">Toán</option>
            <option value="information">Tin học</option>
            <option value="literature">Văn</option>
            <option value="english">Anh</option>
            <option value="biology">Sinh học</option>
            <option value="history">Lịch sử</option>
            <option value="geography">Địa lý</option>
            <option value="chinese">Trung</option>
            <option value="physics">Vật lý</option>
            <option value="chemistry">Hoá học</option>
            <option value="unknown">Công nghệ</option>
            <option value="unknown">Thể dục</option>
            <option value="unknown">GDCD</option>
            <option value="unknown">Công nghệ</option>
          </select>
          <Label htmlFor="workSince" className="text-right col-span-1">Bắt đầu làm việc</Label>
          <Input
            id="workSince"
            type="date"
            className="col-span-3"
            onChange={handleInputChange}
            value={model?.workSince}
          />
          <Label htmlFor="workUntil" className="text-right col-span-1" >Kết thúc làm việc</Label>
          <Input
            id="workUntil"
            type="date"
            className="col-span-3"
            value={model?.workUntil}
            onChange={handleInputChange}
          />
          <Label
            htmlFor="achievements"
            className="text-right col-span-1"
          >Thành tích</Label>
          <Textarea
            id="achievements"
            rows={4}
            onChange={handleInputChange}
            value={model?.achievements}
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button type="button" onClick={resetForm}>Hủy</Button>
          <Button type="submit" onClick={handleSave} form="student-form">Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
