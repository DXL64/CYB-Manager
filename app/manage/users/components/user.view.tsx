// components/View.tsx
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "@/models/user.model";

interface ViewProps {
  model: User | null;
  onClose: () => void;
}

export default function View({ model: model, onClose }: ViewProps) {
  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>Chi tiết</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {/* <div className="flex justify-center mb-4">
          <Avatar
            src={`${config.minio.end_point}/${config.minio.bucket_name}/${student?.imgSrc}` || ""}
            alt={student?.name || "Student avatar"}
            size="lg"
          />
        </div> */}
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Họ và tên:</div>
          <div className="col-span-3">{model?.id}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Họ và tên:</div>
          <div className="col-span-3">{model?.name}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Email:</div>
          <div className="col-span-3">{model?.email}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Role</div>
          <div className="col-span-3">{model?.role}</div>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" onClick={onClose}>
          Đóng
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
