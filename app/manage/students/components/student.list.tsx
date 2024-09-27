// components/StudentList.tsx
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EyeIcon, Edit, Plus } from "lucide-react";
import Image from "next/image";
import { Student } from "@/models/student.model";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import StudentForm from "./student.form";
import StudentView from "./student.view";
import { Input } from "@/components/ui/input";
import config from "@/config/config";

const majorMap: Record<string, string> = {
  math: "Toán",
  information: "Toán Tin",
  literature: "Văn",
  english: "Anh",
  biology: "Sinh học",
  history: "Lịch sử",
  geography: "Địa lý",
  chinese: "Trung",
  physics: "Vật lý",
  chemistry: "Hoá học",
  unknown: "Chất lượng cao",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
}

interface StudentListProps {
  students: Student[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  fetch: () => void;
}

export default function StudentList({ students, searchTerm, setSearchTerm, fetch }: StudentListProps) {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingModel, setEditing] = useState<Student | null>(null);
  const [viewModel, setView] = useState<Student | null>(null);

  const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleEditStudent = (student: Student) => {
    setEditing(student);
    setIsNewModalOpen(true);
  };

  const handleViewStudent = (student: Student) => {
    setView(student);
    setIsViewModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Học sinh</h2>
        <Dialog
          open={isNewModalOpen}
          onOpenChange={setIsNewModalOpen}
        >
          <StudentForm
            student={editingModel}
            onClose={() => setIsNewModalOpen(false)}
            fetch={fetch}
          />
        </Dialog>
        <Dialog
          open={isViewModalOpen}
          onOpenChange={setIsViewModalOpen}
        >
          <StudentView
            student={viewModel}
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
            <TableHead>Email</TableHead>
            <TableHead>Ngày sinh</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead>Niên khoá</TableHead>
            <TableHead>Môn chuyên</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                {student.imgSrc ? (
                  <Image
                    src={`${config.minio.end_point}/images/${student.imgSrc}`}
                    alt="img"
                    className="size-10 rounded-full"
                    width={64}
                    height={64}
                  />
                ) : (
                  <span className="size-10 rounded-full bg-zinc-200" />
                )}
              </TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student?.dob ? formatDate(student.dob) : "N/A"}</TableCell>
              <TableCell>{student.phone}</TableCell>
              <TableCell>{student.schoolYear}</TableCell>
              <TableCell>{student.major ? majorMap[student.major] || student.major : "N/A"}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewStudent(student)}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditStudent(student)}
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
