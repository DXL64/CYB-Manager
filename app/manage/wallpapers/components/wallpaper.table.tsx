// pages/wallpapers.tsx
'use client'
import WallpaperList from "./wallpaper.list";
import { useEffect, useState } from "react";
import { Wallpaper } from "@/models/wallpaper.model";
import { WallpaperService } from "@/composables/services";

const WallpapersTable = () => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetch = async () => {
    await WallpaperService.List().then(ls => {
      setWallpapers(ls.results)
    })
  }

  useEffect(() => {
    fetch()
  }, [setWallpapers])

  return (
    <>
      <WallpaperList wallpapers={wallpapers} searchTerm={searchTerm} setSearchTerm={setSearchTerm} fetch={fetch} />
    </>
  );
};

export default WallpapersTable;
