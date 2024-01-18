interface Dashboard {
  map(arg0: (student: Payment, index: number) => JSX.Element): React.ReactNode;
  studentCount: number;
  examCount: number;
  approvedPayment: number;
  declinedPayment: number;
  openticket: number;
  activeticket: number;
  closeticket: number;
  usersCount: number;
  allicket: number;
  approvepaymentgraph: any;
  requestefPayment: string;
}
