interface Blogs {
  slice: any;
  length: any;
  map(arg0: (exam: any, index: number) => JSX.Element): React.ReactNode;
  id: number;
  blogId: number;
  role_id: string | number | readonly string[] | undefined;
  blogTitle: string;
  status: number;
  content: string;
  blogImage: string;
}
