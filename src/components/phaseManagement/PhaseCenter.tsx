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
import { checkUserRole } from '../../utils/role';
import { ROLES } from '../../constants/roles';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Column {
  id:
    | 'Name'
    | 'District'
    | 'Province'
    | 'Address'
    | 'Staus'
    | 'Assignto'
    | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'Name', label: 'Name', minWidth: 170 },
  { id: 'District', label: 'District', minWidth: 70 },
  {
    id: 'Province',
    label: 'Province',
    minWidth: 70,
    align: 'left',
  },
  {
    id: 'Address',
    label: 'Address',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'Staus',
    label: 'Status',
    minWidth: 70,
    align: 'left',
  },
  {
    id: 'Assignto',
    label: 'Assign To',
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
  status_id: number;
  controller_name: string;
  controllerId: string;
  shortCode: string;
  district_name: string;
  districtId: string;
  province_name: string;
  provinceId: string;
  address: string;
  status: string;
  action: string;
}

const PhaseCenter = () => {
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
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showFormModal, setShowFormModal] = React.useState(false);

  const [rowId, setRowId] = useState<string | number | null>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RegistrationData[]>([]);
  const [controllerData, setControllerData] = useState<RegistrationData[]>([]);
  const [name, setName] = useState<string>('');
  const [controller, setController] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [status, setStatus] = useState<string | number>('');
  const [provinceData, setProvinceData] = useState<RegistrationData[]>([]);
  const [destrictData, setDestrictData] = useState<RegistrationData[]>([]);
  const [province, setProvince] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
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
    setDistrict(prog?.districtId);
    setProvince(prog?.provinceId);
    setAddress(prog?.address);
    setController(prog?.controllerId);
    setShortCode(prog?.shortCode);
    setStatus(prog?.status_id);
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
  //       const response = await axios.get(`/deletePhaseCenter`, {
  //         params: {
  //           id: `${user?.user_id}`,
  //           phasecenter_id: `${rowId}`,
  //         },
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${localStorage.getItem(
  //             '11%13%07%1C%00%0B%00CXPHR%14'
  //           )}`,
  //         },
  //       });
  //       console.log(response.data);
  //       fetchData();
  //       setAnchorEl(null);
  //       setRowId('');
  //       setName('');
  //       setDistrict('');
  //       setProvince('');
  //       setAddress('');
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
        const response = await axios.get(`/deletePhaseCenter`, {
          params: {
            id: `${user?.user_id}`,
            phasecenter_id: `${rowId}`,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        fetchData();
        setAnchorEl(null);
        setRowId('');
        setName('');
        setDistrict('');
        setProvince('');
        setAddress('');
        setController('');
        setShortCode('');
        setStatus('');
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
      setData(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchProvince = async () => {
    try {
      const response = await axios.get(`/get-province`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      setProvinceData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchController = async () => {
    try {
      const response = await axios.get(`/controllerlist`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      setControllerData(response.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProvince();
    fetchController();
  }, []);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProvince(e.target.value);
    if (province) {
      const fetchDestrict = async () => {
        try {
          const response = await axios.get(`/get-district`, {
            params: {
              provinceId: e.target.value,
              id: user?.user_id,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                '11%13%07%1C%00%0B%00CXPHR%14'
              )}`,
            },
          });

          setDestrictData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchDestrict();
    }
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      const formData = new FormData();

      // // Append form field values

      formData.append('name', `${name}`);
      formData.append('districtId', `${district}`);
      formData.append('provinceId', `${province}`);
      formData.append('shortCode', `${shortCode}`);
      formData.append('address', `${address}`);
      formData.append('status_id', `${status}`);
      formData.append('controllerId', `${controller}`);
      formData.append('id', `${user?.user_id}`);

      const response = await axios.post(`/savePhaseCenter`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      toast.success(response?.data?.message || 'Successful!');
      console.log(response.data);
      fetchData();

      setRowId('');
      setName('');
      setDistrict('');
      setProvince('');
      setAddress('');
      setController('');
      setShortCode('');
      setStatus('');
      setShowFormModal(false);
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    } finally {
      setSubmitting(false);
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
      formData.append('districtId', `${district}`);
      formData.append('provinceId', `${province}`);
      formData.append('shortCode', `${shortCode}`);
      formData.append('address', `${address}`);
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
        fetchData();
        setShowModal(false);
        setShowFormModal(false);

        setRowId('');
        setName('');
        setDistrict('');
        setProvince('');
        setAddress('');
        setController('');
        setShortCode('');
        setStatus('');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Phase Center" />
      <div className="block p-6 ">
        <div className="flex w-[100%] justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          {/* <form ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="programName">
                  Phase Center Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  id="programName"
                  placeholder="Enter Program Name"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="programName">
                  Province:
                </label>
                <select
                  required
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name=""
                  id=""
                  onChange={handleProvinceChange}
                >
                  <option value="">Select Provice</option>

                  {provinceData &&
                    provinceData?.map((item) => {
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
                  District:
                </label>
                <select
                  required
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name=""
                  id=""
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  <option value={0}>Select District</option>

                  {destrictData &&
                    destrictData?.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="endYear">
                  Address:
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  id="endYear"
                  placeholder="Enter Description"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="programName">
                  Controller:
                </label>
                <select
                  required
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name=""
                  id=""
                  onChange={(e) => setController(e.target.value)}
                >
                  <option value={0}>Select Controller</option>

                  {controllerData &&
                    controllerData?.map((item) => {
                      return (
                        <option key={item.user_id} value={item.user_id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="endYear">
                  Short Code:
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  id="endYear"
                  placeholder="Enter Description"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setShortCode(e.target.value)}
                />
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="programName">
                  Status:
                </label>
                <select
                  required
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
            <div className=" mt-7 text-center">
              <button
                ref={btnRef}
                type="submit"
                className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
              >
                Submit
              </button>
            </div>
          </form> */}

          <button
            className="mr-2 flex justify-center rounded bg-[#00A651] p-3 font-medium text-gray"
            onClick={() => setShowFormModal(true)}
          >
            Add Phase Center
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
                        .map((prog) => (
                          <TableRow className="bg-light" key={prog?.id}>
                            <TableCell>{prog?.name}</TableCell>
                            <TableCell>{prog?.district_name}</TableCell>
                            <TableCell>{prog?.province_name}</TableCell>
                            <TableCell>{prog?.address}</TableCell>

                            <TableCell>
                              {prog?.status_id == 1 ? 'Active' : 'None-Active'}
                            </TableCell>
                            <TableCell>{prog?.controller_name}</TableCell>

                            <TableCell>
                              <div className=' flex justify-center'>
                                <MenuItem onClick={() => handleEdit()}>
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
          <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#0000006e] outline-none focus:outline-none">
            <div className="w-[50%] rounded-lg bg-[#d3d3d3] p-0 dark:bg-boxdark md:mb-6 md:p-7">
              <form ref={updateFormRef} onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 gap-4">
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2" htmlFor="programName">
                      Phase Center Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      id="programName"
                      placeholder="Enter Program Name"
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2 " htmlFor="programName">
                      Province:
                    </label>
                    <select
                      required
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      name=""
                      id=""
                      onChange={handleProvinceChange}
                      value={province}
                    >
                      <option value="">Select Provice</option>

                      {provinceData &&
                        provinceData?.map((item) => {
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
                      District:
                    </label>
                    <select
                      required
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      name=""
                      id=""
                      onChange={(e) => setDistrict(e.target.value)}
                      value={district}
                    >
                      <option value={0}>Select District</option>

                      {destrictData &&
                        destrictData?.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2 " htmlFor="endYear">
                      Address:
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      id="endYear"
                      placeholder="Enter Description"
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                    />
                  </div>
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2 " htmlFor="programName">
                      Controller:
                    </label>
                    <select
                      required
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      name=""
                      id=""
                      onChange={(e) => setController(e.target.value)}
                      value={controller}
                    >
                      <option value={0}>Select Controller</option>

                      {controllerData &&
                        controllerData?.map((item) => {
                          return (
                            <option key={item.user_id} value={item.user_id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2 " htmlFor="endYear">
                      Short Code:
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      id="endYear"
                      placeholder="Enter Description"
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => setShortCode(e.target.value)}
                      value={shortCode}
                    />
                  </div>
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2 " htmlFor="programName">
                      Status:
                    </label>
                    <select
                      required
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
                    ref={btnRef}
                    type="submit"
                    className="mx-2 rounded-lg bg-[orange] px-8 py-2 font-medium text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mx-2 rounded-lg bg-[#ff0000] px-8 py-2 font-medium text-white"
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
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="programName">
                    Phase Center Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    id="programName"
                    placeholder="Enter Program Name"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2 " htmlFor="programName">
                    Province:
                  </label>
                  <select
                    required
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    name=""
                    id=""
                    onChange={handleProvinceChange}
                  >
                    <option value="">Select Provice</option>

                    {provinceData &&
                      provinceData?.map((item) => {
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
                    District:
                  </label>
                  <select
                    required
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    name=""
                    id=""
                    onChange={(e) => setDistrict(e.target.value)}
                  >
                    <option value={0}>Select District</option>

                    {destrictData &&
                      destrictData?.map((item) => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2 " htmlFor="endYear">
                    Address:
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    id="endYear"
                    placeholder="Enter Description"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2 " htmlFor="programName">
                    Controller:
                  </label>
                  <select
                    required
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    name=""
                    id=""
                    onChange={(e) => setController(e.target.value)}
                  >
                    <option value={0}>Select Controller</option>

                    {controllerData &&
                      controllerData?.map((item) => {
                        return (
                          <option key={item.user_id} value={item.user_id}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2 " htmlFor="endYear">
                    Short Code:
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    id="endYear"
                    placeholder="Enter Description"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    onChange={(e) => setShortCode(e.target.value)}
                  />
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2 " htmlFor="programName">
                    Status:
                  </label>
                  <select
                    required
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
                  <button className="rounded-lg bg-[#cccc] px-8 py-2 font-medium text-black">
                    submitting...
                  </button>
                ) : (
                  <>
                    <button
                      ref={btnRef}
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
    </DefaultLayout>
  );
};

export default PhaseCenter;
