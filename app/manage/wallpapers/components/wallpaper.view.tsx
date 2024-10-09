// components/WallpaperView.tsx
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Wallpaper } from "@/models/wallpaper.model";
import config from "@/config/config";

interface WallpaperViewProps {
  wallpaper: Wallpaper | null;
  onClose: () => void;
}

export default function WallpaperView({ wallpaper, onClose }: WallpaperViewProps) {
  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>Chi tiết tường</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex justify-center mb-4">
          <Avatar
            src={`${config.minio.end_point}/${config.minio.bucket_name}/${wallpaper?.imgSrc}` || ""}
            alt={"Wallpaper avatar"}
            size="lg"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Post id:</div>
          <div className="col-span-3">{wallpaper?.post_id}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right font-bold">Active:</div>
          <div className="col-span-3">{wallpaper?.active == 'true' ? 'Hiển thị' : 'Không hiển thị'}</div>
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
