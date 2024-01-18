import axios from '../api/axios';
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

import { useAuth } from '../context/AuthContext';
import { ClassicSpinner } from 'react-spinners-kit';
import { Menu, MenuItem } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Column {
  id:
    | 'Name'
    | 'code'
    | 'startYear'
    | 'endYear'
    | 'description'
    | 'status'
    | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'Name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'code', minWidth: 100 },
  {
    id: 'startYear',
    label: 'start Year',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'endYear',
    label: 'end Year',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'description',
    label: 'description',
    minWidth: 270,
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

interface RegistrationData {
  id: number;
  name: string;
  status_id: number;
  code: string;
  startYear: string;
  endYear: string;
  description: string;
  status: string;
  action: string;
}

const ProgRegister = ({ setActiveTab }: any) => {
  const {
    state: { user },
  } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowId, setRowId] = useState<string | number | null>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RegistrationData[]>([]);
  const [name, setName] = useState(' ');
  const [description, setDescription] = useState(' ');
  const [code, setCode] = useState(' ');
  const [startYear, setStartYear] = useState(' ');
  const [endYear, setEndYear] = useState(' ');
  const [status, setStatus] = useState<string | number>(' ');
  const [submitting, setSubmitting] = useState<boolean>(false);

  // const user = localStorage.getItem('user') || null;
  // const userData = user ? JSON.parse(user) : null;

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
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    prog: RegistrationData
  ) => {
    setAnchorEl(event.currentTarget);
    setRowId(prog?.id);
    setName(prog?.name);
    setDescription(prog?.description);
    setStartYear(prog?.startYear);
    setEndYear(prog?.endYear);
    setCode(prog?.code);
    setStatus(prog?.status_id);
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
        const response = await axios.get(`/deleteprogram`, {
          params: {
            id: `${user?.user_id}`,
            program_id: `${rowId}`,
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
      setLoading(false);
      setData(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
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
      formData.append('startYear', startYear);
      formData.append('endYear', endYear);
      formData.append('status_id', `${status}`);
      formData.append('id', `${user?.user_id}`);

      // setSuccess(true);
      if (rowId) {
        formData.append('program_id', `${rowId}`);

        const response = await axios.post(`/updateprogram`, formData, {
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
        setShowFormModal(false);
      } else {
        const response = await axios.post(`/saveprogram`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        toast.success('Registration successful!');
        console.log(response.data);
        fetchData();
        // setActiveTab(1);
      }
    } catch (err) {
      console.log(err);
      toast.error('Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="block p-6 ">
        <div className="flex w-[100%] justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <button
            className="mr-2 flex w-[150px] justify-center rounded bg-[#00A651] p-3 font-medium text-gray"
            onClick={() => setShowFormModal(true)}
          >
            Add Program
          </button>
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
                    {data &&
                      data
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((prog) => {
                          const dateStart = prog.startYear.split('-');
                          const newStart = `${dateStart[1]}-${dateStart[2]}-${dateStart[0]}`;

                          const dateEnd = prog.endYear.split('-');
                          const newEnd = `${dateEnd[1]}-${dateEnd[2]}-${dateEnd[0]}`;
                          return (
                            <TableRow className="bg-light" key={prog?.id}>
                              <TableCell>{prog?.name}</TableCell>
                              <TableCell>{prog?.code}</TableCell>
                              <TableCell>{newStart}</TableCell>
                              <TableCell>{newEnd}</TableCell>
                              <TableCell>{prog?.description}</TableCell>
                              <TableCell>
                                {prog?.status_id == 1 ? 'Active' : 'Non-Active'}
                              </TableCell>

                              {/* <TableCell>
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
                                backgroundColor: 'orange',
                                color: '#ffffff',
                                fontWeight: 600,
                                textTransform: 'capitalize',
                                fontSize: '17px',
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell> */}
                              <TableCell>
                                {/* <Button
                              id="demo-positioned-button"
                              aria-controls={
                                open ? 'demo-positioned-menu' : undefined
                              }
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              onClick={(event) => handleClick(event, prog)}
                              sx={{
                                color: '#04BE5B',
                                fontSize: '20px',
                              }}
                            >
<i className="fa-solid fa-ellipsis-vertical"></i>
                            </Button> */}
                                <div className=' flex justify-center'>
                                  <MenuItem onClick={handleEdit}>
                                   <EditIcon />
                                  </MenuItem>
                                  <MenuItem onClick={handleDelete}>
                                    <DeleteIcon />
                                  </MenuItem>
                                </div>
                                {/* <Menu
                              id="demo-positioned-menu"
                              aria-labelledby="demo-positioned-button"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                            >
                             
                            </Menu> */}
                              </TableCell>
                            </TableRow>
                          );
                        })}
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

        {showModal ? (
          <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="w-[50%] rounded-lg bg-[#d1d1d1] p-0 dark:bg-boxdark md:mb-6 md:p-7">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2" htmlFor="programName">
                      Program Name
                    </label>
                    <input
                      value={name}
                      type="text"
                      name="name"
                      id="programName"
                      placeholder="Enter Program Name"
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2" htmlFor="description">
                      Description
                    </label>
                    <input
                      value={description}
                      type="text"
                      name="name"
                      id="description"
                      placeholder="Enter Description"
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2 " htmlFor="startYear">
                      Year From:
                    </label>
                    <input
                      value={startYear}
                      type="Date"
                      name="name"
                      id="startYear"
                      placeholder="Enter Year From"
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => setStartYear(e.target.value)}
                    />
                  </div>
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2 " htmlFor="endYear">
                      Year to:
                    </label>
                    <input
                      value={endYear}
                      type="Date"
                      name="name"
                      id="endYear"
                      placeholder="Enter Description"
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => setEndYear(e.target.value)}
                    />
                  </div>
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2 " htmlFor="code">
                      Short Code
                    </label>
                    <input
                      value={code}
                      type="text"
                      name="name"
                      id="code"
                      required
                      placeholder="Enter Short Code"
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2 " htmlFor="programName">
                      Status:
                    </label>
                    <select
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      name=""
                      id=""
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                    >
                      <option value=""> -- Please Select --</option>
                      <option value="1">Active</option>
                      <option value="2">Non-Active</option>
                    </select>
                  </div>
                </div>
                <div className=" mt-7 text-center">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="mx-1 rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    type="submit"
                    className="mx-4 rounded-lg bg-[#be0404] px-8 py-2 font-medium text-white"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
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
        <ToastContainer />
      </div>

      {showFormModal ? (
        <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="absolute -z-10 h-full w-full bg-black opacity-30"></div>
          <div className="w-[95%] rounded-lg bg-[#ffff] p-2 dark:bg-boxdark  md:mb-6 md:w-[50%] md:p-7">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="programName">
                    Program Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="programName"
                    placeholder="Enter Program Name"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="description">
                    Description
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="description"
                    placeholder="Enter Description"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2 " htmlFor="startYear">
                    Year From:
                  </label>
                  <input
                    type="Date"
                    name="name"
                    id="startYear"
                    placeholder="Enter Year From"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    onChange={(e) => setStartYear(e.target.value)}
                  />
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2 " htmlFor="endYear">
                    Year to:
                  </label>
                  <input
                    type="Date"
                    name="name"
                    id="endYear"
                    placeholder="Enter Description"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    onChange={(e) => setEndYear(e.target.value)}
                  />
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2 " htmlFor="code">
                    Program Code
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="code"
                    required
                    placeholder="Enter Program Code"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2 " htmlFor="programName">
                    Status:
                  </label>
                  <select
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    name=""
                    id=""
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value=""> -- Please Select --</option>
                    <option value="1">Active</option>
                    <option value="2">Non-Active</option>
                  </select>
                </div>
              </div>
              <div className=" mt-7 flex justify-end gap-2 text-center">
                {submitting ? (
                  <button className="rounded-lg bg-[#cccccc] px-8 py-2 font-medium text-black">
                    Submitting...
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
                    >
                      Submit
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
    </>
  );
};

export default ProgRegister;
