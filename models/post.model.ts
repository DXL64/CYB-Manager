export type Post = {
  id: string,
  title: string,
  category: string,
  imgSrc: string,
  content: string, 
  priority: number,
  file?: File,
};

export const defaultValue: Post = {
  id: '',
  content: '',
  title: '',
  category: '',
  imgSrc: '',
  priority: 100,
  file: undefined
}
