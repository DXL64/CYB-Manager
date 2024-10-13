import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EyeIcon, Edit, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { Dialog } from "@/components/ui/dialog";
import Form from "./user.form";
import View from "./user.view";
import { Input } from "@/components/ui/input";
import { User } from "@/models/user.model";


interface ListProps {
  models: User[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  fetch: () => void;
}

export default function List({ models, searchTerm, setSearchTerm, fetch }: ListProps) {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingModel, setEditing] = useState<User | null>(null);
  const [viewModel, setView] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1000;

  // const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredModels = useMemo(() => {
    return models
      .filter((model) => model.name.toLowerCase().includes(searchTerm.toLowerCase()))
      // .sort((a, b) => (Number(a.priority) || 0) - (Number(b.priority) || 0));
  }, [models, searchTerm]);
  const totalPages = Math.ceil(filteredModels.length / itemsPerPage);

  const paginatedModels = filteredModels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditStudent = (model: User) => {
    setEditing(model);
    setIsNewModalOpen(true);
  };

  const handleViewStudent = (model: User) => {
    setView(model);
    setIsViewModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User</h2>
        <Dialog
          open={isNewModalOpen}
          onOpenChange={setIsNewModalOpen}
        >
          <Form
            model={editingModel}
            onClose={() => setIsNewModalOpen(false)}
            fetch={fetch}
          />
        </Dialog>
        <Dialog
          open={isViewModalOpen}
          onOpenChange={setIsViewModalOpen}
        >
          <View
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
          placeholder="Tìm kiếm theo tên"
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
              <TableHead>Tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedModels.map((model, index) => (
              <TableRow key={model.id}>
                <TableCell>
                  {index + 1}
                </TableCell>
                <TableCell>{model.id}</TableCell>
                <TableCell>{model.name}</TableCell>
                <TableCell>{model.email}</TableCell>
                <TableCell>{model.role}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewStudent(model)}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      disabled
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditStudent(model)}
                    >
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
          Hiển thị {(currentPage - 1) * itemsPerPage + 1} đến {Math.min(currentPage * itemsPerPage, filteredModels.length)} trong tổng số {filteredModels.length} học sinh
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Trước
          </Button>
          <span className="text-sm font-medium">
            Trang {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Sau
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}