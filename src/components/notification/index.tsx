import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import * as React from 'react';
import ReactQuill from 'react-quill';
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
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { ClassicSpinner } from 'react-spinners-kit';

import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


interface Column {
  id: 'SNo' | 'Title' | 'Description' | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'SNo', label: 'S No', minWidth: 70 },
  {
    id: 'Title',
    label: 'Tite',
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
    id: 'action',
    label: 'action',
    minWidth: 170,
    align: 'left',
  },
];

const Notifications = () => {
  const {
    state: { user },
  } = useAuth();

  const formRef = React.useRef<HTMLFormElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const [loading, setLoading] = useState(true);
  const [programList, setProgramList] = useState<Exams>();
  const [notificationList, setNotificationList] = useState<Exams>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [notoficationId, setNotoficationId] = React.useState<number | null>();
  const [showFormModal, setShowFormModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
  const handleClick = (event: React.MouseEvent<HTMLElement>, exam: Exams) => {
    setAnchorEl(event.currentTarget);
    setNotoficationId(exam?.exam_id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log('Button clicked');
    setAnchorEl(null);
    window.scrollTo(0, 0);
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

  const fetchNotificationList = async () => {
    try {
      const response = await axios.get(`/notificationlist`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setNotificationList(response?.data?.data);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchProgramList();
    fetchNotificationList();
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const CreateNotification = async () => {
      if (formRef.current) {
        const formData = new FormData(formRef.current);

        formData.append('id', `${user?.user_id}`);
        try {
          const response = await axios.post(`/savenotification`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem(
                '11%13%07%1C%00%0B%00CXPHR%14'
              )}`,
            },
          });

          toast.success(response?.data?.message || 'Success');
          console.log(response);
          fetchNotificationList();
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }
    };

    if (formRef.current) {
      try {
        await CreateNotification();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // If you want to keep the dependency array, you can add dependencies as needed:
  // const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(async (e) => {...}, [/* dependencies */]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Notifications" />
      <div className="block p-6 ">
        <div className="flex w-[100%] justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <button
            className="mr-2 flex justify-center rounded bg-[#00A651] p-3 font-medium text-gray"
            onClick={() => setShowFormModal(true)}
          >
            Add Notification
          </button>
        </div>
        <div className="flex w-[100%] justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          {/* <h3 className=" my-5 mb-4 text-center text-2xl text-black-2">
            List All Notifications
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
                    {notificationList &&
                      notificationList.map((exam, index: number) => (
                        <TableRow className="bg-light" key={exam?.id}>
                          <TableCell>{index}</TableCell>
                          <TableCell>{exam?.title}</TableCell>
                          <TableCell>{exam?.description}</TableCell>
                          <TableCell>
                            <div className=' flex justify-center'>
                              <MenuItem onClick={handleClose}>
                                <RemoveRedEyeIcon />
                              </MenuItem>
                              <MenuItem onClick={handleEdit}>
                                <EditIcon />
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
                count={notificationList?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          )}
        </div>

        <ToastContainer />
      </div>

      {showFormModal ? (
        <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="absolute -z-10 h-full w-full bg-black opacity-30"></div>
          <div className="w-[95%] rounded-lg bg-[#ffff] p-2 dark:bg-boxdark  md:mb-6 md:w-[50%] md:p-7">
            <h4 className="text-center text-2xl">Add Notification</h4>

            <form ref={formRef} onSubmit={onSubmit}>
              <div className="grid grid-cols-3 gap-4">
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="programMarks">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="programMarks"
                    placeholder=" Enter Title"
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  />
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="programMarks">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="programMarks"
                    placeholder=" Enter Descriptions..."
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  />
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2 " htmlFor="programName">
                    Program
                  </label>
                  <select
                    className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                    name="program_id"
                    id=""
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
              </div>

              <div className=" mt-7 flex justify-end gap-2 text-center">
                {submitting ? (
                  <button className="rounded-lg bg-[#cccc] px-8 py-2 font-medium text-white">
                    Submitting...
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

export default Notifications;
