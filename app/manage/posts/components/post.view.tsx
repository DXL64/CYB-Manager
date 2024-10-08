'use client'
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import CategoryOptions from "@/composables/options/category.option"
// import { base64ToUtf8 } from "@/composables/services/base.service"
import config from "@/config/config"
import { defaultValue, Post } from "@/models/post.model"

import dynamic from "next/dynamic";
import { useEffect, useState } from "react"
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


interface PostViewProps {
    post: Post,
    onClose: () => void
}

const PostView = ({ post, onClose}: PostViewProps ) => {
    const [model, setModel] = useState<Post>(defaultValue)
    useEffect(() => {
        // const utf8 = base64ToUtf8(post.content)
        setModel({
            ...post,
            // content: utf8 
        })
    }, [post])

    return (
        <>
            <DialogContent className="max-w-screen-lg">
                <DialogHeader>
                    <DialogTitle>Chi tiết học sinh</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex justify-center mb-4">
                    <Avatar
                        src={`${config.minio.end_point}/${config.minio.bucket_name}/${model?.imgSrc}` || ""}
                        alt={model?.title || "Post image avatar"}
                        size="lg"
                    />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <div className="text-right font-bold">Tiêu đề:</div>
                        <div className="col-span-3">{model?.title}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <div className="text-right font-bold">Hạng mục:</div>
                            {model?.category ? (
                                // Kiểm tra xem post.category có tồn tại không
                                CategoryOptions
                                    .filter(category => category.value === model.category) // Lọc danh mục dựa trên giá trị của post.category
                                    .map(category => (
                                    <div key={category.value}>{category.label}</div> // Hiển thị label của danh mục
                                    ))
                                ) : (
                                <div>Không có hạng mục nào</div> // Thông báo nếu không có hạng mục
                            )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <div className="text-right font-bold">Nội dung:</div>
                        <div className="col-span-3">

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
                                readOnly
                                value={model.content}
                            />

                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={onClose}
                    >
                        Đóng
                    </Button>
                </DialogFooter>
            </DialogContent>
        </>
    )
}

export default PostView