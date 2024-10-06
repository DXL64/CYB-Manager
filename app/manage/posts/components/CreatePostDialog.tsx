"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Send } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Input } from "../../../../components/ui/input";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type Post = {
  title?: string;
  imgSrc?: File;
  content?: string;
  category?: string;
};

type Category = {
  label: string;
  value: string;
};

const categories: Category[] = [
  { label: "Khánh tiết", value: "khanh_tiet" },
  { label: "Lưu bút", value: "luu_but" },
  { label: "Thành tích", value: "thanh_tich" },
];

const CreatePostDialog = () => {
  const [post, setPost] = useState<Post>();

  console.log("post", post);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      //   reader.onloadend = () => {
      //     setUploadedImage(reader.result as string);
      //   };
      reader.readAsDataURL(file);
      setPost((prev) => ({
        ...prev,
        imgSrc: file,
      }));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus
            size={16}
            className="mr-1"
          />
          Viết bài
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>Tạo bài viết mới</DialogTitle>
          <DialogDescription>Bài viết sẽ được xuất hiện trên trang web Phòng Truyền thống của trường</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            label="Tiêu đề"
            name="title"
            placeholder="Tiêu đề..."
            value={post?.title}
            onChange={(e) => setPost((prev) => ({ ...prev, title: e.target.value }))}
          />
          <Input
            label="Ảnh xem trước"
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="col-span-3"
            placeholder="Ảnh xem trước"
          />

          <Select onValueChange={(e) => setPost((prev) => ({ ...prev, category: e }))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Hạng mục" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  key={category.value}
                  value={category.value}
                >
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <ReactQuill
            // ref={reactQuillRef}
            // className="min-h-64"
            theme="snow"
            style={{
              minHeight: "16rem",
              height: "auto",
            }}
            placeholder="Start writing..."
            modules={{
              toolbar: {
                container: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                  ["link", "image"],
                  //   ["code-block"],
                  //   ["clean"],
                ],
              },
              clipboard: {
                matchVisual: false,
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
              //   "video",
              //   "code-block",
            ]}
            value={post?.content}
            onChange={(e) => setPost((prev) => ({ ...prev, content: e }))}
          />
        </div>
        <DialogFooter>
          <Button>
            <Send
              size={16}
              className="mr-1"
            />
            Đăng bài
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
