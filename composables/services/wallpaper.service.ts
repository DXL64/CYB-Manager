import BaseService from "./base.service";
import { Wallpaper } from "@/models/wallpaper.model";

const WallpaperService = BaseService<Wallpaper>("wallpapers")

export default WallpaperService;
