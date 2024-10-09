"use client";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CategoryOptions from "@/composables/options/category.option";
import { PostService } from "@/composables/services";
import { Post, defaultValue } from "@/models/post.model";
import { Send } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import config from "../../../../config/config";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface PostFormProps {
  post: Post | null;
  onClose: () => void;
  fetch: () => void;
}

const PostForm = ({ post, onClose, fetch }: PostFormProps) => {
  // const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [model, setModel] = useState<Post>(defaultValue);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (post) {
        setIsEdit(true);
    //   const utf8 = base64ToUtf8(post.content);
    //   setModel({ ...post, content: utf8 });
        setModel(post)
    } else {
        setIsEdit(false);
        setModel(defaultValue);
    }
    // Xóa console.log trong useEffect
    setErrors({});
  }, [post]);

  // Ghi log model trong component để kiểm tra giá trị của nó
  // useEffect(() => {
  //   console.log(model);
  // }, [model]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setModel((prev) => ({
        ...prev,
        file: file,
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value)
    setModel((prevModel) => ({
      ...prevModel,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
        console.log("Form validation failed");
        return;
    }
    try {
      if (isEdit) {
        PostService.Update(model.id, model).then(() => fetch());
      } else {
        PostService.Create(model).then(() => fetch());
      }
      onClose();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
  
    if (!model.priority) newErrors.priority = "Độ ưu tiên không được để trống";
    if (Number(model.priority) < 0 || Number(model.priority) > 100) {
      newErrors.priority = "Độ ưu tiên không hợp lệ, phải là số trong khoảng (0, 100)";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <DialogContent className="max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>Tạo bài viết mới</DialogTitle>
          <DialogDescription>Bài viết sẽ được xuất hiện trên trang web Phòng Truyền thống của trường</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex gap-6">
            <div className="relative flex-[2] rounded overflow-hidden">
              <Image
                className="object-cover"
                alt="thumb-image"
                src={
                  model?.imgSrc
                    ? `${config.minio.end_point}/${config.minio.bucket_name}/${model.imgSrc}`
                    : model?.file
                    ? URL.createObjectURL(model?.file)
                    : ""
                }
                width={0}
                height={0}
                fill
              />
            </div>
            <div className="flex-[3] space-y-3">
              <div>
                <Label>Tiêu đề</Label>
                <Input
                  name="title"
                  placeholder="Tiêu đề..."
                  value={model.title}
                  onChange={(e) => setModel((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
            <Label
              htmlFor="priority"
              className="text-right col-span-1"
              >
              Độ ưu tiên
            </Label>
            <div className="col-span-3">
              <Input
                name="priority"
                value={model?.priority || ""}
                onChange={handleInputChange}
                className="col-span-3"
                />
                {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
            </div>
              <div>
                <Label>Ảnh xem trước</Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="col-span-3"
                  placeholder="Ảnh xem trước"
                />
              </div>

              <Select onValueChange={(e) => setModel((prev) => ({ ...prev, category: e }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Hạng mục" />
                </SelectTrigger>
                <SelectContent>
                  {CategoryOptions.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <ReactQuill
            theme="snow"
            placeholder="Start writing..."
            modules={{
              toolbar: {
                container: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                  [{ align: [] }], // Thêm tùy chọn căn lề
                  ["link", "image"],
                  ["clean"],
                ],
              },
              clipboard: {
                matchVisual: true, // Giữ nguyên định dạng khi dán
              },
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
              "align", // Bổ sung định dạng căn lề
            ]}
            value={model.content}
            onChange={(e) => setModel((prev) => ({ ...prev, content: e }))}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>
            <Send
              size={16}
              className="mr-1"
            />
            Đăng bài
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default PostForm;
