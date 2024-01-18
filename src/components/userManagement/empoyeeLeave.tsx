import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';
import { useNavigate } from 'react-router-dom';


import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface Column {
  id:
    | 'ID'
    | 'startdate'
    | 'Name'
    | 'enddate'
    | 'totaldays'
    | 'comment'
    | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'ID', label: 'ID', minWidth: 80 },
  {
    id: 'Name',
    label: 'Employee Name',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'startdate',
    label: 'Start Date',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'enddate',
    label: 'End Date',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'totaldays',
    label: 'Total Days',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'comment',
    label: 'Comment',
    minWidth: 150,
    align: 'left',
  },

  {
    id: 'action',
    label: 'action',
    minWidth: 170,
    align: 'left',
  },
];

const EmployeeLeave = () => {
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

  const formRef = useRef<HTMLFormElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<User>();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowId, setRowId] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User>();
  const [total, settotal] = useState(0);
  const [startDate, setStartDate] = useState<string | number>();
  const [endDate, setEndDate] = useState<string | number>();
  const [comment, setComment] = useState<string | number>();
  const [employee, setEmployee] = useState<string | number>();
  const [type, setType] = useState<string | number>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [daysDifference, setDaysDifference] = useState<string | number>(0);
  const [showFormModal, setShowFormModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>, data: User) => {
    setAnchorEl(event.currentTarget);
    setRowId(data?.empleave_id);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/userlistdropdown`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setLoading(false);
      setUsers(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`/empleavelist`, {
        params: {
          id: user?.user_id,
          empleavestatus_id: 1,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setLoading(false);
      setData(response?.data?.data);
      settotal(response?.data?.data?.data?.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUsers();
  }, []);

  const handleReject = async () => {
    try {
      if (rowId) {
        const response = await axios.get(`/proceedempleave`, {
          params: {
            id: `${user?.user_id}`,
            empleave_id: `${rowId}`,
            empleavestatus_id: 3,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        console.log(response.data);
        fetchData();

        setAnchorEl(null);
        setShowDeleteModal(false);
        toast.success(response?.data?.message || 'Successfully Deleted');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    }
  };
  const handleApprove = async () => {
    try {
      if (rowId) {
        const response = await axios.get(`/proceedempleave`, {
          params: {
            id: `${user?.user_id}`,
            empleave_id: `${rowId}`,
            empleavestatus_id: 2,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        console.log(response.data);
        fetchData();

        setAnchorEl(null);
        setShowDeleteModal(false);
        toast.success(response?.data?.message || 'Successfully Deleted');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const timeDifference = endDateObj.getTime() - startDateObj.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
      setDaysDifference(daysDifference);
    }
  }, [startDate, endDate]);
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const SaveEmpLeave = async () => {
      if (formRef.current) {
        const formData = new FormData(formRef.current);

        formData.append('id', `${user?.user_id}`);

        try {
          const response = await axios.post(`/saveempleave`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem(
                '11%13%07%1C%00%0B%00CXPHR%14'
              )}`,
            },
          });

          toast.success(response?.data?.message || 'Success');
          console.log(response);
          fetchData();
          setComment('');
          setEndDate('');
          setStartDate('');
          setType('');
          setEmployee('');
          setDaysDifference(0);
          setRowId(0);
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }
    };

    if (formRef.current) {
      try {
        await SaveEmpLeave();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Management / Employee Leave" />
      <div className="block p-6 ">
        <div className="flex w-[100%] justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <button
            className="mr-2 flex justify-center rounded bg-[#00A651] p-3 font-medium text-gray"
            onClick={() => setShowFormModal(true)}
          >
            Add Employee Leaves
          </button>
        </div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <h3 className="mt-4 mb-4 text-center text-2xl font-medium text-black-2">
            Pending Employee Leaves
          </h3>
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
                  data?.data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((data: User, index: number) => (
                      <TableRow className="bg-light" key={data?.user_id}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{data?.empname}</TableCell>
                        <TableCell>{data?.empleave_startdate}</TableCell>
                        <TableCell>{data?.empleave_enddate}</TableCell>
                        <TableCell>{data?.empleave_totaldays}</TableCell>
                        <TableCell>{data?.empleave_comment}</TableCell>

                        <TableCell>
                          <div className=' flex justify-center'>
                          <MenuItem onClick={handleApprove}>Approve</MenuItem>
                          <MenuItem onClick={handleReject}>Decline</MenuItem>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[30]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <ToastContainer />
      </div>

      {showFormModal ? (
        <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="absolute -z-10 h-full w-full bg-black opacity-30"></div>
          <div className="w-[95%] rounded-lg bg-[#ffff] p-2 dark:bg-boxdark  md:mb-6 md:w-[50%] md:p-7">
            <h4 className="text-center text-2xl">Add Employee Leave</h4>

            <form ref={formRef} onSubmit={onSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2 " htmlFor="emp_id">
                    Employee
                  </label>
                  <select
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    name="emp_id"
                    required
                    id="emp_id"
                    onChange={(e) => setEmployee(e.target.value)}
                    value={employee}
                  >
                    <option value=""> -- Select Employee --</option>
                    {users &&
                      users.map((data: User) => (
                        <option value={data?.user_id} key={data?.user_id}>
                          {data?.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="empleavetype_id">
                    Leave Type
                  </label>
                  <select
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    name="empleavetype_id"
                    required
                    id="empleavetype_id"
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                  >
                    <option value=""> -- Select Leave Type --</option>
                    <option value={1}>Sick</option>
                    <option value={2}>Annual</option>
                    <option value={3}>Casual</option>
                  </select>
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="empleave_startdate">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="empleave_startdate"
                    id="empleave_startdate"
                    required
                    placeholder="Enter Start Date"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                  />
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="empleave_enddate">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="empleave_enddate"
                    id="empleave_enddate"
                    required
                    placeholder="Enter End Date"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                  />
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="empleave_totaldays">
                    Total Days
                  </label>
                  <input
                    readOnly
                    type="number"
                    name="empleave_totaldays"
                    id="empleave_totaldays"
                    required
                    placeholder="Total Leave Days"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    value={daysDifference}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="empleave_comment">
                    Comment
                  </label>
                  <input
                    type="text"
                    name="empleave_comment"
                    id="empleave_comment"
                    required
                    placeholder="Enter Comment"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                </div>
              </div>

              <div className=" mt-7 flex justify-end gap-2 text-center">
                {submitting ? (
                  <button className="rounded-lg bg-[#cccc] px-8 py-2 font-medium text-white">
                    Submitting...
                  </button>
                ) : (
                  <>
                    <button
                      ref={btnRef}
                      type="submit"
                      className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
                    >
                      Add
                    </button>
                    <button
                      className="rounded-lg bg-[#be0404] px-8 py-2 font-medium text-white"
                      onClick={() => setShowFormModal(false)}
                    >
                      Close
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </DefaultLayout>
  );
};

export default EmployeeLeave;
