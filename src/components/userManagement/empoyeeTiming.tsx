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
import { useNavigate } from 'react-router-dom';
import { checkUserRole } from '../../utils/role';

import DeleteIcon from '@mui/icons-material/Delete';


interface Column {
  id:
    | 'ID'
    | 'arrivaltime'
    | 'Name'
    | 'departuretime'
    | 'arrivaldate'
    | 'departuredate'
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
    id: 'arrivaltime',
    label: 'Arrival Time',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'departuretime',
    label: 'Departure Time',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'arrivaldate',
    label: 'Arrival Date',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'departuredate',
    label: 'Departure Date',
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

const EmployeeTiming = () => {
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

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User>();
  const [total, settotal] = useState(0);
  const [arrTime, setArrTime] = useState<string | number>();
  const [depTime, setDepTime] = useState<string | number>();
  const [arrDate, setArrDate] = useState<string | number>();
  const [depDate, setDepDate] = useState<string | number>();
  const [employee, setEmployee] = useState<string | number>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>, data: User) => {
    setAnchorEl(event.currentTarget);
    setRowId(data?.emp_id);
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
      const response = await axios.get(`/emptiminglist`, {
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

  const handleDelete = () => {
    setShowDeleteModal(true);
    setAnchorEl(null);
  };
  const onDelete = async () => {
    try {
      if (rowId) {
        const response = await axios.get(`/deleteemptiming`, {
          params: {
            id: `${user?.user_id}`,
            emptiming_id: `${rowId}`,
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

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setSubmitting((prevSubmitting) => !prevSubmitting);

    e.preventDefault();

    const SaveEmpTiming = async () => {
      if (formRef.current) {
        const formData = new FormData(formRef.current);

        // formData.append('image', profile || '-');
        formData.append('id', `${user?.user_id}`);
        try {
          const response = await axios.post(`/saveemptiming`, formData, {
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
          setArrTime('');
          setDepTime('');
          setArrDate('');
          setDepDate('');
          setEmployee('');
          setRowId(0);
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting((prevSubmitting) => !prevSubmitting);
        }
      }
    };

    if (formRef.current) {
      SaveEmpTiming();
    }
  };

  console.log(submitting);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Management / Employee Timing" />
      <div className="block p-6 ">
        <div className="flex w-[100%] justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <button
            className="mr-2 flex justify-center rounded bg-[#00A651] p-3 font-medium text-gray"
            onClick={() => setShowFormModal(true)}
          >
            Add Employee Timing
          </button>
        </div>
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
                  data?.data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((data: User, index: number) => (
                      <TableRow className="bg-light" key={data?.user_id}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{data?.emp_name}</TableCell>
                        <TableCell>{data?.emptiming_arrivaltime}</TableCell>
                        <TableCell>{data?.emptiming_departuretime}</TableCell>
                        <TableCell>{data?.emptiming_arrivaldate}</TableCell>
                        <TableCell>{data?.emptiming_departuredate}</TableCell>

                        <TableCell>
                          <div>
                            <MenuItem onClick={handleDelete}>
                              <DeleteIcon />
                            </MenuItem>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
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
      {showDeleteModal ? (
        <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#0000006e] outline-none focus:outline-none">
          <div className="w-[30%] rounded-lg bg-white text-center text-lg text-black-2 md:mb-6 md:p-7">
            <h3>Are you sure you want to delete it?</h3>
            <h5>This action cannot be undone.</h5>
            <div className=" mt-7 text-center">
              <button
                onClick={onDelete}
                type="submit"
                className="mx-1 rounded-lg bg-[#be0404] px-8 py-2 font-medium text-white"
              >
                Yes, Delete it
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                type="submit"
                className="mx-4 rounded-lg bg-[#b1b0b0] px-8 py-2 font-medium text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showFormModal ? (
        <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="absolute -z-10 h-full w-full bg-black opacity-30"></div>
          <div className="w-[95%] rounded-lg bg-[#ffff] p-2 dark:bg-boxdark  md:mb-6 md:w-[50%] md:p-7">
            <h4 className="text-center text-2xl">Add Employee Timing</h4>
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
              <div className="grid grid-cols-4 gap-4">
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label
                    className="text-black-2"
                    htmlFor="emptiming_arrivaltime"
                  >
                    Arrival Time
                  </label>
                  <input
                    type="time"
                    name="emptiming_arrivaltime"
                    id="emptiming_arrivaltime"
                    required
                    placeholder="Enter Departure Time"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    onChange={(e) => setArrTime(e.target.value)}
                    value={arrTime}
                  />
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label
                    className="text-black-2"
                    htmlFor="emptiming_departuretime"
                  >
                    Departure Time
                  </label>
                  <input
                    type="time"
                    name="emptiming_departuretime"
                    id="emptiming_departuretime"
                    required
                    placeholder="Enter Departure Time"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    onChange={(e) => setDepTime(e.target.value)}
                    value={depTime}
                  />
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label
                    className="text-black-2"
                    htmlFor="emptiming_arrivaldate"
                  >
                    Arrival Date
                  </label>
                  <input
                    type="date"
                    name="emptiming_arrivaldate"
                    id="emptiming_arrivaldate"
                    required
                    placeholder="Enter Arrival Date"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    onChange={(e) => setArrDate(e.target.value)}
                    value={arrDate}
                  />
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label
                    className="text-black-2"
                    htmlFor="emptiming_departuredate"
                  >
                    Departure Date
                  </label>
                  <input
                    type="date"
                    name="emptiming_departuredate"
                    id="emptiming_departuredate"
                    required
                    placeholder="Enter Departure Date"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    onChange={(e) => setDepDate(e.target.value)}
                    value={depDate}
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
                )}{' '}
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </DefaultLayout>
  );
};

export default EmployeeTiming;
