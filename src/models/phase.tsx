interface Phase {
  slice: any;
  map(arg0: (data: any) => JSX.Element): React.ReactNode;
  id: number;
  name: string;
  registrationno: string;
  image: string;
  path: string;
  program_name: string;
  batch_name: string;
  program_id: number;
  batch_id: number;
  length: any;
}
