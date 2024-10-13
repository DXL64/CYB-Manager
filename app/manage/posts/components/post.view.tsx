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
    model: Post,
    onClose: () => void
}

const PostView = ({ model, onClose}: PostViewProps ) => {
    const [viewModel, setModel] = useState<Post>(defaultValue)
    useEffect(() => {
        setModel({
            ...model,
        })
    }, [model])

    return (
        <>
            <DialogContent className="max-w-screen-lg">
                <DialogHeader>
                    <DialogTitle>Chi tiết bài viết</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex justify-center mb-4">
                    <Avatar
                        src={`${config.minio.end_point}/${config.minio.bucket_name}/${viewModel?.imgSrc}` || ""}
                        alt={viewModel?.title || "Post image avatar"}
                        size="lg"
                    />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <div className="text-right font-bold">Id:</div>
                        <div className="col-span-3">{viewModel?.id}</div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <div className="text-right font-bold">Tiêu đề:</div>
                        <div className="col-span-3">{viewModel?.title}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <div className="text-right font-bold">Độ ưu tiên:</div>
                        <div className="col-span-3">{viewModel?.priority}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <div className="text-right font-bold">Hạng mục:</div>
                            {viewModel?.category ? (
                                CategoryOptions
                                    .filter(category => category.value === viewModel.category) 
                                    .map(category => (
                                    <div key={category.value}>{category.label}</div> 
                                    ))
                                ) : (
                                <div>Không có hạng mục nào</div> 
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
                                value={viewModel.content}
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