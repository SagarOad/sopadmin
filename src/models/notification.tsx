interface Exams {
  map(arg0: (exam: any, index: number) => JSX.Element): React.ReactNode;
  slice: any;
  id: number;
  role_id: string | number | readonly string[] | undefined;
  title: string;
  description: string;
}
