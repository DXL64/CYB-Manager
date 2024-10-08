import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { defaultValue, Teacher } from "@/models/teacher.model";
import { TeacherService } from "@/composables/services";
import config from "@/config/config";

interface TeacherFormProps {
  teacher: Teacher | null;
  onClose: () => void;
  fetch: () => void;
}

export default function TeacherForm({ teacher, onClose, fetch }: TeacherFormProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(teacher?.imgSrc || "");
  const [model, setModel] = useState<Teacher>(defaultValue);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (teacher) {
      setIsEdit(true); // Chế độ chỉnh sửa
      setModel(teacher); // Nạp dữ liệu từ sinh viên cần chỉnh sửa
    } else {
      setIsEdit(false); // Chế độ thêm mới
      setModel(defaultValue); // Đặt các giá trị mặc định
    }
    setUploadedImage(null);
    setErrors({});
  }, [teacher]);

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
        file: file,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModel((prevModel) => ({
      ...prevModel,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!model.name.trim()) newErrors.name = "Họ và tên không được để trống";
    // if (!model.email?.trim()) newErrors.email = "Email không được để trống";
    // if (!model.phone?.trim()) newErrors.phone = "Số điện thoại không được để trống";
    if (!model.position?.trim()) newErrors.position = "Chức vụ không được để trống";
    if (!model.major?.trim()) newErrors.major = "Môn chuyên không được để trống";
    if (!model.status?.trim()) newErrors.status = "Trạng thái không được để trống";
    if (!model.dob?.trim()) newErrors.dob = "Năm sinh không được để trống";
    if (!model.workSince?.trim()) newErrors.workSince = "Ngày bắt đầu làm việc không được để trống";

    // Add more validation rules as needed
    if (model.email && !/\S+@\S+\.\S+/.test(model.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (model.phone && !/^\d{10,11}$/.test(model.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ (cần 10-11 số)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }
    try {
      console.log(model);
      if (isEdit) {
        await TeacherService.Update(model?.id, model);
      } else {
        await TeacherService.Create(model);
      }
      fetch();
      onClose();
    } catch (error) {
      console.error("Error saving teacher:", error);
    }
  };

  return (
    <>
      <DialogContent
        className="sm:max-w-[625px]"
        aria-describedby="dialog"
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? "Chỉnh sửa thông tin" : "Thêm giáo viên mới"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-4 py-4 items-center">
          <div className="flex justify-center mb-4 col-span-4">
            <Avatar
              src={uploadedImage || `${config.minio.end_point}/${config.minio.bucket_name}/${model?.imgSrc}`}
              alt={model?.name || "User avatar"}
              size="lg"
            />
          </div>
          <Label
            htmlFor="avatar"
            className="text-right col-span-1"
          >
            Ảnh đại diện
          </Label>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="col-span-3"
          />

          <Label
            htmlFor="name"
            className="text-right col-span-1"
          >
            Họ và tên <span className="text-red-500">*</span>
          </Label>
          <div className="col-span-3">
            <Input
              id="name"
              name="name"
              value={model.name || ""}
              onChange={handleInputChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <Label
            htmlFor="gender"
            className="text-right col-span-1"
          >
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
            <Label
              htmlFor="male"
              className="text-right"
            >
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
            <Label
              htmlFor="female"
              className="text-right"
            >
              Nữ
            </Label>
          </div>

          <Label
            htmlFor="dob"
            className="text-right col-span-1"
          >
            Năm sinh
          </Label>
          <div className="col-span-3">
            <Input
              id="dob"
              name="dob"
              className={errors.dob ? "border-red-500" : ""}
              onChange={handleInputChange}
              value={model?.dob}
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
          </div>

          <Label
            htmlFor="email"
            className="text-right col-span-1"
          >
            Email <span className="text-red-500">*</span>
          </Label>
          <div className="col-span-3">
            <Input
              id="email"
              name="email"
              value={model.email || ""}
              onChange={handleInputChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <Label
            htmlFor="phone"
            className="text-right col-span-1"
          >
            Số điện thoại <span className="text-red-500">*</span>
          </Label>
          <div className="col-span-3">
            <Input
              id="phone"
              name="phone"
              value={model.phone || ""}
              onChange={handleInputChange}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <Label
            htmlFor="position"
            className="text-right col-span-1"
          >
            Chức vụ
          </Label>
          <div className="col-span-3">
            <Input
              id="position"
              name="position"
              value={model?.position}
              onChange={handleInputChange}
              className={errors.position ? "border-red-500" : ""}
            />
            {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
          </div>

          <Label
            htmlFor="major"
            className="text-right col-span-1"
          >
            Môn chuyên
          </Label>
          <select
            id="major"
            name="major"
            defaultValue={model?.major || "math"}
            value={model?.major}
            onChange={handleInputChange}
            className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
            <option value="technology">Công nghệ</option>
            <option value="excercise">Thể dục</option>
            <option value="gdcd">GDCD</option>
            <option value="other">Khác</option>
          </select>

          <Label
            htmlFor="status"
            className="text-right col-span-1"
          >
            Trạng thái
          </Label>
          <select
            id="status"
            name="status"
            defaultValue={model?.status || "working"}
            value={model?.status}
            onChange={handleInputChange}
            className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="working">Đang công tác</option>
            <option value="retired">Nghỉ hưu</option>
            <option value="transfer">Chuyển công tác</option>
            <option value="passed_away">Đã mất</option>
          </select>

          <Label
            htmlFor="workSince"
            className="text-right col-span-1"
          >
            Bắt đầu làm việc
          </Label>
          <div className="col-span-3">
            <Input
              id="workSince"
              name="workSince"
              className={errors.workSince ? "border-red-500" : ""}
              onChange={handleInputChange}
              value={model?.workSince}
            />
            {errors.workSince && <p className="text-red-500 text-sm mt-1">{errors.workSince}</p>}
          </div>

          <Label
            htmlFor="workUntil"
            className="text-right col-span-1"
          >
            Kết thúc làm việc
          </Label>
          <Input
            id="workUntil"
            name="workUntil"
            className="col-span-3"
            value={model?.workUntil}
            onChange={handleInputChange}
          />

          <Label
            htmlFor="achievements"
            className="text-right col-span-1"
          >
            Thành tích
          </Label>
          <Textarea
            id="achievements"
            name="achievements"
            rows={4}
            onChange={handleInputChange}
            value={model?.achievements}
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={onClose}
          >
            Hủy
          </Button>
          <Button
            type="submit"
            onClick={handleSave}
          >
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
