export type Wallpaper = {
  id: string;
  post_id?: string;
  imgSrc?: string;
  active?: 'true' | 'false',
  file?: File
};

export const defaultValue: Wallpaper = {
  id: "",
  post_id: '',
  imgSrc: '',
  active: 'false',
  file: undefined
}
