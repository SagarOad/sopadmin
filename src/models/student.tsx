interface Student {
  user_id: number;
  name: string;
  status_id: number;
  address: string;
  startYear: string;
  endYear: string;
  phone: string;
  email: string;
  action: string;
  data: {
    data: [];
    per_page: number;
    total: number;
  };
  per_page: number;
  total: number;
}
