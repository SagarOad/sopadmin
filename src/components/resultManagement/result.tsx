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
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { ClassicSpinner } from 'react-spinners-kit';
import { Button } from '@mui/material';
import { ROLES } from '../../constants/roles';
import { useNavigate } from 'react-router-dom';
import { checkUserRole } from '../../utils/role';

interface Column {
  id:
    | 'SNo'
    | ''
    | 'Name'
    | 'Program'
    | 'RegistrationNo'
    | 'ObtainedMarks'
    | 'Result'
    | 'action';
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
    id: 'ObtainedMarks',
    label: 'Obtained Marks',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'Result',
    label: 'Result',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 70,
    align: 'left',
  },
];

const Result = () => {
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
  const [destrictData, setDestrictData] = useState<Result[]>([]);
  const [provinceData, setProvinceData] = useState<Result[]>([]);
  const [blockData, setBlockData] = useState<Result[]>([]);
  const [phaseData, setPhaseData] = useState<Result[]>([]);
  const [path, setPath] = useState<string>('');
  const [studentId, setStudentId] = React.useState<number | null>();
  const [marks, setMarks] = useState<string | number>();

  const [province, setProvince] = useState<string>();
  const [block, setBlock] = useState<string>();
  const [phase, setPhase] = useState<string>();
  const [district, setDistrict] = useState<string>();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchResultList = async () => {
    try {
      const response = await axios.get(`/ResultList`, {
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
      const response = await axios.get(`/blockListByPhaseCenter`, {
        params: {
          id: user?.user_id,
          phaseCenterId: phase,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      setBlockData(response?.data?.blockList);
      setBlock(response?.data?.blockList[0]?.id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchPhase = async () => {
    try {
      const response = await axios.get(`/phaseCenterByDistrict`, {
        params: {
          id: user?.user_id,
          districtId: district,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      setPhaseData(response?.data?.phaseCenter);
      setPhase(response?.data?.phaseCenter[0]?.id);
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
      setProvince(response?.data[0]?.id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchDestrict = async () => {
    try {
      const response = await axios.get(`/get-district`, {
        params: {
          provinceId: province,
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      setDestrictData(response.data);
      setDistrict(response?.data[0]?.id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  React.useEffect(() => {
    if (phase) {
      fetchBlock();
    }
  }, [phase]);
  React.useEffect(() => {
    if (district) {
      fetchPhase();
    }
  }, [district]);
  React.useEffect(() => {
    if (province) {
      fetchDestrict();
    }
  }, [province]);
  React.useEffect(() => {
    fetchProvince();
  }, []);
  React.useEffect(() => {
    if (block) {
      fetchResultList();
    }
  }, [block]);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    student: Result
  ) => {
    setStudentId(student?.id);
    setMarks(student?.obtainedMarks);
    setShowModal(true);
  };

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

          fetchResultList();

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
      <Breadcrumb pageName="Result" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <div className="grid grid-cols-4 gap-4">
            <div className="mt-1 outline-none dark:bg-boxdark">
              <label className="text-black-2 " htmlFor="programName">
                Select Province
              </label>
              <select
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                name=""
                id=""
                onChange={(e) => setProvince(e.target.value)}
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
                Select District
              </label>
              <select
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
              <label className="text-black-2 " htmlFor="programName">
                Select Phase Center
              </label>
              <select
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                name=""
                id=""
                onChange={(e) => setPhase(e.target.value)}
                value={phase}
              >
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
                Select Block
              </label>
              <select
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                name=""
                id=""
                onChange={(e) => setBlock(e.target.value)}
                value={block}
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
                        .map((student: Result, index: number) => (
                          <TableRow className="bg-light" key={student?.id}>
                            <TableCell>{index}</TableCell>
                            <TableCell>
                              <img
                                className=" m-auto  h-[40px] w-[40px] object-contain object-top"
                                src={`${path}${student?.image}`}
                              />
                            </TableCell>
                            <TableCell>{student?.name}</TableCell>
                            <TableCell>{student?.registration_no}</TableCell>
                            <TableCell>{student?.programName}</TableCell>
                            <TableCell>{student?.obtainedMarks}</TableCell>

                            <TableCell>
                              {student?.obtainedMarks >= 40 ? 'Pass' : 'Fail'}
                            </TableCell>
                            <TableCell>
                              <Button
                                id="demo-positioned-button"
                                aria-haspopup="true"
                                onClick={(e) => handleClick(e, student)}
                                variant="contained"
                                sx={{
                                  backgroundColor: '#04BE5B',
                                  color: '#ffffff',
                                  fontWeight: 600,
                                  textTransform: 'capitalize',
                                  fontSize: '17px',
                                }}
                              >
                                Update
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[30]}
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
                      value={marks}
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

export default Result;
