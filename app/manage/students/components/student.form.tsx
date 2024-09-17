// components/StudentForm.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { useState } from "react";
import { Student } from "@/models/student";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface StudentFormProps {
  student: Student | null;
  onClose: () => void;
}

export default function StudentForm({ student, onClose }: StudentFormProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(student?.imgSrc || "");
  const [editingModel, setEditing] = useState<Student | null>(student || null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (editingModel) {
      setEditing({
        ...editingModel,
        [e.target.id]: e.target.value,
      });
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{editingModel ? "Chỉnh sửa thông tin" : "Thêm thông tin"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center mb-4">
            <Avatar src={uploadedImage || editingModel?.imgSrc} alt={editingModel?.name || "Student avatar"} size="lg" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avatar" className="text-right">Ảnh đại diện</Label>
            <Input id="avatar" type="file" accept="image/*" onChange={handleImageUpload} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Họ và tên</Label>
            <Input id="name" value={editingModel?.name || ""} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Email</Label>
            <Input id="email" value={editingModel?.email || ""} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">Số điện thoại</Label>
            <Input id="phone" value={editingModel?.phone || ""} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="major" className="text-right">Môn chuyên</Label>
            <select
              id="major"
              value={editingModel?.major || ""}
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
            <Input id="dob" type="date" value={editingModel?.dob || ""} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="schoolYear" className="text-right">Niên khoá</Label>
            <Input id="schoolYear" value={editingModel?.schoolYear || ""} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Thành tích</Label>
            <Textarea id="description" value={editingModel?.achievements || ""} onChange={handleInputChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={onClose}>Hủy</Button>
          <Button type="submit" form="student-form">Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
