import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserService } from "@/composables/services";
import { defaultUser, User } from "@/models/user.model";

interface FormProps {
  model: User | null;
  onClose: () => void;
  fetch: () => void;
}

export default function Form({ model, onClose, fetch }: FormProps) {
  const [editModel, setModel] = useState<User>(defaultUser);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (model) {
      setIsEdit(true); 
      setModel(model); 
    } else {
      setIsEdit(false); 
      setModel(defaultUser);
    }
    setErrors({});
  }, [model]);


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

    // if (!editModel.name.trim()) newErrors.name = "Họ và tên không được để trống";
    // if (!model.email?.trim()) newErrors.email = "Email không được để trống";
    // if (!model.phone?.trim()) newErrors.phone = "Số điện thoại không được để trống";
    // if (!editModel.schoolYear?.trim()) newErrors.schoolYear = "Niên khóa không được để trống";
    // if (!editModel.major?.trim()) newErrors.major = "Môn chuyên không được để trống";
    // if (!editModel.priority) newErrors.priority = "Độ ưu tiên không được để trống";
    // if (!model.dob?.trim()) newErrors.dob = "Ngày sinh không được để trống";

    // // Add more validation rules as needed
    // if (editModel.email && !/\S+@\S+\.\S+/.test(editModel.email)) {
    //   newErrors.email = "Email không hợp lệ";
    // }
    // if (editModel.phone && !/^\d{10,11}$/.test(editModel.phone)) {
    //   newErrors.phone = "Số điện thoại không hợp lệ (cần 10-11 số)";
    // }
    // if (Number(editModel.priority) < 0 || Number(editModel.priority) > 100) {
    //   newErrors.priority = "Độ ưu tiên không hợp lệ, phải là số trong khoảng (0, 100)";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }
    try {
      if (isEdit) {
        await UserService.Update(editModel.id, editModel);
      } else {
        await UserService.Create(editModel);
      }
      fetch();
      onClose();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  return (
    <>
      <DialogContent
        className="sm:max-w-[625px]"
        aria-describedby="dialog"
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? "Chỉnh sửa thông tin" : "Thêm học sinh mới"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 items-center">
          {/* <div className="flex justify-center mb-4 col-span-4">
            <Avatar
              src={uploadedImage || `${config.minio.end_point}/${config.minio.bucket_name}/${editModel?.imgSrc}`}
              alt={editModel?.name || "User avatar"}
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
          /> */}
          <Label
            htmlFor="name"
            className="text-right col-span-1"
          >
            Họ và tên
          </Label>
          <div className="col-span-3">
            <Input
              id="name"
              name="name"
              value={editModel.name || ""}
              onChange={handleInputChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <Label
            htmlFor="gender"
            className="text-right col-span-1"
          >
            Role
          </Label>
          <div className="flex items-center gap-3 col-span-3">
            <Input
              id="admin"
              type="radio"
              name="role"
              className="w-4"
              value="admin"
              checked={editModel.role === "admin"}
              onChange={handleInputChange}
            />
            <Label
              htmlFor="admin"
              className="text-right"
            >
              Admin
            </Label>

            <Input
              id="superadmin"
              type="radio"
              name="role"
              className="w-4"
              value="superadmin"
              checked={editModel.role === "superadmin"}
              onChange={handleInputChange}
            />
            <Label
              htmlFor="superadmin"
              className="text-right"
            >
              Super Admin
            </Label>

            <Input
              id="user"
              type="radio"
              name="role"
              className="w-4"
              value="user"
              checked={editModel.role === "user"}
              onChange={handleInputChange}
            />
            <Label
              htmlFor="user"
              className="text-right"
            >
              User
            </Label>
          </div>

          <Label
            htmlFor="email"
            className="text-right col-span-1"
          >
            Email
          </Label>
          <div className="col-span-3">
            <Input
              id="email"
              name="email"
              value={editModel.email || ""}
              onChange={handleInputChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
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
