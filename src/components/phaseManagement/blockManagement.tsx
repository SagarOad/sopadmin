import axios from '../../api/axios';
import { useState, useEffect, useRef } from 'react';
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
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';


// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Column {
  id:
    | 'BlockName'
    | 'PhaseCenterName'
    | 'capacity'
    | 'startRollNo'
    | 'endRollNo'
    | 'Assignto'
    | 'invigilatorName'
    | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'PhaseCenterName', label: 'Phase Center Name', minWidth: 70 },
  { id: 'BlockName', label: 'Block Name / Number', minWidth: 170 },
  { id: 'invigilatorName', label: 'Invigilator Name', minWidth: 170 },
  {
    id: 'capacity',
    label: 'capacity',
    minWidth: 70,
    align: 'left',
  },
  {
    id: 'startRollNo',
    label: 'Start Roll No',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'endRollNo',
    label: 'End Roll No',
    minWidth: 70,
    align: 'left',
  },

  {
    id: 'action',
    label: 'action',
    minWidth: 70,
    align: 'left',
  },
];

interface RegistrationData {
  id: number;
  user_id: number;
  name: string;
  programId: string;
  controller_name: string;
  controllerId: string;
  shortCode: string;
  district_name: string;
  districtId: string;
  phaseCenter_name: string;
  startRollNo: string;
  capacity: string;
  endRollNo: string;
  action: string;
  registration_no: string;
  invigilator_name: string;
}

