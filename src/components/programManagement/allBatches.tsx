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
import { useAuth } from '../../context/AuthContext';
import { ClassicSpinner } from 'react-spinners-kit';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';
import { useNavigate } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface RegistrationData {
  id: number;
  name: string;
  status_id: number;
  programId: number;
  code: string;
  startDate: string;
  endDate: string;
  description: string;
  status: string;
  action: string;
  program_name: string;
}
interface Column {
  id:
    | 'Name'
    | 'Program'
    | 'Description'
    | 'StartDate'
    | 'EndDate'
    | 'status'
    | 'AssignedTo'
    | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'Name', label: 'id', minWidth: 30 },
  { id: 'Name', label: 'Name', minWidth: 30 },
  {
    id: 'Program',
    label: 'Program',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'Description',
    label: 'Description',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'StartDate',
    label: 'Start Date',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'EndDate',
    label: 'End Date',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'status',
    label: 'status',
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

const AllBatches = () => {
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
  const [rowId, setRowId] = React.useState<string | number | null>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showModal, setShowModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [programList, setProgramList] = React.useState([]);
  const [batchList, setBatchList] = React.useState([]);
  const [name, setName] = React.useState(' ');
  const [proram, setProgram] = React.useState<number | string>();
  const [description, setDescription] = React.useState(' ');
  const [code, setCode] = React.useState(' ');
  const [startYear, setStartYear] = React.useState(' ');
  const [endYear, setEndYear] = React.useState(' ');
  const [status, setStatus] = React.useState<string | number>(' ');
  const [submitting, setSubmitting] = React.useState<boolean>(false);

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
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    batch: RegistrationData
  ) => {
    setAnchorEl(event.currentTarget);
    setRowId(batch?.id);
    setName(batch?.name);
    setProgram(batch?.programId);
    setDescription(batch?.description);
    setStartYear(batch?.startDate);
    setEndYear(batch?.endDate);
    setCode(batch?.code);
    setStatus(batch?.status_id);
  };
  const handleEdit = () => {
    setShowModal(true);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
    setAnchorEl(null);
  };
  const onDelete = async () => {
    try {
      if (rowId) {
        const response = await axios.get(`/deletebatch`, {
          params: {
            id: `${user?.user_id}`,
            batch_id: `${rowId}`,
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
        setRowId('');
        setName('');
        setProgram('');
        setDescription('');
        setStartYear('');
        setEndYear('');
        setCode('');
        setStatus('');
        setAnchorEl(null);
        setShowDeleteModal(false);
        toast.success(response?.data?.message || 'Successfully Deleted');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`/batchlist`, {
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
      setBatchList(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchProgramData = async () => {
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

      setProgramList(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
    fetchProgramData();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();

      // // Append form field values

      formData.append('name', name);
      formData.append('description', description);
      formData.append('code', code);
      formData.append('startDate', startYear);
      formData.append('endDate', endYear);
      formData.append('status_id', `${status}`);
      formData.append('id', `${user?.user_id}`);
      formData.append('programId', `${proram}`);

      toast.success('Registration successful!');

      // setSuccess(true);
      if (rowId) {
        formData.append('batch_id', `${rowId}`);

        const response = await axios.post(`/updatebatch`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        console.log(response.data);
        setRowId(null);
        fetchData();
        setShowModal(false);

        setRowId('');
        setName('');
        setProgram('');
        setDescription('');
        setStartYear('');
        setEndYear('');
        setCode('');
        setStatus('');
      } else {
        const response = await axios.post(`/savebatch`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        console.log(response.data);
        fetchData();
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
      toast.error('Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Program Management / All Batches" />
      <div className="block p-6 ">
        <div className="flex w-[100%] justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <div className=" my-7 text-start">
            <button
              type="button"
              className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
              onClick={() => setShowModal(true)}
            >
              Add Batch
            </button>
          </div>
          <div>
            {showModal ? (
              <>
                <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#0000006e] outline-none focus:outline-none">
                  <div className="w-[62%] bg-white">
                    <div className="w-[100%] p-4 md:p-6">
                      <h3 className="mb-3 text-[22px] font-normal text-black">
                        Add Program Batch
                      </h3>
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="mt-1 outline-none dark:bg-boxdark">
                            <label
                              className="text-black-2 "
                              htmlFor="programName"
                            >
                              Program:
                            </label>
                            <select
                              className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                              name=""
                              required
                              id=""
                              onChange={(e) => setProgram(e.target.value)}
                              value={proram}
                            >
                              <option value=""> -- Please Select --</option>

                              {programList.map((data: RegistrationData) => (
                                <option value={data?.id}>{data?.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="mt-1 outline-none dark:bg-boxdark">
                            <label
                              className="text-black-2 "
                              htmlFor="programName"
                            >
                              Name
                            </label>
                            <input
                              value={name}
                              type="text"
                              required
                              name="name"
                              id="programName"
                              placeholder="Enter batch name"
                              className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="mt-1 outline-none dark:bg-boxdark">
                            <label
                              className="text-black-2 "
                              htmlFor="programName"
                            >
                              Code
                            </label>
                            <input
                              value={code}
                              type="text"
                              required
                              name="name"
                              id="programName"
                              placeholder="Code"
                              className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                              onChange={(e) => setCode(e.target.value)}
                            />
                          </div>
                          <div className="mt-1 outline-none dark:bg-boxdark">
                            <label
                              className="text-black-2"
                              htmlFor="programName"
                            >
                              Description
                            </label>
                            <input
                              value={description}
                              type="text"
                              name="name"
                              required
                              id="programName"
                              placeholder="Description"
                              className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                          <div className="mt-1 outline-none dark:bg-boxdark">
                            <label
                              className="text-black-2"
                              htmlFor="programName"
                            >
                              Start Date
                            </label>
                            <input
                              value={startYear}
                              type="date"
                              name="name"
                              required
                              id="programName"
                              placeholder="Description"
                              className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                              onChange={(e) => setStartYear(e.target.value)}
                            />
                          </div>
                          <div className="mt-1 outline-none dark:bg-boxdark">
                            <label
                              className="text-black-2"
                              htmlFor="programName"
                            >
                              End Date
                            </label>
                            <input
                              value={endYear}
                              type="date"
                              name="name"
                              required
                              id="programName"
                              placeholder="Description"
                              className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                              onChange={(e) => setEndYear(e.target.value)}
                            />
                          </div>
                          <div className="mt-1 outline-none dark:bg-boxdark">
                            <label
                              className="text-black-2 "
                              htmlFor="programName"
                            >
                              Status:
                            </label>
                            <select
                              className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                              name=""
                              id=""
                              required
                              onChange={(e) => setStatus(e.target.value)}
                              value={status}
                            >
                              <option value=""> -- Please Select --</option>
                              <option value="1">Active</option>
                              <option value="2">Non-Active</option>
                            </select>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end">
                          {submitting ? (
                            <button className="rounded-lg bg-[#cccc] py-2 px-8 text-[16px] text-white">
                              Submitting...
                            </button>
                          ) : (
                            <>
                              {' '}
                              <button
                                type="submit"
                                className="mx-2 rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
                              >
                                Submit
                              </button>
                              <button
                                onClick={() => setShowModal(false)}
                                className="rounded-lg bg-[#E72E2E] py-2 px-8 text-[16px] text-white"
                              >
                                Close
                              </button>{' '}
                            </>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
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
          </div>
        </div>
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
                    {/* {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell  key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })} */}
                    {batchList &&
                      batchList
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((batch: RegistrationData, index) => (
                          <TableRow className="bg-light" key={1}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{batch?.name}</TableCell>
                            <TableCell>{batch?.program_name}</TableCell>
                            <TableCell>{batch?.description}</TableCell>
                            <TableCell>{batch?.startDate}</TableCell>
                            <TableCell>{batch?.endDate}</TableCell>
                            <TableCell>
                              {batch?.status_id == 1 ? 'Active' : 'None-Active'}
                            </TableCell>
                            <TableCell>
                              <div className=" flex justify-center">
                                <MenuItem onClick={handleEdit}>
                                  <EditIcon />
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
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={batchList?.length}
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

export default AllBatches;
