import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { defaultValue, Wallpaper } from "@/models/wallpaper.model";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WallpaperService } from "@/composables/services";
import config from "@/config/config";

interface WallpaperFormProps {
  wallpaper: Wallpaper | null;
  onClose: () => void;
  fetch: () => void;
}

export default function WallpaperForm({ wallpaper, onClose, fetch }: WallpaperFormProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [model, setModel] = useState<Wallpaper>(defaultValue);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (wallpaper) {
      setIsEdit(true); // Chế độ chỉnh sửa
      setModel(wallpaper); // Nạp dữ liệu từ sinh viên cần chỉnh sửa
    } else {
      setIsEdit(false); // Chế độ thêm mới
      setModel(defaultValue); // Đặt các giá trị mặc định
    }
    setUploadedImage(null);
    setErrors({});
  }, [wallpaper]);

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
        await WallpaperService.Update(model.id, model);
      } else {
        await WallpaperService.Create(model);
      }
      fetch();
      onClose();
    } catch (error) {
      console.error("Error saving wallpaper:", error);
    }
  };

  return (
    <>
      <DialogContent
        className="sm:max-w-[625px]"
        aria-describedby="dialog"
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? "Chỉnh sửa thông tin" : "Thêm tường mới"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 items-center">
          <div className="flex justify-center mb-4 col-span-4">
            <Avatar
              src={uploadedImage || `${config.minio.end_point}/${config.minio.bucket_name}/${model?.imgSrc}`}
              alt="Img"
              size="lg"
            />
          </div>
          <Label
            htmlFor="avatar"
            className="text-right col-span-1"
          >
            Ảnh
          </Label>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="col-span-3"
          />
          <Label
            htmlFor="active"
            className="text-right col-span-1"
          >
            Active
          </Label>
          <div className="flex items-center gap-3 col-span-3">
            <Input
              id="active"
              type="radio"
              name="active"
              className="w-4"
              value='true'
              checked={model.active == 'true'}
              onChange={handleInputChange}
            />
            <Label
              htmlFor="active"
              className="text-right"
            >
              Active
            </Label>

            <Input
              id="inactive"
              type="radio"
              name="active"
              className="w-4"
              value="false"
              checked={model.active == 'false'}
              onChange={handleInputChange}
            />
            <Label
              htmlFor="inactive"
              className="text-right"
            >
              Inactive
            </Label>
          </div>

          <Label
            htmlFor="post_id"
            className="text-right col-span-1"
          >
            Post id:
          </Label>
          <div className="col-span-3">
            <Input
              id="post_id"
              name="post_id"
              value={model.post_id}
              onChange={handleInputChange}
              className={errors.post_id ? "border-red-500" : ""}
            />
            {errors.post_id && <p className="text-red-500 text-sm mt-1">{errors.post_id}</p>}
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
