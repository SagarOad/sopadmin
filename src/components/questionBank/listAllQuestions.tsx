import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import * as React from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';


import DeleteIcon from '@mui/icons-material/Delete';


interface Column {
  id:
    | 'SNo'
    | 'Question'
    | 'Subject'
    | 'Program'
    | 'Level'
    | 'Exam Name'
    | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'SNo', label: 'S No', minWidth: 70 },
  {
    id: 'Question',
    label: 'Question',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'Subject',
    label: 'Subject',
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
    id: 'Level',
    label: 'Level',
    minWidth: 70,
    align: 'left',
  },
  {
    id: 'Exam Name',
    label: 'Exam Name',
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

const ListAllQuestions = () => {
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

  const [page, setPage] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [questionList, setQuestionList] = React.useState<Questions>();
  const [subjectList, setSubjectList] = React.useState<Questions>();
  const [examList, setExamList] = React.useState<Questions>();
  const [programList, setProgramList] = React.useState<Questions>();
  const [gradeList, setGradeList] = React.useState<Questions>();
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [selectedLevel, setSelectedLevel] = React.useState<string | number>('');
  const [questionId, setQuestionId] = React.useState<number>();
  const [selectedProgram, setSelectedProgram] = React.useState<string | number>(
    ''
  );
  const [selectedSubject, setSelectedSubject] = React.useState<string | number>(
    ''
  );
  const [selectedExam, setSelectedExam] = React.useState<string | number>('');

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
    data: Questions
  ) => {
    setAnchorEl(event.currentTarget);
    setQuestionId(data?.question_id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
    setAnchorEl(null);
  };
  const onDelete = async () => {
    try {
      if (questionId) {
        const response = await axios.get(`/deletequestion`, {
          params: {
            id: `${user?.user_id}`,
            question_id: `${questionId}`,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        console.log(response.data);
        fetchQuestionList(
          page,
          selectedLevel,
          selectedExam,
          selectedSubject,
          selectedProgram
        );

        setAnchorEl(null);
        setShowDeleteModal(false);
        toast.success(response?.data?.message || 'Successfully Deleted');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed.');
    }
  };
  const handleLevelSelect = (event: { target: { value: any } }) => {
    const selectedValue = event.target.value;
    setSelectedLevel(selectedValue);
  };
  const handleExamSelect = (event: { target: { value: any } }) => {
    const selectedValue = event.target.value;
    setSelectedExam(selectedValue);
  };
  const handleSubjectSelect = (event: { target: { value: any } }) => {
    const selectedValue = event.target.value;
    setSelectedSubject(selectedValue);
  };
  const handleProgramSelect = (event: { target: { value: any } }) => {
    const selectedValue = event.target.value;
    setSelectedProgram(selectedValue);
  };

  const fetchGrdeList = async () => {
    try {
      const response = await axios.get(`/gradelist`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setGradeList(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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
  const fetchSubjectList = async () => {
    try {
      const response = await axios.get(`/subjectlist`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setSubjectList(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchQuestionList = async (
    page: number,
    selectedLevel: string | number,
    selectedExam: string | number,
    selectedSubject: string | number,
    selectedProgram: string | number
  ) => {
    try {
      const response = await axios.get(`/filterquestionlist`, {
        params: {
          id: user?.user_id,
          page,
          grade_id: selectedLevel || '0',
          exam_id: selectedExam || '0',
          subject_id: selectedSubject || '0',
          program_id: selectedProgram || '0',
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setQuestionList(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  React.useEffect(() => {
    fetchQuestionList(
      page,
      selectedLevel,
      selectedExam,
      selectedSubject,
      selectedProgram
    );
  }, [page, selectedLevel, selectedExam, selectedSubject, selectedProgram]);

  React.useEffect(() => {
    fetchExamList();
    fetchSubjectList();
    fetchGrdeList();
    fetchProgramList();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Question Bank / List All Questions" />
      <div className="block p-6 ">
        <div className="w-[100%] flex flex-col justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <form className="mb-5">
            <div className="grid grid-cols-3 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name=""
                  id=""
                  onChange={handleProgramSelect}
                  value={selectedProgram}
                >
                  <option value=""> -- All Programs --</option>
                  {programList &&
                    programList.map((data) => (
                      <option value={data?.id} key={data?.id}>
                        {data?.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name=""
                  id=""
                  onChange={handleLevelSelect}
                  value={selectedLevel}
                >
                  <option value=""> -- All Level --</option>
                  {gradeList &&
                    gradeList.map((data) => (
                      <option value={data?.id} key={data?.id}>
                        {data?.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name=""
                  id=""
                  onChange={handleSubjectSelect}
                  value={selectedSubject}
                >
                  <option value=""> -- All Subject --</option>
                  {subjectList &&
                    subjectList.map((data) => (
                      <option value={data?.id} key={data?.id}>
                        {data?.subject_title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name=""
                  id=""
                  onChange={handleExamSelect}
                  value={selectedExam}
                >
                  <option value=""> -- All Exams --</option>
                  {examList &&
                    examList.map((data) => (
                      <option value={data?.exam_id} key={data?.exam_id}>
                        {data?.exam_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </form>
          <div className="py-5 text-right">
            <button
              type="button"
              className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
            >
              <Link to="/onlineexam/question-bank">
                <AddIcon />
                Add Question
              </Link>
            </button>
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
                  {questionList &&
                    questionList
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((data: Questions, index: string) => (
                        <TableRow className="bg-light" key={data?.question_id}>
                          <TableCell>{index}</TableCell>
                          <TableCell>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: data?.question_name,
                              }}
                            />
                          </TableCell>
                          <TableCell>{data?.subject_title}</TableCell>
                          <TableCell>{data?.program_name}</TableCell>

                          <TableCell>{data?.grade_name}</TableCell>
                          <TableCell>{data?.exam_name}</TableCell>
                          <TableCell>
                                                     
                              {/* <MenuItem onClick={handleClose}>View</MenuItem>
                              <MenuItem onClick={handleClose}>Edit</MenuItem> */}
                              <MenuItem onClick={handleDelete}>
                               <DeleteIcon />
                              </MenuItem>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[30]}
              component="div"
              count={questionList?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
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
    </DefaultLayout>
  );
};

export default ListAllQuestions;
