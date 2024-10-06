// components/StudentList.tsx
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EyeIcon, Edit, Plus, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import TeacherForm from "./teacher.form";
import TeacherView from "./teacher.view";
import { Input } from "@/components/ui/input";
// import config from "@/config/config";
import { Teacher } from "@/models/teacher.model";

const majorMap: Record<string, string> = {
  math: "Toán",
  information: "Tin học",
  literature: "Văn",
  english: "Anh",
  biology: "Sinh học",
  history: "Lịch sử",
  geography: "Địa lý",
  chinese: "Trung",
  physics: "Vật lý",
  chemistry: "Hoá học",
  technology: "Công nghệ",
  excercise: "Thể dục",
  gdcd: "GDCD",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
}

interface TeacherListProps {
  teachers: Teacher[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  fetch: () => void;
}

export default function TeacherList({ teachers, searchTerm, setSearchTerm, fetch }: TeacherListProps) {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingModel, setEditing] = useState<Teacher | null>(null);
  const [viewModel, setView] = useState<Teacher | null>(null);

  const filtered = teachers.filter((teacher) => teacher.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleEdit = (teacher: Teacher) => {
    setEditing(teacher);
    setIsNewModalOpen(true);
  };

  const handleView = (teacher: Teacher) => {
    setView(teacher);
    setIsViewModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Giáo viên</h2>
        <Dialog
          open={isNewModalOpen}
          onOpenChange={setIsNewModalOpen}
        >
          <TeacherForm
            teacher={editingModel}
            onClose={() => setIsNewModalOpen(false)}
            fetch={fetch}
          />
        </Dialog>
        <Dialog
          open={isViewModalOpen}
          onOpenChange={setIsViewModalOpen}
        >
          <TeacherView
            teacher={viewModel}
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
          placeholder="Tìm kiếm theo tên"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ảnh đại diện</TableHead>
            <TableHead>Họ và tên</TableHead>
            <TableHead>Ngày sinh</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead>Chức vụ</TableHead>
            <TableHead>Môn chuyên</TableHead>
            <TableHead>Bắt đầu làm việc</TableHead>
            <TableHead>Kết thúc làm việc</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell>
                {teacher.imgSrc ? (
                  <Image
                    // src={`${config.minio.end_point}/images/${teacher?.imgSrc}`}
                    src={`https://minio.loyos.app/images/${teacher?.imgSrc}`}
                    alt="img"
                    className="size-10 rounded-full"
                    width={64}
                    height={64}
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 rounded-full" />
                )}
              </TableCell>
              <TableCell>{teacher?.name}</TableCell>
              <TableCell>{teacher?.dob ? formatDate(teacher.dob) : "N/A"}</TableCell>
              <TableCell>{teacher?.email}</TableCell>
              <TableCell>{teacher?.phone}</TableCell>
              <TableCell>{teacher?.position}</TableCell>
              <TableCell>{teacher.major ? majorMap[teacher.major] || teacher.major : "N/A"}</TableCell>
              <TableCell>{teacher?.workSince ? formatDate(teacher.workSince) : "N/A"}</TableCell>
              <TableCell>{teacher?.workUntil ? formatDate(teacher.workUntil) : "Đến nay"}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleView(teacher)}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(teacher)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
