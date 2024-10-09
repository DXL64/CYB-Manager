import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EyeIcon, Edit, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Wallpaper } from "@/models/wallpaper.model";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import WallpaperForm from "./wallpaper.form";
import WallpaperView from "./wallpaper.view";
import { Input } from "@/components/ui/input";
import config from "@/config/config";

interface WallpaperListProps {
  wallpapers: Wallpaper[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  fetch: () => void;
}

export default function WallpaperList({ wallpapers, searchTerm, setSearchTerm, fetch }: WallpaperListProps) {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingModel, setEditing] = useState<Wallpaper | null>(null);
  const [viewModel, setView] = useState<Wallpaper | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1000;

  const filteredWallpapers = wallpapers.filter((wallpaper) => wallpaper.id.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredWallpapers.length / itemsPerPage);

  const paginatedWallpapers = filteredWallpapers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditWallpaper = (wallpaper: Wallpaper) => {
    setEditing(wallpaper);
    setIsNewModalOpen(true);
  };

  const handleViewWallpaper = (wallpaper: Wallpaper) => {
    setView(wallpaper);
    setIsViewModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Học sinh</h2>
        <Dialog
          open={isNewModalOpen}
          onOpenChange={setIsNewModalOpen}
        >
          <WallpaperForm
            wallpaper={editingModel}
            onClose={() => setIsNewModalOpen(false)}
            fetch={fetch}
          />
        </Dialog>
        <Dialog
          open={isViewModalOpen}
          onOpenChange={setIsViewModalOpen}
        >
          <WallpaperView
            wallpaper={viewModel}
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
              <TableHead>Ảnh đại diện</TableHead>
              <TableHead>Post id</TableHead>
              <TableHead>Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedWallpapers.map((wallpaper) => (
              <TableRow key={wallpaper.id}>
                <TableCell>
                  {wallpaper.imgSrc ? (
                    <Image
                      src={`${config.minio.end_point}/${config.minio.bucket_name}/${wallpaper.imgSrc}`}
                      alt="img"
                      className="size-10 rounded-full"
                      width={64}
                      height={64}
                    />
                  ) : (
                    <span className="size-10 rounded-full bg-zinc-200" />
                  )}
                </TableCell>
                <TableCell>{wallpaper.post_id}</TableCell>
                <TableCell>{wallpaper.active == 'true' ? 'Hiển thị' : 'Không hiển thị' }</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewWallpaper(wallpaper)}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditWallpaper(wallpaper)}
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
          Hiển thị {(currentPage - 1) * itemsPerPage + 1} đến {Math.min(currentPage * itemsPerPage, filteredWallpapers.length)} trong tổng số {filteredWallpapers.length} học sinh
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