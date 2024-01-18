import axios from '../../api/axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useAuth } from '../../context/AuthContext';
import { ClassicSpinner } from 'react-spinners-kit';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';

interface Column {
  id: '' | 'Name' | 'RegistrationNo' | 'date' | 'status';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'date', label: 'Date', minWidth: 70 },
  { id: 'Name', label: ' Name', minWidth: 170 },

  {
    id: 'status',
    label: 'Status',
    minWidth: 70,
    align: 'left',
  },
];

interface AttendanceData {
  id: number;
  programreg_id: number;
  is_present: number;
  name: string;
  action: string;
  registrationno: string;
  image: string;
  status: string;
  date: string;
  user_id: number;
  username: {
    name: string;
  };
}

const EmployeesAttendance = () => {
  const {
    state: { user },
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const allowedRoles: number[] = [ROLES.ADMIN, ROLES.HR];

    if (!checkUserRole(user?.role_id || 0, allowedRoles)) {
      navigate('/');
    }
  }, []);

  const [loading, setLoading] = useState(true);
  const [marked, setMarked] = useState(null);
  const [data, setData] = useState<AttendanceData[]>([]);
  const [userList, setUserList] = React.useState([]);
  const [employee, setEmployee] = React.useState<number | string>();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const currentDate = new Date();
  const currentMonth = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}`;

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const handleMonthChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedMonth(e.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchMarked = async () => {
    try {
      const response = await axios.get(`/isMarked`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      setMarked(response?.data?.ismarked);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchAttendence = async () => {
    try {
      const response = await axios.get(`/attandanceListForUser`, {
        params: {
          id: user?.user_id,
          month: selectedMonth,
          userId: employee,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      setData(response?.data?.attandanceList);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const markeAttendance = async () => {
    try {
      const response = await axios.get(`/markAttandance`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      toast.success(response?.data?.message || 'Successful!');
      fetchAttendence();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/employeelist`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      setUserList(response?.data?.data);
      setEmployee(response?.data?.data[0]?.user_id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchMarked();
    fetchUsers();
  }, []);
  useEffect(() => {
    if (selectedMonth || employee) {
      fetchAttendence();
    }
  }, [selectedMonth, employee]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Attendance Management / Employee Attendance" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <div className="grid grid-cols-3 gap-4">
            <div className="mt-1 outline-none dark:bg-boxdark">
              <label className="text-black-2 " htmlFor="programName">
                Month
              </label>
              <input
                type="month"
                name="name"
                id="programName"
                placeholder="Enter batch name"
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                value={selectedMonth}
                onChange={handleMonthChange}
              />
            </div>
            <div className="mt-1 outline-none dark:bg-boxdark">
              {user?.id === 2 ? (
                <>
                  <label className="text-black-2 " htmlFor="programName">
                    User
                  </label>
                  <select
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    name=""
                    id=""
                    onChange={(e) => setEmployee(e.target.value)}
                    value={employee}
                  >
                    <option value=""> -- Please Select User --</option>

                    {userList.map((data: AttendanceData) => (
                      <option value={data?.user_id}>{data?.name}</option>
                    ))}
                  </select>
                </>
              ) : null}
            </div>
            {marked === false ? (
              <div className=" my-7 text-end">
                <button
                  type="button"
                  className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
                  onClick={markeAttendance}
                >
                  Mark Today's Attendance
                </button>
              </div>
            ) : null}
          </div>
        </div>
        {loading ? (
          <div className="absolute flex h-full w-full items-center justify-center bg-white">
            <ClassicSpinner color="#04BE5B" />
          </div>
        ) : (
          <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
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
                    {data &&
                      data
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((prog) => (
                          <TableRow className="bg-light" key={prog?.id}>
                            <TableCell>{prog?.date}</TableCell>

                            <TableCell>{prog?.username?.name}</TableCell>
                            <TableCell>{prog?.status}</TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        )}

        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default EmployeesAttendance;
