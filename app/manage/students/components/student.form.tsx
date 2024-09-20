// components/StudentForm.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { defaultValue, Student } from "@/models/student.model";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axiosClient from "@/composables/axios.client";
interface StudentFormProps {
  student: Student | null;
  onClose: () => void;
}

export default function StudentForm({ student, onClose }: StudentFormProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(student?.imgSrc || "");
  const [model, setModel] = useState<Student | null>(student || null);
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [img, setImg] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (!student) {
      setIsEdit(false)
      setModel(defaultValue)
      console.log(model)
    } else {
      setModel(student)
    }
  }, [setModel, student])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImg(file)
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (model) {
      setModel({
        ...model,
        [e.target.id]: e.target.value,
      });
    }
  };
  
  const handleSave = async () => {
    console.log(model)
    const data = new FormData()
    if (model?.name) data.append('name', model.name);
    if (model?.email) data.append('email', model.email);
    if (model?.phone) data.append('phone', model.phone);
    if (model?.schoolYear) data.append('schoolYear', model.schoolYear);
    if (model?.major) data.append('major', model.major);
    if (model?.dob) data.append('dob', model.dob);
    if (model?.studySince) data.append('studySince', model.studySince);
    if (model?.studyUntil) data.append('studyUntil', model.studyUntil);
    if (model?.gender) data.append('gender', model.gender);
    if (model?.active !== undefined) data.append('active', model.active.toString()); // Nếu là boolean, cần chuyển thành chuỗi
    if (model?.achievements) data.append('achievements', model.achievements);
    if (img) data.append('file', img);
    await axiosClient.post('http://localhost:8000/v1/students', data).then((res) => { 
        console.log(res.data)
    })
    // const updatedModel = { ...model, imgSrc };

    try {
      if (isEdit) {
        // await axiosClient.put(`localhost:8000/students/${updatedModel.id}`, updatedModel);
      } else {
        // await axiosClient.post('localhost:9000/students', updatedModel);
      }
      onClose(); // Close the dialog after save
    } catch (error) {
      // console.error("Error saving student:", error);
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[625px]" aria-describedby="dialog">
        <DialogHeader>
          <DialogTitle>{model ? "Chỉnh sửa thông tin" : "Thêm thông tin"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center mb-4">
            <Avatar src={uploadedImage || model?.imgSrc} alt={model?.name || "Student avatar"} size="lg" />
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
            <Textarea id="description" value={model?.achievements || ""} onChange={handleInputChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={onClose}>Hủy</Button>
          <Button type="submit" onClick={handleSave} form="student-form">Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
