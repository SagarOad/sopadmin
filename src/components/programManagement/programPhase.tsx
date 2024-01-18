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
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { ClassicSpinner } from 'react-spinners-kit';
import { checkUserRole } from '../../utils/role';
import { ROLES } from '../../constants/roles';
import { useNavigate } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


interface Column {
  id: 'SNo' | 'Name' | 'Program' | 'Batch' | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'SNo', label: 'S No', minWidth: 70 },
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
    id: 'Batch',
    label: 'Batch',
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

const ProgramPhase = () => {
  const {
    state: { user },
  } = useAuth();

  const navigate = useNavigate();

  React.useEffect(() => {
    const allowedRoles: number[] = [ROLES.ADMIN];
    if (!checkUserRole(user?.role_id || 0, allowedRoles)) {
      navigate('/');
    }
  }, [history]);

  const formRef = React.useRef<HTMLFormElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | number>();
  const [selectedBatch, setSelectedBatch] = useState<string | number>();
  const [loading, setLoading] = useState(true);
  const [batchList, setBatchList] = useState<Phase>();
  const [programList, setProgramList] = useState<Phase>();
  const [phaseList, setPhaseList] = useState<Phase>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [phaseId, setPhaseId] = React.useState<number | null>();
  const [name, setName] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);

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
  const handleClick = (event: React.MouseEvent<HTMLElement>, phase: Phase) => {
    setAnchorEl(event.currentTarget);
    setPhaseId(phase?.id);
    setName(phase?.name);
    setSelectedProgram(phase?.program_id);
    setSelectedBatch(phase?.batch_id);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
      if (phaseId) {
        const response = await axios.get(`/deleteprogramphase`, {
          params: {
            id: `${user?.user_id}`,
            programphase_id: `${phaseId}`,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        console.log(response.data);
        toast.success(response?.data?.message || 'Success');
        fetchPhaseList();
        setAnchorEl(null);
        setShowDeleteModal(false);
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    }
  };

  const fetchProgramList = async () => {
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

  const fetchBatchList = async () => {
    try {
      const response = await axios.get(`/programbatchlist`, {
        params: {
          id: user?.user_id,
          programId: selectedProgram,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setBatchList(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchPhaseList = async () => {
    try {
      const response = await axios.get(`/programphaselist`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setPhaseList(response?.data?.data);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleProgramSelect = (event: { target: { value: any } }) => {
    const selectedValue = event.target.value;
    setSelectedProgram(selectedValue);
  };
  const handleBatchSelect = (event: { target: { value: any } }) => {
    const selectedValue = event.target.value;
    setSelectedBatch(selectedValue);
  };

  React.useEffect(() => {
    if (selectedProgram) {
      fetchBatchList();
    }
  }, [selectedProgram]);

  React.useEffect(() => {
    fetchProgramList();
    fetchPhaseList();
  }, []);


      const CreatePhase = async (e:React.FormEvent) => {

      e.preventDefault();
      setSubmitting(true)

        if (formRef.current) {
          const formData = new FormData(formRef.current);

          formData.append('id', `${user?.user_id}`);
          const response = await axios.post(`/saveprogramphase`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem(
                '11%13%07%1C%00%0B%00CXPHR%14'
              )}`,
            },
          });
          toast.success(response?.data?.message || 'Success');
          console.log(response);
          fetchPhaseList();
        }
setSubmitting(false)
setShowFormModal(false)
      };

      const UpdatePhase = async (e:React.FormEvent) => {
      e.preventDefault();

        if (formRef.current) {
          const formData = new FormData(formRef.current);

          formData.append('programphase_id', `${phaseId}`);
          formData.append('id', `${user?.user_id}`);
          const response = await axios.post(`/updateprogramphase`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem(
                '11%13%07%1C%00%0B%00CXPHR%14'
              )}`,
            },
          });
          toast.success(response?.data?.message || 'Success');
          console.log(response);
          fetchPhaseList();
          setSelectedProgram('');
          setSelectedBatch('');
          setName('');
          setShowModal(false);
        }
      };

      // if (formRef.current) {
      //   if (phaseId) {
      //     try {
      //       UpdatePhase();
      //     } catch (e) {
      //       console.error(e);
      //     }
      //   } else {
      //     try {
      //       CreatePhase();
      //     } catch (e) {
      //       console.error(e);
      //     }
      //   }
      // }
 

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Program Management / Program Phase" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
         
          <button className="flex mr-2 justify-center rounded bg-[#00A651] p-3 font-medium text-gray" onClick={()=>setShowFormModal(true)}>
             Add Program Phase
            </button>
        </div>
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          {/* <h3 className=" my-5 mb-4 text-center text-2xl text-black-2">
            Program Phases{' '}
          </h3> */}
          {loading ? (
            <div className=" flex h-full w-full items-center justify-center bg-white">
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
                    {phaseList &&
                      phaseList
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((phase: Phase, index: number) => (
                          <TableRow className="bg-light" key={phase?.id}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{phase?.name}</TableCell>
                            <TableCell>{phase?.program_name}</TableCell>
                            <TableCell>{phase?.batch_name}</TableCell>

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
                rowsPerPageOptions={[30, 50, 100]}
                component="div"
                count={phaseList?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          )}
        </div>
        {showModal ? (
          <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#0000006e] outline-none focus:outline-none">
            <div className="w-[50%] rounded-lg  bg-white md:mb-6 md:p-7">
              <h3 className=" mb-4 text-center text-4xl text-black-2">
                Update Program Phase
              </h3>
              <form ref={formRef} onSubmit={UpdatePhase}>
                <div className="grid grid-cols-1 gap-4">
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2" htmlFor="Name">
                      Program Phase Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="Name"
                      placeholder="Enter Phase Name"
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2 " htmlFor="programName">
                      Program
                    </label>
                    <select
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      name="program_id"
                      id=""
                      onChange={handleProgramSelect}
                      value={selectedProgram}
                    >
                      <option value=""> -- Please Select --</option>
                      {programList &&
                        programList.map((data) => (
                          <option value={data?.id} key={data?.id}>
                            {data?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2 " htmlFor="programName">
                      Batch
                    </label>
                    <select
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      name="batch_id"
                      id=""
                      onChange={handleBatchSelect}
                      value={selectedBatch}
                    >
                      <option value=""> -- Please Select --</option>
                      {batchList &&
                        batchList.map((data) => (
                          <option value={data?.id} key={data?.id}>
                            {data?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className=" mt-7 text-center">
                  <button
                    ref={btnRef}
                    type="submit"
                    className="mx-2  rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mx-2 rounded-lg bg-[red] px-8 py-2 font-medium text-white"
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
          <div className="absolute bg-black w-full h-full -z-10 opacity-30"></div>
          <div className="md:w-[50%] w-[95%] p-2 rounded-lg bg-[#ffff]  dark:bg-boxdark md:mb-6 md:p-7">
          <form ref={formRef} onSubmit={CreatePhase}>
            <div className="grid grid-cols-1 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="Name">
                  Program Phase Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  id="Name"
                  placeholder="Enter Phase Name"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="programName">
                  Program
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="program_id"
                  id=""
                  onChange={handleProgramSelect}
                  required

                >
                  <option value=""> -- Please Select --</option>
                  {programList &&
                    programList.map((data) => (
                      <option value={data?.id} key={data?.id}>
                        {data?.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="programName">
                  Batch
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="batch_id"
                  id=""
                  onChange={handleBatchSelect}
                  required
                >
                  <option value=""> -- Please Select --</option>
                  {batchList &&
                    batchList.map((data) => (
                      <option value={data?.id} key={data?.id}>
                        {data?.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className=" mt-7 text-center flex justify-end gap-2">
              {submitting ?  <button
              className="rounded-lg bg-[#cccc] px-8 py-2 font-medium text-black"
            >
              Submitting...
            </button> : <>
              <button
                ref={btnRef}
                type="submit"
                className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
              >
                Submit
              </button>
              <button
              className="rounded-lg bg-[#be0404] px-8 py-2 font-medium text-white"
onClick={()=>setShowFormModal(false)}
            >
              Close
            </button></> }
            </div>
          </form>
          </div>
        </div>
      ) : null}




    </DefaultLayout>
  );
};

export default ProgramPhase;
