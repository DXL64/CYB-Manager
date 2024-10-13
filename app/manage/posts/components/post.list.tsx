'use client'
import { defaultValue, Post } from '@/models/post.model';
import { Dialog } from '@radix-ui/react-dialog';
import PostForm from './post.form';
import Image from "next/image";
import { Edit, EyeIcon, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import config from '@/config/config';
import { useState } from 'react';
import PostView from './post.view';
import { PostService } from '@/composables/services';
import CategoryOptions from "@/composables/options/category.option";

interface PostListProps {
    models: Post[],
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    fetch: () => void;
}

const PostList = ({ models, searchTerm, setSearchTerm, fetch}: PostListProps) => {
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingModel, setEditing] = useState<Post | null>(null);
    const [viewModel, setView] = useState<Post>(defaultValue);

    const filteredModels = models.filter((model) => model.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleEdit = (model: Post) => {
        setEditing(model);
        setIsNewModalOpen(true);
    };

    const handleView = (model: Post) => {
        setView(model);
        setIsViewModalOpen(true);
    };

    const handleDelete = (id: string) => {
        PostService.Delete(id).then(() => {
            fetch()
        })
    }

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Bài đăng</h2>
                <Dialog
                    open={isNewModalOpen}
                    onOpenChange={setIsNewModalOpen}
                >
                    <PostForm
                        model={editingModel}
                        onClose={() => setIsNewModalOpen(false)}
                        fetch={fetch}
                    />
                </Dialog>
                <Dialog
                    open={isViewModalOpen}
                    onOpenChange={setIsViewModalOpen}
                >
                    <PostView
                        model={viewModel}
                        onClose={() => setIsViewModalOpen(false)}
                    />
                </Dialog>
                <Button
                    onClick={() => {
                        setEditing(null);
                        setIsNewModalOpen(true);
                    }}
                    >
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm thông tin
                </Button>
            </div>
            <div className="mb-4 flex flex-wrap gap-4 items-center">
                <Input
                    placeholder="Tìm kiếm theo tiêu đề"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>STT</TableHead>
                        <TableHead>Ảnh</TableHead>
                        <TableHead>Tiêu đề</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Hạng mục</TableHead>
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredModels.map((model, index) => (
                        <TableRow key={model.id}>
                            <TableCell>{index}</TableCell>
                            <TableCell>
                            {model.imgSrc ? (
                                <Image
                                src={`${config.minio.end_point}/${config.minio.bucket_name}/${model.imgSrc}`}
                                alt="img"
                                className="size-10 rounded-full"
                                width={64}
                                height={64}
                                />
                            ) : (
                                <span className="size-10 rounded-full bg-zinc-200" />
                            )}
                            </TableCell>
                            <TableCell>{model.title}</TableCell>
                            <TableCell>{model.id}</TableCell>
                            <TableCell>{model?.category ? (
                                CategoryOptions
                                    .filter(category => category.value === model.category) 
                                    .map(category => (
                                    <div key={category.value}>{category.label}</div>
                                    ))
                                ) : (
                                <div>Không có hạng mục nào</div>
                            )}</TableCell>
                            <TableCell>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleView(model)}
                                >
                                    <EyeIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEdit(model)}
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(model.id)}
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>

                            </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
        </>
    )
}

export default PostList