const BlockManagement = () => {
  const {
    state: { user },
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const allowedRoles: number[] = [ROLES.ADMIN, ROLES.CONTROLLER];

    if (!checkUserRole(user?.role_id || 0, allowedRoles)) {
      navigate('/');
    }
  }, []);

  const formRef = React.useRef<HTMLFormElement>(null);
  const updateFormRef = React.useRef<HTMLFormElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const [rowId, setRowId] = useState<string | number | null>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RegistrationData[]>([]);
  const [blockData, setBlockData] = useState<RegistrationData[]>([]);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [name, setName] = useState<string>('');
  const [controller, setController] = useState<string>('');
  const [capacity, setCapacity] = useState<string>('');
  const [invigilator, setInvigilator] = useState<string>('');
  const [status, setStatus] = useState<string | number>('');
  const [programData, setProgramData] = useState<RegistrationData[]>([]);
  const [phaseData, setPhaseData] = useState<RegistrationData[]>([]);
  const [rollData, setRollData] = useState<RegistrationData[]>([]);
  const [invigilatorData, setInvigilatorData] = useState<RegistrationData[]>(
    []
  );
  const [program, setProgram] = useState<string>();
  const [phase, setPhase] = useState<string>();
  const [shortCode, setShortCode] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

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

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    prog: RegistrationData
  ) => {
    setAnchorEl(event.currentTarget);
    setRowId(prog?.id);
    setName(prog?.name);
    setPhase(prog?.districtId);
    setProgram(prog?.programId);
    setCapacity(prog?.capacity);
    setController(prog?.controllerId);
    setShortCode(prog?.shortCode);
  };
  const handleEdit = () => {
    setShowModal(true);
    setAnchorEl(null);
  };
  // const handleDelete = async (
  //   e: React.MouseEvent<HTMLLIElement, MouseEvent>
  // ) => {
  //   e.preventDefault();

  //   try {
  //     if (rowId) {
  //       const response = await axios.get(`/deleteBlock`, {
  //         params: {
  //           id: `${user?.user_id}`,
  //           bloack_id: `${rowId}`,
  //         },
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${localStorage.getItem(
  //             '11%13%07%1C%00%0B%00CXPHR%14'
  //           )}`,
  //         },
  //       });
  //       console.log(response.data);
  //       fetchBlock();
  //       setAnchorEl(null);

  //       setRowId('');
  //       setName('');
  //       setProgram('');
  //       setCapacity('');
  //       setController('');
  //       setShortCode('');
  //       setStatus('');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     toast.error('Failed.');
  //   }
  // };
  const handleDelete = () => {
    setShowDeleteModal(true);
    setAnchorEl(null);
  };
  const onDelete = async () => {
    try {
      if (rowId) {
        const response = await axios.get(`/deleteBlock`, {
          params: {
            id: `${user?.user_id}`,
            bloack_id: `${rowId}`,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        fetchBlock();

        setAnchorEl(null);
        setShowDeleteModal(false);
        toast.success(response?.data?.message || 'Successfully Deleted');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    }
  };

  const fetchPhase = async () => {
    try {
      const response = await axios.get(`/getPhaseCenter`, {
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
      setPhaseData(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchInvigilatorList = async () => {
    try {
      const response = await axios.get(`/invigilatorist`, {
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
      setInvigilatorData(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchProgram = async () => {
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

      setProgramData(response.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchBlock = async () => {
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

      setBlockData(response.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPhase();
    fetchProgram();
    fetchBlock();
    fetchInvigilatorList();
  }, []);
  useEffect(() => {
    if (program && phase) {
      fetchDestrict();
    }
  }, [program, phase]);

  const fetchDestrict = async () => {
    try {
      const response = await axios.get(`/getStartRollNo/${program}/${phase}`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setRollData(response?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProgram(e.target.value);
    console.log(e.target.value, 'asdasd');
  };

  const handlePhaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhase(e.target.value);
    console.log(e.target.value, 'asdasd');
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();

    setSubmitting(true)
    try {
      const formData = new FormData();
      // // Append form field values

      formData.append('name', `${name}`);
      formData.append('PhaseCenterid', `${phase}`);
      formData.append('programId', `${program}`);
      formData.append('capacity', `${capacity}`);
      formData.append('startRollNo', `${controller}`);
      formData.append('invigilator_id', `${invigilator}`);
      formData.append('id', `${user?.user_id}`);

      const response = await axios.post(`/createBlock`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      toast.success(response?.data?.message || 'Successful!');
      console.log(response.data);
      fetchBlock();

      setRowId('');
      setName('');
      setProgram('');
      setCapacity('');
      setController('');
      setShortCode('');
      setStatus('');
      setInvigilator('');
      setShowFormModal(false)
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    }finally{
    setSubmitting(false)

    }
  };
  const handleUpdate: React.FormEventHandler<HTMLFormElement> = async (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // // Append form field values

      formData.append('name', `${name}`);
      formData.append('provinceId', `${program}`);
      formData.append('shortCode', `${shortCode}`);
      formData.append('capacity', `${capacity}`);
      formData.append('status_id', `${status}`);
      formData.append('controllerId', `${controller}`);
      formData.append('id', `${user?.user_id}`);

      formData.append('phasecenter_id', `${rowId}`);
      if (rowId) {
        const response = await axios.post(`/updatePhaseCenter`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        console.log(response.data);
        setRowId(null);
        setShowModal(false);

        setRowId('');
        setName('');
        setProgram('');
        setCapacity('');
        setController('');
        setShortCode('');
        setStatus('');
        setInvigilator('');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Block Management" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
         
             <button className="flex mr-2 justify-center rounded bg-[#00A651] p-3 font-medium text-gray" onClick={()=>setShowFormModal(true)}>
             Add Block Management
            </button>
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
                    {blockData &&
                      blockData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((prog) => (
                          <TableRow className="bg-light" key={prog?.id}>
                            <TableCell>{prog?.phaseCenter_name}</TableCell>
                            <TableCell>{prog?.name}</TableCell>
                            <TableCell>{prog?.invigilator_name}</TableCell>
                            <TableCell>{prog?.capacity}</TableCell>
                            <TableCell>{prog?.startRollNo}</TableCell>
                            <TableCell>{prog?.endRollNo}</TableCell>

                            <TableCell>
                              <div className=' flex justify-center'>
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
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
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




      {showFormModal ? (
        <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="absolute bg-black w-full h-full -z-10 opacity-30"></div>
          <div className="md:w-[50%] w-[95%] p-2 rounded-lg bg-[#ffff]  dark:bg-boxdark md:mb-6 md:p-7">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="programName">
                  Block Name / Number
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  id="programName"
                  placeholder="Enter Name"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="programName">
                  Phase Center:
                </label>
                <select
                  required
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name=""
                  id=""
                  onChange={handlePhaseChange}
                >
                  <option value={0}>-- Select Phase --</option>

                  {phaseData &&
                    phaseData?.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="programName">
                  Program:
                </label>
                <select
                  required
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name=""
                  id=""
                  onChange={handleProgramChange}
                >
                  <option value="">-- Select Program --</option>

                  {programData &&
                    programData?.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="programName">
                  Roll No.:
                </label>
                <select
                  required
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name=""
                  id=""
                  onChange={(e) => setController(e.target.value)}
                >
                  <option value={0}>-- Select Start Roll No. --</option>

                  {rollData &&
                    rollData?.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.registration_no}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="capacity">
                  Capacity:
                </label>
                <input
                  required
                  type="number"
                  max={50}
                  name="capacity"
                  id="capacity"
                  placeholder="Enter Capacity"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="invigilator_id">
                  Invigilator:
                </label>
                <select
                  required
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="invigilator_id"
                  id="invigilator_id"
                  onChange={(e) => setInvigilator(e.target.value)}
                  value={invigilator}
                >
                  <option value={0}>-- Select Invigilator --</option>

                  {invigilatorData &&
                    invigilatorData?.map((item) => {
                      return (
                        <option key={item.user_id} value={item.user_id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className=" mt-7 text-center flex justify-end gap-2">
            {submitting ? 
            <button
              className="rounded-lg bg-[#cccc] px-8 py-2 font-medium text-white"
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
            </button>
              </>}
            </div>
          </form>
          </div>
        </div>
      ) : null}    
    



    </DefaultLayout>
  );
};

export default BlockManagement;
