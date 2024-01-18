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
import Button from '@mui/material/Button';
import { useAuth } from '../../context/AuthContext';
import { ClassicSpinner } from 'react-spinners-kit';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';

interface Column {
  id: '' | 'Name' | 'RegistrationNo' | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: '', label: '', minWidth: 70 },
  { id: 'Name', label: ' Name', minWidth: 170 },

  {
    id: 'RegistrationNo',
    label: 'Registration No',
    minWidth: 170,
    align: 'left',
  },

  {
    id: 'action',
    label: 'action',
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
}

const AddAttendance = () => {
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

  const [rowId, setRowId] = useState<string | number | null>();
  const [loading, setLoading] = useState(true);
  const [blockData, setBlockData] = useState<AttendanceData[]>([]);
  const [data, setData] = useState<AttendanceData[]>([]);
  const [path, setPath] = useState<string>('');

  const [block, setBlock] = useState<string>();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = async (
    event: React.MouseEvent<HTMLElement>,
    prog: AttendanceData
  ) => {
    setAnchorEl(event.currentTarget);
    setRowId(prog?.programreg_id);

    try {
      if (rowId) {
        const response = await axios.get(`/markattendance`, {
          params: {
            id: `${user?.user_id}`,
            programreg_id: `${rowId}`,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        console.log(response.data);
        fetchAttendence();
        setAnchorEl(null);

        setRowId('');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    }
  };

  const fetchBLock = async () => {
    try {
      const response = await axios.get(`/getBlockList`, {
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
      setBlock(response?.data?.data[0]?.id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchAttendence = async () => {
    try {
      const response = await axios.get(`/blockwiseattendance`, {
        params: {
          id: user?.user_id,
          block_id: block,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      setData(response?.data?.data);
      setPath(response?.data?.path);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchBLock();
  }, []);
  useEffect(() => {
    setLoading(true);
    if (block) {
      fetchAttendence();
    }
  }, [block]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Attendance Management / Students Attendance" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <div className="grid grid-cols-3 gap-4">
            <div className="mt-1 outline-none dark:bg-boxdark">
              <label className="text-black-2 " htmlFor="programName">
                Select Block
              </label>
              <select
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                name=""
                id=""
                onChange={(e) => setBlock(e.target.value)}
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
                            <TableCell>
                              {' '}
                              <img
                                className=" m-auto  h-[40px] w-[40px] object-contain object-top"
                                src={`${path}${prog?.image}`}
                              />
                            </TableCell>
                            <TableCell>{prog?.name}</TableCell>
                            <TableCell>{prog?.registrationno}</TableCell>

                            <TableCell>
                              {prog?.is_present == 0 ? (
                                <Button
                                  id="demo-positioned-button"
                                  aria-controls={
                                    open ? 'demo-positioned-menu' : undefined
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={open ? 'true' : undefined}
                                  onClick={(event) => handleClick(event, prog)}
                                  variant="contained"
                                  sx={{
                                    backgroundColor: '#04BE5B',
                                    color: '#ffffff',
                                    fontWeight: 600,
                                    textTransform: 'capitalize',
                                    fontSize: '17px',
                                  }}
                                >
                                  Present
                                </Button>
                              ) : (
                                <p>Present</p>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={blockData.length}
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

export default AddAttendance;
