import axios from '../../api/axios';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
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
import { ROLES } from '../../constants/roles';
import { useNavigate } from 'react-router-dom';
import { checkUserRole } from '../../utils/role';

interface Column {
  id: '' | 'Name' | 'RegistrationNo' | 'date' | 'credit' | 'debit';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'date', label: 'Date', minWidth: 70 },
  { id: 'Name', label: ' Name', minWidth: 170 },
  {
    id: 'credit',
    label: 'Credit',
    minWidth: 70,
    align: 'left',
  },
  {
    id: 'debit',
    label: 'Debit',
    minWidth: 70,
    align: 'left',
  },
];

interface Data {
  id: number;
  balancesheet_date: string;
  balancesheet_title: string;
  balancesheet_credit: number;
  balancesheet_debit: number;
}

const BalanceSheet = () => {
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

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);
  const [credit, setCredit] = useState('');
  const [debit, setDebit] = useState('');
  const [openingBalance, setOpeningBalance] = useState('');

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

  const fetchAttendence = async () => {
    try {
      const response = await axios.get(`/balancesheet`, {
        params: {
          id: user?.user_id,
          month: selectedMonth,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      setData(response?.data?.data);
      setDebit(response?.data?.debitsum);
      setCredit(response?.data?.creditsum);
      setOpeningBalance(response?.data?.openingbalance);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (selectedMonth) {
      fetchAttendence();
    }
  }, [selectedMonth]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Account Management / Balance Sheet" />
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
                    <TableRow className="bg-light" key={0}>
                      <TableCell></TableCell>
                      <TableCell>
                        <span className="text-black-2">Opening Balance</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-black-2">
                          Rs {openingBalance}
                        </span>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    {data &&
                      data
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((prog) => (
                          <TableRow className="bg-light" key={prog?.id}>
                            <TableCell>{prog?.balancesheet_date}</TableCell>
                            <TableCell>{prog?.balancesheet_title}</TableCell>
                            <TableCell>
                              {prog?.balancesheet_credit
                                ? `Rs ${prog?.balancesheet_credit}`
                                : null}
                            </TableCell>
                            <TableCell>
                              {' '}
                              {prog?.balancesheet_debit
                                ? `Rs ${prog?.balancesheet_debit}`
                                : null}
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        key={0}
                        align={'center'}
                        style={{
                          backgroundColor: '#000000',
                          color: '#ffffff',
                          textTransform: 'capitalize',
                        }}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        key={0}
                        align={'center'}
                        style={{
                          backgroundColor: '#000000',
                          color: '#ffffff',
                          textTransform: 'capitalize',
                        }}
                      ></TableCell>
                      <TableCell
                        key={0}
                        align={'left'}
                        style={{
                          backgroundColor: '#000000',
                          color: '#ffffff',
                          textTransform: 'capitalize',
                        }}
                      >
                        Rs {credit}/-
                      </TableCell>
                      <TableCell
                        key={0}
                        align={'left'}
                        style={{
                          backgroundColor: '#000000',
                          color: '#ffffff',
                          textTransform: 'capitalize',
                        }}
                      >
                        Rs {debit}/-
                      </TableCell>
                    </TableRow>
                  </TableHead>
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

export default BalanceSheet;
