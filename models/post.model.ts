export type Post = {
  id: string,
  title: string,
  category: string,
  imgSrc: string,
  content: string,
  file?: File,
};

export const defaultValue: Post = {
  id: '',
  content: '',
  title: '',
  category: '',
  imgSrc: '',
  file: undefined
}
