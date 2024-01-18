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
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';

interface Column {
  id: 'SNo' | 'question' | 'Program' | 'explanation' | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'SNo', label: 'S No', minWidth: 70 },
  {
    id: 'question',
    label: 'Question',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'explanation',
    label: 'Explanation',
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

const QuestionApproval = () => {
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
  const [loading, setLoading] = useState(false);
  const [resultList, setResultList] = useState<Result>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);

  const [examList, setExamList] = useState<Exams>();
  const [questionLevel, setQuestionLevel] = useState<string | number>();
  const [quantity, setQuantity] = useState<string | number>();

  const [exam, setExam] = useState<string>();

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (
    _event: React.MouseEvent<HTMLElement>,
    data: Questions
  ) => {
    const ApproveQuestion = async () => {
      if (data?.question_id) {
        const params = {
          id: user?.user_id,
          question_id: data?.question_id,
        };
        const response = await axios.post(`/approvequestion`, params, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        toast.success(response?.data?.message || 'Success');
        console.log(response);
        const QuestionApprovalList = async () => {
          if (formRef.current) {
            const formData = new FormData(formRef.current);

            formData.append('id', `${user?.user_id}`);
            const response = await axios.post(
              `/questionapprovallist`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${localStorage.getItem(
                    '11%13%07%1C%00%0B%00CXPHR%14'
                  )}`,
                },
              }
            );
            setResultList(response?.data?.data);
            console.log(response);
            setLoading(false);
          }
        };
        if (formRef.current) {
          try {
            QuestionApprovalList();
          } catch (e) {
            console.error(e);
          }
        }
      }
    };
    ApproveQuestion();
  };
  const fetchExamList = async () => {
    try {
      const response = await axios.get(`/examlist`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setExamList(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  React.useEffect(() => {
    fetchExamList();
  }, []);
  const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      const QuestionApprovalList = async () => {
        if (formRef.current) {
          const formData = new FormData(formRef.current);

          formData.append('id', `${user?.user_id}`);
          const response = await axios.post(`/questionapprovallist`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem(
                '11%13%07%1C%00%0B%00CXPHR%14'
              )}`,
            },
          });
          setResultList(response?.data?.data);
          console.log(response);
          setLoading(false);
        }
      };

      if (formRef.current) {
        try {
          QuestionApprovalList();
        } catch (e) {
          console.error(e);
        }
      }
    },
    []
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Question Appoval" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <form ref={formRef} onSubmit={onSubmit}>
            <div className="grid grid-cols-4 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="exam_slug">
                  Select Exam
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="exam_slug"
                  id="exam_slug"
                  onChange={(e) => setExam(e.target.value)}
                  value={exam}
                >
                  <option value="">Select Exam</option>

                  {examList &&
                    examList.map((data) => (
                      <option value={data?.exam_id} key={data?.exam_id}>
                        {data?.exam_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="programName">
                  Select Question Level
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="questionlevel_id"
                  required
                  id=""
                  onChange={(e) => setQuestionLevel(e.target.value)}
                  value={questionLevel}
                >
                  <option value={'1'}>Beginner</option>
                  <option value={'2'}>Novice</option>
                  <option value={'3'}>Intermediate</option>
                  <option value={'4'}>Advance</option>
                  <option value={'5'}>Expert</option>
                </select>
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="quantity">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  required
                  placeholder="Enter Question Quantity"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                />
              </div>
              <div className="mt-9 outline-none dark:bg-boxdark">
                <button
                  ref={btnRef}
                  type="submit"
                  className="mx-2  rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
                >
                  Search
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
                        .map((data: Questions, index: number) => (
                          <TableRow
                            className="bg-light"
                            key={data?.question_id}
                          >
                            <TableCell>{index}</TableCell>
                            <TableCell>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: data?.question_name,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              {' '}
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: data?.question_explanation,
                                }}
                              />
                            </TableCell>

                            <TableCell>
                              <Button
                                id="demo-positioned-button"
                                aria-haspopup="true"
                                onClick={(e) => handleClick(e, data)}
                                variant="contained"
                                sx={{
                                  backgroundColor: '#04BE5B',
                                  color: '#ffffff',
                                  fontWeight: 600,
                                  textTransform: 'capitalize',
                                  fontSize: '17px',
                                }}
                              >
                                Approve
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

        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default QuestionApproval;
