// components/StudentView.tsx
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Student } from "@/models/student";

interface StudentViewProps {
  student: Student | null;
}

export default function StudentView({ student }: StudentViewProps) {
  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>Chi tiết học sinh</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex justify-center mb-4">
          <Avatar src={student?.imgSrc || ""} alt={student?.name || "Student avatar"} size="lg" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Họ và tên:</div>
          <div className="col-span-3">{student?.name}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Email:</div>
          <div className="col-span-3">{student?.email}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Số điện thoại:</div>
          <div className="col-span-3">{student?.phone}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Ngày sinh:</div>
          <div className="col-span-3">{student?.dob}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Niên khoá:</div>
          <div className="col-span-3">{student?.schoolYear}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Môn chuyên:</div>
          <div className="col-span-3">{student?.major}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Thành tích:</div>
          <div className="col-span-3">{student?.achievements}</div>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" onClick={() => { /* Close the modal */ }}>Đóng</Button>
      </DialogFooter>
    </DialogContent>
  );
}
