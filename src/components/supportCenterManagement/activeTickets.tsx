import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import * as React from 'react';
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
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { ClassicSpinner } from 'react-spinners-kit';
import { ToastContainer, toast } from 'react-toastify';
import { ROLES } from '../../constants/roles';
import { useNavigate } from 'react-router-dom';
import { checkUserRole } from '../../utils/role';

interface TicketData {
  contact_id: number;
  subject: string;
  message: number;
  created_by: string;
  created_at: string;
  stats: {
    total: string | number;
    open: string | number;
    close: string | number;
    active: string | number;
  };
  per_page: string | number;
  total: string | number;
  data: any;
}

interface Column {
  id:
    | '#'
    | 'Subject'
    | 'Status'
    | 'Message'
    | 'CreatedBy'
    | 'DateCreated'
    | 'Agent'
    | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: '#', label: '#', minWidth: 80 },
  {
    id: 'Subject',
    label: 'Subject',
    minWidth: 200,
    align: 'left',
  },
  {
    id: 'Message',
    label: 'Message',
    minWidth: 100,
    align: 'left',
  },

  {
    id: 'CreatedBy',
    label: 'Created By',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'DateCreated',
    label: 'Date Created',
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

const ActiveTickets = () => {
  const {
    state: { user },
  } = useAuth();

  const navigate = useNavigate();

  React.useEffect(() => {
    const allowedRoles: number[] = [ROLES.ADMIN];

    if (!checkUserRole(user?.role_id || 0, allowedRoles)) {
      navigate('/');
    }
  }, []);

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<TicketData>();
  const [page, setPage] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);

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
    data: TicketData
  ) => {
    setAnchorEl(event.currentTarget);

    const OpenTicket = async () => {
      if (data?.contact_id) {
        const params = {
          contact_id: data?.contact_id,
          contact_status: 3,
          id: user?.user_id,
        };
        const response = await axios.post(`/proceedticket`, params, {
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
      }
    };
    OpenTicket();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`/ticketlist`, {
        params: {
          id: user?.user_id,
          contact_status: 1,
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
      <Breadcrumb pageName="Support Center Management / Active Tickets" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <div className="mb-6">
            <Grid container spacing={2}>
              <Grid className=" px-2" item md={3}>
                <div
                  className="rounded-lg bg-white py-8 px-5"
                  style={{ border: '4px solid orange' }}
                >
                  <h5 className=" text-3xl font-normal uppercase text-black-2">
                    {data?.stats?.total}
                  </h5>
                  <p className=" my-2 text-lg  text-[#000000]">Total Tickets</p>

                  <LinearProgress
                    color="success"
                    variant="determinate"
                    value={60}
                  />
                </div>
              </Grid>
              <Grid className=" px-2" item md={3}>
                <div
                  className="rounded-lg bg-white py-8 px-5"
                  style={{ border: '4px solid orange' }}
                >
                  <h5 className="  text-3xl font-normal uppercase text-black-2">
                    {data?.stats?.active}
                  </h5>
                  <p className=" my-2 text-lg  text-[#000000]">Active</p>

                  <LinearProgress
                    color="success"
                    variant="determinate"
                    value={60}
                  />
                </div>
              </Grid>
              <Grid className=" px-2" item md={3}>
                <div
                  className="rounded-lg bg-white py-8 px-5"
                  style={{ border: '4px solid orange' }}
                >
                  <h5 className=" text-3xl font-normal uppercase text-black-2">
                    {data?.stats?.open}
                  </h5>
                  <p className=" my-2 text-lg  text-[#000000]">Opened</p>

                  <LinearProgress
                    color="success"
                    variant="determinate"
                    value={60}
                  />
                </div>
              </Grid>
              <Grid className=" px-2" item md={3}>
                <div
                  className="rounded-lg bg-white py-8 px-5"
                  style={{ border: '4px solid orange' }}
                >
                  <h5 className=" text-3xl font-normal uppercase text-black-2">
                    {data?.stats?.close}
                  </h5>
                  <p className=" my-2 text-lg  text-[#000000]">Closed</p>

                  <LinearProgress
                    color="success"
                    variant="determinate"
                    value={60}
                  />
                </div>
              </Grid>
            </Grid>
          </div>

          {loading ? (
            <div className="absolute flex h-full w-full items-center justify-center bg-white">
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
                    {data &&
                      data?.data?.data.map(
                        (data: TicketData, index: number) => (
                          <TableRow className="bg-light" key={data?.contact_id}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{data?.subject}</TableCell>
                            <TableCell>{data?.message}</TableCell>
                            <TableCell>{data?.created_by}</TableCell>
                            <TableCell>{data?.created_at}</TableCell>

                            <TableCell>
                              <Button
                                id="demo-positioned-button"
                                aria-controls={
                                  open ? 'demo-positioned-menu' : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={(e) => handleClick(e, data)}
                                variant="contained"
                                sx={{
                                  backgroundColor: '#04BE5B',
                                  color: '#ffffff',
                                  fontWeight: 600,
                                  textTransform: 'capitalize',
                                  fontSize: '17px',
                                  animation: 'blink 0.8s infinite',
                                }}
                              >
                                Open
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      )}
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
              />
            </Paper>
          )}
        </div>
        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default ActiveTickets;
