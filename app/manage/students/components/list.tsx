/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Student } from "@/models/student";
import { Edit, EyeIcon, Plus } from "lucide-react";
import { useState } from "react";
import { Paginate } from "../../../../components/ui/paginate";
import Image from "next/image";

const students: Student[] = [
  {
    id: 1,
    name: "Jssa Jas",
    email: "@email.com",
    phone: "+84123456789",
    imgSrc: "/assets/logo-cyb.jpg",
    schoolYear: "k28",
    major: "Ly",
    dob: "2021-06-06",
    gender: "female",
    active: true,
  },
  {
    id: 2,
    name: "Pauline Jas",
    email: "@email.com",
    phone: "+84123456789",
    imgSrc: "",
    schoolYear: "k28",
    major: "Ly",
    dob: "26 Jan 2021",
    gender: "female",
    active: false,
  },
  {
    id: 3,
    name: "Thedric Romans",
    email: "@email.com",
    phone: "+84123456789",
    imgSrc: "",
    schoolYear: "k28",
    major: "Ly",
    dob: "12 Jan 2019",
    gender: "female",
    active: false,
  },
  {
    id: 4,
    name: "Haily Carthew",
    email: "@email.com",
    phone: "+84123456789",
    imgSrc: "",
    schoolYear: "k28",
    major: "Ly",
    dob: "27 Jan 2018",
    gender: "female",
    active: true,
  },
  {
    id: 5,
    name: "Dorothea Joicey",
    email: "@email.com",
    phone: "+84123456789",
    imgSrc: "",
    schoolYear: "k28",
    major: "Ly",
    dob: "12 Dec 2017",
    gender: "female",
    active: true,
  },
];

export default function StudentsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  // const [dateFrom, setDateFrom] = useState("");
  // const [dateTo, setDateTo] = useState("");
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Student | null>(null);
  const [viewUser, setViewUser] = useState<Student | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const filteredUsers = students.filter((user) => {
    const userDob = user?.dob ? new Date(user.dob) : null;
    const isValidDate = userDob instanceof Date && !isNaN(userDob.getTime()); // Check if the date is valid

    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

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

  const handleEditUser = (user: Student) => {
    setEditingUser(user);
    setIsNewUserModalOpen(true);
  };

  const handleViewUser = (user: Student) => {
    setViewUser(user);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Học sinh</h2>
        <Dialog
          open={isNewUserModalOpen}
          onOpenChange={setIsNewUserModalOpen}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setEditingUser(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm thông tin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{editingUser ? "Chỉnh sửa thông tin" : "Thêm thông tin"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex justify-center mb-4">
                <Avatar
                  src={uploadedImage || editingUser?.imgSrc}
                  alt={editingUser?.name || "User avatar"}
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
                  defaultValue={editingUser?.name || ""}
                  value={editingUser?.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="email"
                  className="text-right"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  className="col-span-3"
                  defaultValue={editingUser?.email || ""}
                  value={editingUser?.email}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="phone"
                  className="text-right"
                >
                  Số điện thoại
                </Label>
                <Input
                  id="phone"
                  defaultValue={editingUser?.phone || ""}
                  value={editingUser?.phone}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="major"
                  className="text-right"
                >
                  Môn chuyên
                </Label>
                <select
                  id="major"
                  defaultValue={editingUser?.major || ""}
                  value={editingUser?.major}
                  className={
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  }
                >
                  <option value="math">Toán</option>
                  <option value="information">Toán Tin</option>
                  <option value="literature">Văn</option>
                  <option value="english">Anh</option>
                  <option value="biology">Sinh học</option>
                  <option value="history">Lịch sử</option>
                  <option value="geography">Địa lý</option>
                  <option value="chinese">Trung</option>
                  <option value="physics">Vật lý</option>
                  <option value="chemistry">Hoá học</option>
                  <option value="unknown">Không chuyên</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="schoolYear"
                  className="text-right"
                >
                  Niên khoá
                </Label>
                <div className="flex rounded-md overflow-hidden w-fit border">
                  <span className="px-2 py-1 text-sm my-1">K</span>
                  <Input
                    id="schoolYear"
                    defaultValue={editingUser?.schoolYear || ""}
                    value={editingUser?.schoolYear}
                    type="number"
                    className="border-l border-t-0 border-b-0 border-r-0 rounded-none px-2"
                  />
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
                  htmlFor="achievements"
                  className="text-right"
                >
                  Thành tích
                </Label>
                <Textarea
                  id="achievements"
                  rows={4}
                  defaultValue={editingUser?.achievements || ""}
                  value={editingUser?.achievements}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button type="submit"> Lưu thay đổi </Button>
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
            <TableHead>Niên khoá</TableHead>
            <TableHead>Môn chuyên</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {user?.imgSrc ? (
                  <Image
                    src={user?.imgSrc ?? ""}
                    alt="img"
                    className="size-10 rounded-full"
                    width={64}
                    height={64}
                  />
                ) : (
                  <span className="size-10 rounded-full bg-zinc-200" />
                )}
              </TableCell>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.dob}</TableCell>
              <TableCell>{user?.phone}</TableCell>
              <TableCell>{user?.schoolYear}</TableCell>
              <TableCell>{user?.major}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewUser(user)}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditUser(user)}
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
