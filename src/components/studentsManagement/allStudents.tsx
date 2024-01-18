import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import axios from '../../api/axios';
import { ClassicSpinner } from 'react-spinners-kit';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const fixedKey = 'sopuserencrtedid';
function encodeID(originalID: string | any[]) {
  let encoded = '';
  for (let i = 0; i < originalID.length; i++) {
    const keyChar = fixedKey[i % fixedKey.length];
    const originalChar = originalID[i];
    const encodedChar = String.fromCharCode(
      originalChar.charCodeAt(0) ^ keyChar.charCodeAt(0)
    );
    encoded += encodedChar;
  }
  return btoa(encoded);
}

interface Column {
  id: 'SNo' | 'Name' | 'Email' | 'Address' | 'Phone' | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'SNo', label: 'S. No.', minWidth: 100 },
  {
    id: 'Name',
    label: 'Name',
    minWidth: 130,
    align: 'left',
  },
  {
    id: 'Email',
    label: 'Email',
    minWidth: 220,
    align: 'left',
  },
  {
    id: 'Phone',
    label: 'Phone',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'Address',
    label: 'Address',
    minWidth: 170,
    align: 'left',
  },

  {
    id: 'action',
    label: 'action',
    minWidth: 170,
    align: 'left',
  },
];

const AllStudents = () => {
  const {
    state: { user },
  } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const allowedRoles: number[] = [ROLES.ADMIN, ROLES.HR];

    if (!checkUserRole(user?.role_id || 0, allowedRoles)) {
      navigate('/');
    }
  }, []);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<Student>();
  const [student, setStudent] = React.useState<string | number>();
  const [page, setPage] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const encryptionKey = 'sopuserencrtedid';
  // const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    student: Student
  ) => {
    setAnchorEl(event.currentTarget);
    setStudent(student?.user_id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleView = () => {
    const encryptedId = encodeID(`${student}`);
    navigate(`/student-profile?${encryptedId}`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
    setAnchorEl(null);
  };
  const onDelete = async () => {
    try {
      if (student) {
        const response = await axios.get(`/deletestudent`, {
          params: {
            id: `${user?.user_id}`,
            student_id: `${student}`,
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

  const fetchData = async () => {
    try {
      const response = await axios.get(`/studentlist`, {
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
      setData(response?.data);
      setRowsPerPage(response?.data?.data?.per_page);
      setTotal(response?.data?.data?.total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Students Management / All Students" />
      <div className="block p-6 ">
        {loading ? (
          <div className="absolute flex h-full w-full items-center justify-center bg-white">
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
                    {data &&
                      data?.data?.data
                        // .slice(
                        //   page * rowsPerPage,
                        //   page * rowsPerPage + rowsPerPage
                        // )
                        .map((student: Student, index: number) => (
                          <TableRow className="bg-light" key={student?.user_id}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{student?.name}</TableCell>
                            <TableCell>{student?.email}</TableCell>
                            <TableCell>{student?.phone}</TableCell>
                            <TableCell>{student?.address}</TableCell>

                            <TableCell>
                              <div className=' flex flex justify-center'>
                                <MenuItem onClick={handleView}>
                                  {/* <Link to="/student-profile"> */}
                                  <EditIcon />
                                  {/* </Link> */}
                                </MenuItem>
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
                rowsPerPageOptions={[30, 25, 50, 100]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        )}
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
        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default AllStudents;
