'use client'
import { Post, defaultValue } from "@/models/post.model";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
// import { Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { PostService } from "@/composables/services";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
// import config from "@/config/config";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


interface PostFormProps {
    post: Post | null;
    onClose: () => void;
    fetch: () => void;
}

type Category = {
  label: string;
  value: string;
};

const categories: Category[] = [
  { label: "Khánh tiết", value: "khanh_tiet" },
  { label: "Lưu bút", value: "luu_but" },
  { label: "Thành tích", value: "thanh_tich" },
];

const PostForm = ({post, onClose, fetch }: PostFormProps) => {
    // const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [model, setModel] = useState<Post>(defaultValue);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        if (post) {
            setIsEdit(true); // Chế độ chỉnh sửa
            setModel(post); // Nạp dữ liệu từ sinh viên cần chỉnh sửa
        } else {
            setIsEdit(false); // Chế độ thêm mới
            setModel(defaultValue); // Đặt các giá trị mặc định
        }
        // Xóa console.log trong useEffect
    }, [post]);

    // Ghi log model trong component để kiểm tra giá trị của nó
    useEffect(() => {
        console.log(model);
    }, [model]);


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

    const handleSave = async () => {
        // if (!validateForm()) {
        //     console.log("Form validation failed");
        //     return;
        // }
        try {
            if (isEdit) {
                await PostService.Update(model.id, model);
            } else {
                await PostService.Create(model);
            }
            fetch();
            onClose();
        } catch (error) {
            console.error("Error saving student:", error);
        }
    };

    return (
        <>
            <DialogContent className="max-w-screen-lg">
                <DialogHeader>
                    <DialogTitle>Tạo bài viết mới</DialogTitle>
                    <DialogDescription>Bài viết sẽ được xuất hiện trên trang web Phòng Truyền thống của trường</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <div>
                        <Label>Tiêu đề</Label>
                        <Input
                            name="title"
                            placeholder="Tiêu đề..."
                            value={model.title}
                            onChange={(e) => setModel((prev) => ({ ...prev, title: e.target.value }))}
                        />
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
                        theme="snow"
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
    )
}

export default PostForm;