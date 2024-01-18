import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import * as React from 'react';
import 'react-quill/dist/quill.snow.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { ClassicSpinner } from 'react-spinners-kit';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';

interface Column {
  id: 'SNo' | 'Name' | 'expensefor' | 'month' | 'day' | 'amount' | 'details';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'SNo', label: 'S No', minWidth: 70 },
  {
    id: 'Name',
    label: 'Expense Title',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'expensefor',
    label: 'Expense For',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'amount',
    label: 'Expense Amount',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'day',
    label: 'Expense Day',
    minWidth: 170,
    align: 'left',
  },

  {
    id: 'month',
    label: 'Expense Month',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'details',
    label: 'Other Details',
    minWidth: 170,
    align: 'left',
  },
];

interface Data {
  id: number;
  name: string;
  expenseAmount: string;
  expenseFor: string;
  amount: string;
  officeHead: string;
  expenseTitle: string;
  month: string;
  day: string;
  otherDetails: string;
}

const ExpensesList = () => {
  const {
    state: { user },
  } = useAuth();

  const navigate = useNavigate();

  React.useEffect(() => {
    const allowedRoles: number[] = [ROLES.ADMIN, ROLES.ACCOUNTS];

    if (!checkUserRole(user?.role_id || 0, allowedRoles)) {
      navigate('/');
    }
  }, []);

  const formRef = React.useRef<HTMLFormElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const [loading, setLoading] = useState(true);
  const [phaseList, setPhaseList] = useState<Phase>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchExamList = async () => {
    try {
      const response = await axios.get(`/expensesList`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setPhaseList(response?.data?.expenseList);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchExamList();
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    const AddDistrict = async () => {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
  
        formData.append('id', `${user?.user_id}`);
        try {
          const response = await axios.post(`/addExpenses`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('11%13%07%1C%00%0B%00CXPHR%14')}`,
            },
          });
  
          toast.success(response?.data?.message || 'Success');
          console.log(response);
          fetchExamList();
          setOtherDetails('');
          setAmount('');
          setDay('');
          setMonth('');
          setName('');
          setTitle('');
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }
    };
  
    if (formRef.current) {
      try {
        await AddDistrict();
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Expense" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
        <button className="flex mr-2 justify-center rounded bg-[#00A651] p-3 font-medium text-gray" onClick={()=>setShowFormModal(true)}>     
            Add Expense
          </button>
        
        </div>
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <h3 className=" my-5 mb-4 text-center text-2xl text-black-2">
            Expense List
          </h3>
          {loading ? (
            <div className=" flex h-full w-full items-center justify-center bg-white">
              <ClassicSpinner color="#04BE5B" />
            </div>
          ) : (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 640 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            backgroundColor: '#000000',
                            color: '#ffffff',
                            textTransform: 'capitalize',
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {phaseList &&
                      phaseList
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((phase: Data, index: number) => (
                          <TableRow className="bg-light" key={phase?.id}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{phase?.expenseTitle}</TableCell>
                            <TableCell>{phase?.expenseFor}</TableCell>
                            <TableCell>{phase?.expenseAmount}</TableCell>
                            <TableCell>{phase?.day}</TableCell>
                            <TableCell>{phase?.month}</TableCell>
                            <TableCell>{phase?.otherDetails}</TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[30, 50, 100]}
                component="div"
                count={phaseList?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          )}
        </div>

        <ToastContainer />
      </div>






      {showFormModal ? (
        <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="absolute bg-black w-full h-full -z-10 opacity-30"></div>
          <div className="md:w-[50%] w-[95%] p-2 rounded-lg bg-[#ffff]  dark:bg-boxdark md:mb-6 md:p-7">
         
          <h4 className='text-center text-2xl'>Add Expense</h4>
         
          <form ref={formRef} onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="expenseTitle">
                  Expense Title
                </label>
                <input
                  type="text"
                  name="expenseTitle"
                  id="expenseTitle"
                  placeholder="Enter Expense Title"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  value={title}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="expenseFor">
                  Expense for
                </label>
                <input
                  type="text"
                  name="expenseFor"
                  id="expenseFor"
                  placeholder="Enter Expense for"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                />
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="expenseAmount">
                  Expense Amount
                </label>
                <input
                  type="number"
                  name="expenseAmount"
                  id="expenseAmount"
                  placeholder="Enter Expense Amount"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  value={amount}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="month">
                  Month:
                </label>
                <select
                  required
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="month"
                  id="month"
                  onChange={(e) => setMonth(e.target.value)}
                  value={month}
                >
                  <option value="">Select Month</option>

                  <option value={'jan'}>January</option>
                  <option value={'feb'}>February</option>
                  <option value={'mar'}>March</option>
                  <option value={'apr'}>April</option>
                  <option value={'may'}>May</option>
                  <option value={'jun'}>June</option>
                  <option value={'jul'}>July</option>
                  <option value={'aug'}>August</option>
                  <option value={'sep'}>September</option>
                  <option value={'oct'}>October</option>
                  <option value={'nov'}>November</option>
                  <option value={'dec'}>December</option>
                </select>
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="day">
                  Week Day:
                </label>
                <select
                  required
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="day"
                  id="day"
                  onChange={(e) => setDay(e.target.value)}
                  value={day}
                >
                  <option value="">Select Day</option>

                  <option value={'monday'}>Monday</option>
                  <option value={'tuesday'}>Tuesday</option>
                  <option value={'wednesday'}>Wednesday</option>
                  <option value={'thursday'}>Thursday</option>
                  <option value={'friday '}>Friday</option>
                  <option value={'saturday'}>Saturday</option>
                  <option value={'sunday'}>Sunday</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="otherdetails">
                  Other Details
                </label>
                <input
                  type="text"
                  name="otherdetails"
                  id="otherdetails"
                  placeholder="Enter Other Details"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setOtherDetails(e.target.value)}
                  required
                  value={otherDetails}
                />
              </div>
            </div>
            <div className=" mt-7 text-center flex justify-end gap-2">
            {submitting ?  <button
              className="rounded-lg bg-[#cccc] px-8 py-2 font-medium text-white">
              Submitting...
            </button> :
          <>
              <button
              ref={btnRef}
                type="submit"
                className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
                >
                Submit
              </button>
              <button
              className="rounded-lg bg-[#be0404] px-8 py-2 font-medium text-white"
              onClick={()=>setShowFormModal(false)}
>
              Close
            </button>
  </>
            }
            </div>
           
          </form>
          
          </div>
        </div>
      ) : null}  




    </DefaultLayout>
  );
};

export default ExpensesList;
