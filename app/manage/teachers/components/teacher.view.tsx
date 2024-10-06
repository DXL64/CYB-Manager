// components/StudentView.tsx
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Teacher } from "@/models/teacher.model";
// import config from "@/config/config";

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

interface TeacherViewProps {
  teacher: Teacher | null;
  onClose: () => void;
}

export default function TeacherView({ teacher, onClose }: TeacherViewProps) {
  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>Chi tiết học sinh</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex justify-center mb-4">
          <Avatar
            src={`${config.minio.end_point}/${config.minio.bucket_name}/${teacher?.imgSrc}`}
            alt={teacher?.name || "Student avatar"}
            size="lg"
          />
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
          <div className="text-right font-bold">Giới tính:</div>
          <div className="col-span-3">{teacher?.gender === "male" ? "Nam" : "Nữ"}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Ngày sinh:</div>
          <div className="col-span-3">{teacher?.dob}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Chức vụ:</div>
          <div className="col-span-3">{teacher?.position}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Môn chuyên:</div>
          <div className="col-span-3">{teacher?.major ? majorMap[teacher.major] || teacher.major : "N/A"}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Bắt đầu làm việc:</div>
          <div className="col-span-3">{teacher?.workSince}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Kết thúc làm việc:</div>
          <div className="col-span-3">{teacher?.workUntil}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Thành tích:</div>
          <div className="col-span-3">{teacher?.achievements}</div>
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
  );
}
