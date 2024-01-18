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
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';

interface Column {
  id: 'SNo' | '' | 'Name' | 'Program' | 'RegistrationNo' | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'SNo', label: 'S No', minWidth: 70 },
  { id: '', label: '', minWidth: 70 },
  {
    id: 'Name',
    label: 'Name',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'RegistrationNo',
    label: 'Registration No',
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
    id: 'action',
    label: 'action',
    minWidth: 170,
    align: 'left',
  },
];

const UploadResult = () => {
  const {
    state: { user },
  } = useAuth();

  const navigate = useNavigate();

  React.useEffect(() => {
    const allowedRoles: number[] = [ROLES.ADMIN, ROLES.CONTROLLER];

    if (!checkUserRole(user?.role_id || 0, allowedRoles)) {
      navigate('/');
    }
  }, []);

  const formRef = React.useRef<HTMLFormElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [resultList, setResultList] = useState<Result>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [studentId, setStudentId] = React.useState<number | null>();
  const [marks, setMarks] = useState<string>();
  const [blockData, setBlockData] = useState<Result[]>([]);
  const [path, setPath] = useState<string>('');

  const [block, setBlock] = useState<string>();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, phase: Result) => {
    setStudentId(phase?.id);
    setMarks(phase?.name);
    setShowModal(true);
  };

  const fetchResultList = async () => {
    try {
      const response = await axios.get(`/ResultEntry`, {
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
      setResultList(response?.data?.data);
      setPath(response?.data?.path);

      setLoading(false);
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

      setBlockData(response?.data?.data);
      setBlock(response?.data?.data[0]?.id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchBlock();
  }, []);
  React.useEffect(() => {
    if (block) {
      fetchResultList();
    }
  }, [block]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    async (e) => {
      e.preventDefault();

      const CreatePhase = async () => {
        if (formRef.current) {
          const formData = new FormData(formRef.current);

          formData.append('user_id', `${studentId}`);
          formData.append('id', `${user?.user_id}`);
          const response = await axios.post(`/markResult`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem(
                '11%13%07%1C%00%0B%00CXPHR%14'
              )}`,
            },
          });
          toast.success(response?.data?.message || 'Success');
          console.log(response);
          if (block) {
            fetchResultList();
          }
          setShowModal(false);
        }
      };

      if (formRef.current) {
        try {
          CreatePhase();
        } catch (e) {
          console.error(e);
        }
      }
    },
    []
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Upload Result" />
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
          <div className=" flex h-full w-full items-center justify-center bg-white">
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
                    {resultList &&
                      resultList
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((phase: Result, index: number) => (
                          <TableRow className="bg-light" key={phase?.id}>
                            <TableCell>{index}</TableCell>
                            <TableCell>
                              {' '}
                              <img
                                className=" m-auto  h-[40px] w-[40px] object-contain object-top"
                                src={`${path}${phase?.image}`}
                              />
                            </TableCell>
                            <TableCell>{phase?.name}</TableCell>
                            <TableCell>{phase?.registration_no}</TableCell>
                            <TableCell>{phase?.programName}</TableCell>

                            <TableCell>
                              <Button
                                id="demo-positioned-button"
                                aria-haspopup="true"
                                onClick={(e) => handleClick(e, phase)}
                                variant="contained"
                                sx={{
                                  backgroundColor: '#04BE5B',
                                  color: '#ffffff',
                                  fontWeight: 600,
                                  textTransform: 'capitalize',
                                  fontSize: '17px',
                                }}
                              >
                                Upload
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[30, 50, 100]}
                component="div"
                count={resultList?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        )}

        {showModal ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="w-[50%] rounded-lg bg-[#d1d1d1] p-0 dark:bg-boxdark md:mb-6 md:p-7">
              <h3 className=" mb-4 text-center text-4xl text-black-2">
                Enter Student Result
              </h3>
              <form ref={formRef} onSubmit={onSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <div className="mt-1 outline-none dark:bg-boxdark">
                    <label className="text-black-2" htmlFor="Name">
                      Obtained Marks
                    </label>
                    <input
                      type="text"
                      name="obtainedMarks"
                      id="Name"
                      placeholder="Enter Obtained Marks"
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => setMarks(e.target.value)}
                      required
                    />
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
        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default UploadResult;
