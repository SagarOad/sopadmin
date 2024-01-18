import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
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

const EmployeeApprovedLeave = () => {
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

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowId, setRowId] = useState(0);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User>();
  const [total, settotal] = useState(0);

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

  const fetchData = async () => {
    try {
      const response = await axios.get(`/empleavelist`, {
        params: {
          id: user?.user_id,
          empleavestatus_id: 2,
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

        toast.success(response?.data?.message || 'Successfully Deleted');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Management / Employee Approved Leave" />
      <div className="block p-6 ">
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
                        <TableCell>{data?.empname}</TableCell>
                        <TableCell>{data?.empleave_startdate}</TableCell>
                        <TableCell>{data?.empleave_enddate}</TableCell>
                        <TableCell>{data?.empleave_totaldays}</TableCell>
                        <TableCell>{data?.empleave_comment}</TableCell>

                        <TableCell>
                        
                            <MenuItem onClick={handleReject}>Decline</MenuItem>
                        
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
    </DefaultLayout>
  );
};

export default EmployeeApprovedLeave;
