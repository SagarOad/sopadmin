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
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { ClassicSpinner } from 'react-spinners-kit';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const xorEncrypt = (data: string, key: string) => {
  const encryptedData = data.split('').map((char: string, i: number) => {
    const keyChar = key.charCodeAt(i % key.length);
    const encryptedChar = char.charCodeAt(0) ^ keyChar;
    return String.fromCharCode(encryptedChar);
  });
  return encryptedData.join('');
};

interface Column {
  id: 'ID' | 'Email' | 'Name' | 'Phone' | 'Address' | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'ID', label: 'ID', minWidth: 80 },
  {
    id: 'Name',
    label: 'Name',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'Email',
    label: 'Email',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'Phone',
    label: 'Phone',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'Address',
    label: 'Address',
    minWidth: 100,
    align: 'left',
  },

  {
    id: 'action',
    label: 'action',
    minWidth: 170,
    align: 'left',
  },
];

const AllUsers = () => {
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

  const formRef = React.useRef<HTMLFormElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const [page, setPage] = React.useState(1);
  const [rolesData, setRolesData] = React.useState<User>();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<User>();
  const [total, settotal] = React.useState(0);
  const [userId, setUserId] = React.useState(0);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [dob, setDOB] = React.useState<string | number>();
  const [phone, setPhone] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [role, setRole] = React.useState<string | number>();
  const [showModal, setShowModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const [profile, setProfile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setProfile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = () => {
    setPreviewImage(null);
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>, data: User) => {
    setAnchorEl(event.currentTarget);
    setUserId(data.user_id);
    setName(data.name);
    setEmail(data.email);
    setDOB(data.dob);
    setGender(data.gender);
    setRole(data.role_id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleDelete = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   try {
  //     if (userId) {
  //       const response = await axios.post(
  //         `/deleteuser`,
  //         {
  //           userId,
  //           id: user?.user_id,
  //         },
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${localStorage.getItem(
  //               '11%13%07%1C%00%0B%00CXPHR%14'
  //             )}`,
  //           },
  //         }
  //       );
  //       console.log(response.data, 'delete');
  //       toast.success(response?.data?.message || 'Success');
  //       fetchData();
  //     }
  //   } catch (e) {
  //     toast.error('Faild');
  //   }
  // };

  const handleDelete = () => {
    setShowDeleteModal(true);
    setAnchorEl(null);
  };
  const onDelete = async () => {
    try {
      if (userId) {
        const response = await axios.get(`/deleteuser`, {
          params: {
            id: `${user?.user_id}`,
            userId: `${userId}`,
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

  const handleEdit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      setShowModal(true);

      // navigate(`/user-management/update-user?${encryptedUserData}`);
    } catch (e) {
      console.log(e);
    }
  };
  const handleOffer = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      window.open(`/offerletter?${name}`);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`/userlist`, {
        params: {
          id: user?.user_id,
          page: page,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setLoading(false);
      setData(response?.data?.data);
      settotal(response?.data?.data?.total);
      setPage(response?.data?.data?.current_page);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [page]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (formRef.current) {
        const formData = new FormData(formRef.current);

        formData.append('image', profile || '-');
        formData.append('userId', `${userId}`);
        formData.append(' id', `${user?.user_id}`);

        const response = await axios.post(`/updateuser`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        console.log(response.data);
        toast.success('Update successful!');
        fetchData();
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
      toast.error('Update failed.');
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`/rolelist`, {
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
      setRolesData(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Management / All Users" />
      <div className="block p-6 ">
        {loading ? (
          <div className="absolute flex h-full w-full items-center justify-center bg-white">
            <ClassicSpinner color="#04BE5B" />
          </div>
        ) : (
          <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
            <div>
              {showModal ? (
                <>
                  <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#00000091] outline-none focus:outline-none">
                    <div className="w-[62%] bg-white">
                      <div className="w-[100%] p-4 md:p-6">
                        <h3 className="mb-3 text-[22px] font-normal text-black">
                          User
                        </h3>
                        <form>
                          <div className="grid grid-cols-1 gap-4 text-center">
                            <div className="profile_uploadBtn m-auto mb-5 text-center">
                              {previewImage === null ? (
                                <Button variant="text" component="label">
                                  <CameraAltRoundedIcon
                                    sx={{ color: '#000000' }}
                                  />
                                  <input
                                    hidden
                                    className="form-control"
                                    id="vehicleImages"
                                    accept=".png,.jpg,.jpeg"
                                    required
                                    type="file"
                                    onChange={handleFileChange}
                                  />
                                </Button>
                              ) : (
                                <div className="text-center ">
                                  {previewImage && (
                                    <div className="profileImg_preview">
                                      <>
                                        <button
                                          className="cancelBtn"
                                          type="button"
                                          onClick={resetImage}
                                        >
                                          x
                                        </button>
                                        <img
                                          className=""
                                          src={previewImage}
                                          alt="user img"
                                        />
                                      </>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="mt-1 outline-none dark:bg-boxdark">
                              <label
                                className="text-black-2"
                                htmlFor="programName"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="programName"
                                required
                                placeholder="Enter Name"
                                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                                // onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div className="mt-1 outline-none dark:bg-boxdark">
                              <label
                                className="text-black-2"
                                htmlFor="programName"
                              >
                                Email
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="programName"
                                required
                                placeholder="Enter Email"
                                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                                // onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div className="mt-1 outline-none dark:bg-boxdark">
                              <label
                                className="text-black-2"
                                htmlFor="programName"
                              >
                                Phone
                              </label>
                              <input
                                type="phone"
                                name="name"
                                id="programName"
                                required
                                placeholder="Enter Phone"
                                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                                // onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div className="mt-1 outline-none dark:bg-boxdark">
                              <label
                                className="text-black-2 "
                                htmlFor="programName"
                              >
                                Gender
                              </label>
                              <select
                                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                                name=""
                                required
                                id=""
                              >
                                <option value=""> -- Select Gender --</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>
                            <div className="mt-1 outline-none dark:bg-boxdark">
                              <label
                                className="text-black-2"
                                htmlFor="programName"
                              >
                                Date of Birth
                              </label>
                              <input
                                type="date"
                                name="name"
                                id="programName"
                                required
                                placeholder="Enter Date of Birth"
                                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                                // onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div className="mt-1 outline-none dark:bg-boxdark">
                              <label
                                className="text-black-2 "
                                htmlFor="programName"
                              >
                                Role
                              </label>
                              <select
                                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                                name=""
                                required
                                id=""
                              >
                                <option value=""> -- Select Role --</option>
                                <option value="Admin">Admin</option>
                                <option value="user">user</option>
                              </select>
                            </div>
                          </div>

                          <div className=" mt-7 text-center">
                            <button
                              type="submit"
                              className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => setShowModal(false)}
                              className="ml-3 rounded-lg bg-[#E72E2E] py-2 px-8 text-[16px] text-white"
                            >
                              Close
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
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
                      data?.data.map((data: User, index: number) => (
                        <TableRow className="bg-light" key={data?.user_id}>
                          <TableCell>{index}</TableCell>
                          <TableCell>{data?.name}</TableCell>
                          <TableCell>{data?.email}</TableCell>
                          <TableCell>{data?.phone}</TableCell>
                          <TableCell>{data?.address}</TableCell>

                          <TableCell>     
                            <div className=' flex justify-center'>                    
                              <MenuItem onClick={handleDelete}>
                              <DeleteIcon />
                              </MenuItem>
                              <MenuItem onClick={handleEdit}>
                                <EditIcon />
                              </MenuItem>
                              <MenuItem onClick={handleOffer}>
                                <LocalOfferIcon />
                              </MenuItem>
                              </div>
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
                rowsPerPage={30}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        )}
        <ToastContainer />
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#0000006e] outline-none focus:outline-none">
            <div className="w-[62%] bg-white">
              <div className="w-[100%] p-4 md:p-6">
                <h3 className="mb-3 text-[22px] font-normal text-black">
                  Add Program Batch
                </h3>
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4 text-center">
                    <div className="profile_uploadBtn m-auto mb-5 text-center">
                      {previewImage === null ? (
                        <Button variant="text" component="label">
                          <CameraAltRoundedIcon sx={{ color: '#000000' }} />
                          <input
                            hidden
                            name="image"
                            className="form-control"
                            id="vehicleImages"
                            accept="image/*"
                            required
                            type="file"
                            onChange={handleFileChange}
                            multiple={false}
                          />
                        </Button>
                      ) : (
                        <div className="text-center ">
                          {previewImage && (
                            <div className="profileImg_preview">
                              <>
                                <button
                                  className="cancelBtn"
                                  type="button"
                                  onClick={resetImage}
                                >
                                  x
                                </button>
                                <img
                                  className=""
                                  src={previewImage}
                                  alt="user img"
                                />
                              </>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="mt-1 outline-none dark:bg-boxdark">
                      <label className="text-black-2" htmlFor="userName">
                        Name
                      </label>
                      <input
                        value={name}
                        type="text"
                        name="name"
                        id="userName"
                        required
                        placeholder="Enter Name"
                        className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mt-1 outline-none dark:bg-boxdark">
                      <label className="text-black-2" htmlFor="userEmail">
                        Email
                      </label>
                      <input
                        value={email}
                        type="text"
                        name="email"
                        id="userEmail"
                        required
                        placeholder="Enter Email"
                        className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mt-1 outline-none dark:bg-boxdark">
                      <label className="text-black-2" htmlFor="UserPhone">
                        Phone
                      </label>
                      <input
                        value={phone}
                        type="phone"
                        name="phone"
                        id="UserPhone"
                        required
                        placeholder="Enter Phone"
                        className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="mt-1 outline-none dark:bg-boxdark">
                      <label className="text-black-2 " htmlFor="userGender">
                        Gender
                      </label>
                      <select
                        value={gender}
                        className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                        name="gender"
                        required
                        id="userGender"
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option defaultValue=""> -- Select Gender --</option>
                        <option defaultValue="Male">Male</option>
                        <option defaultValue="Female">Female</option>
                      </select>
                    </div>
                    <div className="mt-1 outline-none dark:bg-boxdark">
                      <label className="text-black-2" htmlFor="userdob">
                        Date of Birth
                      </label>
                      <input
                        value={dob}
                        type="date"
                        name="dob"
                        id="userdob"
                        required
                        placeholder="Enter Date of Birth"
                        className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                        onChange={(e) => setDOB(e.target.value)}
                      />
                    </div>
                    <div className="mt-1 outline-none dark:bg-boxdark">
                      <label className="text-black-2 " htmlFor="userrole">
                        Role
                      </label>
                      <select
                        value={role}
                        className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                        name="role_id"
                        required
                        id="userrole"
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option defaultValue=""> -- Select Role --</option>
                        {rolesData &&
                          rolesData.map((data: User, index: number) => (
                            <option
                              defaultValue={data?.role_id}
                              key={data?.role_id}
                            >
                              {data?.role_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2" htmlFor="userAddress">
                      Address
                    </label>
                    <input
                      value={address}
                      type="text"
                      name="address"
                      id="userAddress"
                      required
                      placeholder="Enter Address"
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className=" mt-7 text-center">
                    <button
                      ref={btnRef}
                      type="submit"
                      className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
                    >
                      Update
                    </button>{' '}
                    <button
                      onClick={() => setShowModal(false)}
                      className="rounded-lg bg-[#E72E2E] py-2 px-8 text-[16px] text-white"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
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
    </DefaultLayout>
  );
};

export default AllUsers;
