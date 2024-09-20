"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import axiosClient from "@/composables/axios.client";
import { Teacher } from "@/models/teacher.model";
import { Edit, Eye, ImageIcon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Paginate } from "../../../../components/ui/paginate";

export default function TeachersTable() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [dateFrom, setDateFrom] = useState("");
  // const [dateTo, setDateTo] = useState("");
  const [isNewTeacherModalOpen, setIsNewTeacherModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  // const [viewTeacher, setViewTeacher] = useState<Teacher | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const filtered = teachers.filter((teacher) => teacher.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsNewTeacherModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (!editingTeacher) {
        setEditingTeacher({
          id: "",
          name: "",
          email: "",
          phone: "",
          imgSrc: "",
          position: "",
          major: "",
          dob: "",
          workSince: "",
          workUntil: "",
          gender: "male", // You can default to either "male" or "female"
          achievements: "",
        });
        console.log(editingTeacher);
      }

      // Create a new FormData object
      const formData = new FormData();

      // Append all fields to formData
      formData.append("id", editingTeacher?.id || "");
      formData.append("name", editingTeacher?.name || "");
      formData.append("email", editingTeacher?.email || "");
      formData.append("phone", editingTeacher?.phone || "");
      formData.append("imgSrc", editingTeacher?.imgSrc || "");
      formData.append("position", editingTeacher?.position || "");
      formData.append("major", editingTeacher?.major || "");
      formData.append("dob", editingTeacher?.dob || "");
      formData.append("workSince", editingTeacher?.workSince || "");
      formData.append("workUntil", editingTeacher?.workUntil || "");
      formData.append("gender", editingTeacher?.gender || "male");
      formData.append("achievements", editingTeacher?.achievements || "");

      const res = await axiosClient.post("http://localhost:8000/v1/teachers", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the appropriate header for form-data
        },
      });

      console.log(res);
      return res;
    } catch (err) {
      console.error("Error post teacher:", err);
    }
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axiosClient.get("http://localhost:8000/v1/teachers");
        setTeachers(res.data["results"]);
        console.log(res.data["results"]);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []); // Empty dependency array to run effect only once

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Teacher</h2>
        <Dialog
          open={isNewTeacherModalOpen}
          onOpenChange={setIsNewTeacherModalOpen}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTeacher(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm thông tin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{editingTeacher ? "Chỉnh sửa thông tin" : "Thêm thông tin"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex justify-center mb-4">
                <Avatar
                  src={uploadedImage || editingTeacher?.imgSrc}
                  alt={editingTeacher?.name || "User avatar"}
                  size="lg"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="avatar"
                  className="text-right"
                >
                  Ảnh đại diện
                </Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="fullName"
                  className="text-right"
                >
                  Họ và tên
                </Label>
                <Input
                  id="fullName"
                  defaultValue={editingTeacher?.name || ""}
                  value={editingTeacher?.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="gender"
                  className="text-right"
                >
                  Giới tính
                </Label>

                <div className="flex items-center gap-3">
                  <Input
                    id="male"
                    type="radio"
                    name="gender"
                    className="w-4"
                  />
                  <Label
                    htmlFor="male"
                    className="text-right"
                  >
                    Nam
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Input
                    id="female"
                    type="radio"
                    name="gender"
                    className="w-4"
                  />
                  <Label
                    htmlFor="female"
                    className="text-right"
                  >
                    Nữ
                  </Label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="dob"
                  className="text-right"
                >
                  Ngày sinh
                </Label>
                <Input
                  id="dob"
                  type="date"
                  className="col-span-2 w-fit"
                  defaultValue={editingTeacher?.dob || ""}
                  value={editingTeacher?.dob}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="email"
                  className="text-right"
                >Email</Label>
                <Input
                  id="email"
                  className="col-span-3"
                  defaultValue={editingTeacher?.email || ""}
                  value={editingTeacher?.email}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="phone"
                  className="text-right"
                >Số điện thoại</Label>
                <Input
                  id="phone"
                  defaultValue={editingTeacher?.phone || ""}
                  value={editingTeacher?.phone}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="position"
                  className="text-right"
                >Chức vụ</Label>
                <Input
                  id="position"
                  defaultValue={editingTeacher?.position || ""}
                  value={editingTeacher?.position}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="major"
                  className="text-right"
                >Môn chuyên</Label>
                <select
                  id="major"
                  defaultValue={editingTeacher?.major || ""}
                  value={editingTeacher?.major}
                  className={
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  }
                >
                  <option value="math">Toán</option>
                  <option value="information">Tin học</option>
                  <option value="literature">Văn</option>
                  <option value="english">Anh</option>
                  <option value="biology">Sinh học</option>
                  <option value="history">Lịch sử</option>
                  <option value="geography">Địa lý</option>
                  <option value="chinese">Trung</option>
                  <option value="physics">Vật lý</option>
                  <option value="chemistry">Hoá học</option>
                  <option value="unknown">Công nghệ</option>
                  <option value="unknown">Thể dục</option>
                  <option value="unknown">GDCD</option>
                  <option value="unknown">Công nghệ</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="workSince"
                  className="text-right"
                >Bắt đầu làm việc</Label>
                <Input
                  id="workSince"
                  type="date"
                  className="col-span-2 w-fit"
                  defaultValue={editingTeacher?.workSince || ""}
                  value={editingTeacher?.workSince}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="workUntil"
                  className="text-right"
                >Kết thúc làm việc</Label>
                <Input
                  id="workUntil"
                  type="date"
                  className="col-span-2 w-fit"
                  defaultValue={editingTeacher?.workUntil || ""}
                  value={editingTeacher?.workUntil}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="achievements"
                  className="text-right"
                >Thành tích</Label>
                <Textarea
                  id="achievements"
                  rows={4}
                  defaultValue={editingTeacher?.achievements || ""}
                  value={editingTeacher?.achievements}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button
              type="button"
              onClick={handleSubmit}
            >{" "}Lưu thay đổi{" "}</Button>
          </DialogContent>
        </Dialog>
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
                <ImageIcon className="h-8 w-8 rounded-full" />
              </TableCell>
              <TableCell>{teacher?.name}</TableCell>
              <TableCell>{teacher?.dob}</TableCell>
              <TableCell>{teacher?.email}</TableCell>
              <TableCell>{teacher?.phone}</TableCell>
              <TableCell>{teacher?.position}</TableCell>
              <TableCell>{teacher?.major}</TableCell>
              <TableCell>{teacher?.workSince}</TableCell>
              <TableCell>{teacher?.workUntil}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditTeacher(teacher)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Paginate />
    </>
  );
}
