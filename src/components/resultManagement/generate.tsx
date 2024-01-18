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
    | 'Exam'
    | 'grade'
    | 'result'
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
    id: 'grade',
    label: 'Grade',
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
    id: 'result',
    label: 'Result',
    minWidth: 170,
    align: 'left',
  },
];

const GenerateResult = () => {
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
  const [resultList, setResultList] = useState<Exams>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [examData, setExamData] = useState<Exams[]>([]);
  const [programData, setProgramData] = useState<Exams[]>([]);
  const [path, setPath] = useState<string>('');
  const [studentId, setStudentId] = React.useState<number | null>();
  const [marks, setMarks] = useState<string | number>();
  const [exam, setExam] = useState<string>();
  const [program, setProgram] = useState<string>();

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
      const response = await axios.get(`/getResult`, {
        params: {
          id: user?.user_id,
          exam_id: exam,
          proram_id: program,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setResultList(response?.data?.userData);
      setPath(response?.data?.path);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchExam = async () => {
    try {
      const response = await axios.get(`/getExamByProgramId`, {
        params: {
          id: user?.user_id,
          program_id: program,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      setExamData(response?.data?.exam);
      setExam(response?.data?.exam[0]?.exam_id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchProgram = async () => {
    try {
      const response = await axios.get(`/getPrograms`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      setProgramData(response?.data?.program);
      setProgram(response?.data?.program[0]?.id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchProgram();
  }, []);
  React.useEffect(() => {
    if (program) {
      fetchExam();
    }
  }, [program]);
  React.useEffect(() => {
    if (exam) {
      fetchResultList();
    }
  }, [exam]);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    student: Exams
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
          const response = await axios.get(`/onlineResultgenerator`, {
            params: {
              id: `${user?.user_id}`,
              exam_id: `${exam}`,
            },
            headers: {
              'Content-Type': 'application/json',
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
      <Breadcrumb pageName="Generate Result" />
      <div className="exam p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <form ref={formRef} onSubmit={onSubmit}>
            <div className="grid grid-cols-3 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="programName">
                  Select Program
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="exam_id"
                  id=""
                  onChange={(e) => setProgram(e.target.value)}
                >
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
                  Select Exam
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="exam_id"
                  id=""
                  onChange={(e) => setExam(e.target.value)}
                >
                  {examData &&
                    examData?.map((item) => {
                      return (
                        <option key={item.exam_id} value={item.exam_id}>
                          {item.exam_name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mt-7 outline-none dark:bg-boxdark">
                <button
                  ref={btnRef}
                  className=" rounded-lg bg-green py-4 px-12 text-[18px] text-white"
                >
                  Generate
                </button>
              </div>
            </div>
          </form>
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
                        .map((student: Exams, index: number) => (
                          <TableRow className="bg-light" key={student?.id}>
                            <TableCell>{index}</TableCell>
                            <TableCell>
                              <img
                                className=" m-auto  h-[40px] w-[40px] object-contain object-top"
                                src={`${path}${student?.image}`}
                              />
                            </TableCell>
                            <TableCell>{student?.name}</TableCell>
                            <TableCell>{student?.id}</TableCell>
                            <TableCell>{student?.resultGrade}</TableCell>
                            <TableCell>{student?.totalmarks}</TableCell>

                            <TableCell>
                              {student?.totalmarks >= 40 ? 'Pass' : 'Fail'}
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
                Enter Student Exam
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

export default GenerateResult;
