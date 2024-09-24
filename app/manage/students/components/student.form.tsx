import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { defaultValue, Student } from "@/models/student.model";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StudentService } from "@/composables/services";

interface StudentFormProps {
  student: Student | null;
  onClose: () => void;
  fetch: () => void;
}

export default function StudentForm({ student, onClose, fetch }: StudentFormProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [model, setModel] = useState<Student>(defaultValue);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    if (student) {
      setIsEdit(true); // Chế độ chỉnh sửa
      setModel(student); // Nạp dữ liệu từ sinh viên cần chỉnh sửa
    } else {
      setIsEdit(false); // Chế độ thêm mới
      setModel(defaultValue); // Đặt các giá trị mặc định
    }
    setUploadedImage(null)
  }, [student]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setModel({
        ...model,
        file: file
      })
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModel((prevModel) => ({
      ...prevModel,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (isEdit) {
        await StudentService.Update(model.id, model);
      } else {
        await StudentService.Create(model);
      }
      fetch();
      onClose();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[625px]" aria-describedby="dialog">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Chỉnh sửa thông tin" : "Thêm sinh viên mới"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 items-center">
          <div className="flex justify-center mb-4 col-span-4">
            <Avatar
              src={uploadedImage || `http://localhost:9000/images/${model?.imgSrc}`}
              alt={model?.name || "User avatar"}
              size="lg"
            />
          </div>
          <Label htmlFor="avatar" className="text-right col-span-1">
            Ảnh đại diện
          </Label>
          <Input id="avatar" type="file" accept="image/*" onChange={handleImageUpload} className="col-span-3" />
          <Label htmlFor="name" className="text-right col-span-1">
            Họ và tên
          </Label>
          <Input name="name" value={model?.name || ""} onChange={handleInputChange} className="col-span-3" />
          <Label htmlFor="gender" className="text-right col-span-1">
            Giới tính
          </Label>
          <div className="flex items-center gap-3 col-span-3">
            <Input
              id="male"
              type="radio"
              name="gender"
              className="w-4"
              value="male"
              checked={model.gender === "male"}
              onChange={handleInputChange}
            />
            <Label htmlFor="male" className="text-right">
              Nam
            </Label>

            <Input
              id="female"
              type="radio"
              name="gender"
              className="w-4"
              value="female"
              checked={model.gender === "female"}
              onChange={handleInputChange}
            />
            <Label htmlFor="female" className="text-right">
              Nữ
            </Label>
          </div>

          <Label htmlFor="email" className="text-right col-span-1">
            Email
          </Label>
          <Input name="email" value={model?.email || ""} onChange={handleInputChange} className="col-span-3" />
          <Label htmlFor="phone" className="text-right col-span-1">
            Số điện thoại
          </Label>
          <Input name="phone" value={model?.phone || ""} onChange={handleInputChange} className="col-span-3" />
          <Label htmlFor="major" className="text-right col-span-1">
            Môn chuyên
          </Label>
          <select
            name="major"
            value={model?.major || ""}
            onChange={handleInputChange}
            className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
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
          <Label htmlFor="dob" className="text-right col-span-1">
            Ngày sinh
          </Label>
          <Input name="dob" type="date" value={model?.dob || ""} onChange={handleInputChange} className="col-span-3" />
          <Label htmlFor="schoolYear" className="text-right col-span-1">
            Niên khoá
          </Label>
          <Input name="schoolYear" value={model?.schoolYear || ""} onChange={handleInputChange} className="col-span-3" />
          <Label htmlFor="achievements" className="text-right col-span-1">
            Thành tích
          </Label>
          <Textarea name="achievements" value={model?.achievements || ""} onChange={handleInputChange} className="col-span-3" />
        </div>
        <DialogFooter>
          <Button type="button" onClick={onClose}>
            Hủy
          </Button>
          <Button type="submit" onClick={handleSave}>
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent >
    </>
  );
}
