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
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';

interface Column {
  id:
    | 'SNo'
    | ''
    | 'Name'
    | 'Program'
    | 'RefrenceNo'
    | 'Amount'
    | 'Method'
    | 'Date'
    | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'SNo', label: 'S No', minWidth: 70 },
  { id: '', label: '', minWidth: 70 },
  {
    id: 'Name',
    label: 'Name',
    minWidth: 170,
    align: 'left',
  },

  {
    id: 'Program',
    label: 'Program',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'RefrenceNo',
    label: 'Refrence No',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'Amount',
    label: 'Amount',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'Method',
    label: 'Method',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'Date',
    label: 'Date',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'left',
  },
];

const RequestedPayment = () => {
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
  const [PaymentList, setPaymentList] = useState<Payment>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [blockData, setBlockData] = useState<Payment[]>([]);
  const [path, setPath] = useState<string>('');
  const [program, setProgram] = useState<string>();

  const [rowId, setRowId] = useState<string | number | null>();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchMeritList = async () => {
    try {
      const response = await axios.get(`/paymentlist`, {
        params: {
          id: user?.user_id,
          program_id: program,
          paymentstatus_id: 1,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setPaymentList(response?.data?.data);
      setPath(response?.data?.path);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchBlock = async () => {
    try {
      const response = await axios.get(`/programlist`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      setBlockData(response?.data?.data);
      setProgram(response?.data?.data[0]?.id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchBlock();
  }, []);
  React.useEffect(() => {
    if (program) {
      fetchMeritList();
    }
  }, [program]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    student: Payment
  ) => {
    setAnchorEl(event.currentTarget);
    setRowId(student?.payment_id);
  };

  const handleApprove = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      if (rowId) {
        const response = await axios.get(`/updatepaymentstatus`, {
          params: {
            id: `${user?.user_id}`,
            payment_id: `${rowId}`,
            paymentstatus_id: 2,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        console.log(response.data);
        fetchBlock();
        setAnchorEl(null);
        setRowId('');
        setProgram('');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    }
  };

  const handleDecline = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      if (rowId) {
        const response = await axios.get(`/updatepaymentstatus`, {
          params: {
            id: `${user?.user_id}`,
            payment_id: `${rowId}`,
            paymentstatus_id: 3,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        console.log(response.data);
        fetchBlock();
        setAnchorEl(null);
        setRowId('');
        setProgram('');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Requested Payment" />
      <div className="program p-6 ">
        <div className="flex w-[100%] justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <div className="grid grid-cols-3 gap-4">
            <div className="mt-1 outline-none dark:bg-boxdark">
              <label className="text-black-2 " htmlFor="programName">
                Select Program
              </label>
              <select
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                name=""
                id=""
                onChange={(e) => setProgram(e.target.value)}
              >
                {blockData &&
                  blockData?.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>
        {loading ? (
          <div className=" flex h-full w-full items-center justify-center bg-white">
            <ClassicSpinner color="#04BE5B" />
          </div>
        ) : (
          <div className="flex w-[100%] justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
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
                    {PaymentList &&
                      PaymentList.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      ).map((student: Payment, index: number) => (
                        <TableRow className="bg-light" key={student?.id}>
                          <TableCell>{index}</TableCell>
                          <TableCell>
                            <img
                              className=" m-auto  h-[40px] w-[40px] object-contain object-top"
                              src={`${path}${student?.image}`}
                            />
                          </TableCell>
                          <TableCell>{student?.user_name}</TableCell>
                          <TableCell>{student?.program_name}</TableCell>
                          <TableCell>{student?.payment_refrenceno}</TableCell>
                          <TableCell>{student?.payment_amount}</TableCell>
                          <TableCell>{student?.payment_method}</TableCell>
                          <TableCell>{student?.payment_date}</TableCell>
                          <TableCell>
                            <MenuItem onClick={(e) => handleApprove(e)}>
                              Approved
                            </MenuItem>
                            <MenuItem onClick={(e) => handleDecline(e)}>
                              Declined
                            </MenuItem>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[30, 50, 100]}
                component="div"
                count={PaymentList?.length}
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

export default RequestedPayment;
