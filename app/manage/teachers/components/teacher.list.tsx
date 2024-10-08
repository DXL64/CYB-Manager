import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EyeIcon, Edit, Plus, ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { Dialog } from "@/components/ui/dialog";
import TeacherForm from "./teacher.form";
import TeacherView from "./teacher.view";
import { Input } from "@/components/ui/input";
import config from "@/config/config";
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
  other: "Khác"
};

const statusMap: Record<string, string> = {
  working: "Đang công tác",
  retired: "Nghỉ hưu",
  transfer: "Chuyển công tác",
  passed_away: "Đã mất",
};

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1000; // You can adjust this value as needed

  const filtered = useMemo(() => {
    return teachers.filter((teacher) => teacher.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [teachers, searchTerm]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedTeachers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  }, [filtered, currentPage]);

  const handleEdit = (teacher: Teacher) => {
    setEditing(teacher);
    setIsNewModalOpen(true);
  };

  const handleView = (teacher: Teacher) => {
    setView(teacher);
    setIsViewModalOpen(true);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Giáo viên</h2>
        <Dialog open={isNewModalOpen} onOpenChange={setIsNewModalOpen}>
          <TeacherForm teacher={editingModel} onClose={() => setIsNewModalOpen(false)} fetch={fetch} />
        </Dialog>
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <TeacherView teacher={viewModel} onClose={() => setIsViewModalOpen(false)} />
        </Dialog>
        <Button onClick={() => { setEditing(null); setIsNewModalOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm thông tin
        </Button>
      </div>
      
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <Input
          placeholder="Tìm kiếm theo tên"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className="max-w-sm"
        />
      </div>
      
      <div className="overflow-x-auto">
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
              <TableHead>Trạng thái</TableHead>
              <TableHead>Bắt đầu làm việc</TableHead>
              <TableHead>Kết thúc làm việc</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTeachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>
                  {teacher.imgSrc ? (
                    <Image
                      src={`${config.minio.end_point}/${config.minio.bucket_name}/${teacher.imgSrc}`}
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
                <TableCell>{teacher?.dob ? teacher.dob : ""}</TableCell>
                <TableCell>{teacher?.email}</TableCell>
                <TableCell>{teacher?.phone}</TableCell>
                <TableCell>{teacher?.position}</TableCell>
                <TableCell>{teacher.major ? majorMap[teacher.major] || teacher.major : ""}</TableCell>
                <TableCell>{teacher.status ? statusMap[teacher.status] || teacher.status : ""}</TableCell>
                <TableCell>{teacher?.workSince ? teacher.workSince : ""}</TableCell>
                <TableCell>{teacher?.workUntil ? teacher.workUntil : "Đến nay"}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleView(teacher)}>
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(teacher)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Hiển thị {paginatedTeachers.length} trong tổng số {filtered.length} giáo viên
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Trang trước
          </Button>
          <span className="text-sm font-medium">
            Trang {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Trang sau
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}