interface Payment {
  slice: any;
  map(arg0: (data: any) => JSX.Element): React.ReactNode;
  id: number;
  payment_id: number;
  name: string;
  user_name: string;
  payment_method: string;
  payment_refrenceno: string;
  payment_amount: number;
  program_name: string;
  payment_date: string;
  image: string;
  length: any;
  province: string;
  district: string;
}
