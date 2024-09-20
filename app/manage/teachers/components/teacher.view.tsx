// components/StudentView.tsx
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Teacher } from "@/models/teacher.model";

interface TeacherViewProps {
  teacher: Teacher | null;
}

export default function TeacherView({ teacher }: TeacherViewProps) {
  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>Chi tiết học sinh</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex justify-center mb-4">
          <Avatar src={teacher?.imgSrc || ""} alt={teacher?.name || "Student avatar"} size="lg" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Họ và tên:</div>
          <div className="col-span-3">{teacher?.name}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Email:</div>
          <div className="col-span-3">{teacher?.email}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Số điện thoại:</div>
          <div className="col-span-3">{teacher?.phone}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Ngày sinh:</div>
          <div className="col-span-3">{teacher?.dob}</div>
        </div>
        {/* <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Niên khoá:</div>
          <div className="col-span-3">{teacher?.schoolYear}</div>
        </div> */}
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Môn chuyên:</div>
          <div className="col-span-3">{teacher?.major}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Thành tích:</div>
          <div className="col-span-3">{teacher?.achievements}</div>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" onClick={() => { /* Close the modal */ }}>Đóng</Button>
      </DialogFooter>
    </DialogContent>
  );
}
