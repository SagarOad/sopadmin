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
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { ClassicSpinner } from 'react-spinners-kit';
import { ROLES } from '../constants/roles';
import { checkUserRole } from '../utils/role';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumb';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface Column {
  id:
    | 'SNo'
    | 'ExamName'
    | 'ExamDuration'
    | 'startDate'
    | 'endDate'
    | 'action'
    | 'ExamMarks';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'SNo', label: 'S No', minWidth: 70 },
  {
    id: 'ExamName',
    label: 'Exam Name',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'ExamMarks',
    label: 'Exam Total Marks',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'ExamDuration',
    label: 'Exam Duration (Min)',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'startDate',
    label: 'Start Date',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'endDate',
    label: 'End Date',
    minWidth: 220,
    align: 'left',
  },
  {
    id: 'action',
    label: 'action',
    minWidth: 170,
    align: 'left',
  },
];

const ListAllExam = () => {
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
  const [instructionHtml, setInstructionHtml] = useState('');
  const [syllabusHtml, setSyllabusHtml] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<string | number>();
  const [selectedBatch, setSelectedBatch] = useState<string | number>();
  const [loading, setLoading] = useState(true);
  const [gradeList, setGradeList] = useState<Exams>();
  const [batchList, setBatchList] = useState<Exams>();
  const [subjectList, setSubjectList] = useState<Exams>();
  const [programList, setProgramList] = useState<Exams>();
  const [phaseList, setPhaseList] = useState<Exams>();
  const [examList, setExamList] = useState<Exams>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [examId, setExamId] = React.useState<number | null>();
  const [examData, setExamData] = React.useState<Exams | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const handleInstructionChange = (html: React.SetStateAction<string>) => {
    setInstructionHtml(html);
  };
  const handleSyllabusChange = (html: React.SetStateAction<string>) => {
    setSyllabusHtml(html);
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
  const handleClick = (event: React.MouseEvent<HTMLElement>, exam: Exams) => {
    setAnchorEl(event.currentTarget);
    setExamId(exam?.exam_id);
    setExamData(exam);
    setSelectedProgram(exam?.program_id);
    setSelectedBatch(exam?.batch_id);
    setInstructionHtml(exam?.exam_instructions);
    setSyllabusHtml(exam?.exam_syllabus);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setShowModal(true);
    setAnchorEl(null);
  };
  const handleView = () => {
    setShowDetailModal(true);
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setShowDeleteModal(true);
    setAnchorEl(null);
  };
  const onDelete = async () => {
    try {
      if (examId) {
        const response = await axios.get(`/deleteexam`, {
          params: {
            id: `${user?.user_id}`,
            exam_id: `${examId}`,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        fetchExamList();

        setAnchorEl(null);
        setShowDeleteModal(false);
        toast.success(response?.data?.message || 'Successfully Deleted');
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
  const fetchGradeList = async () => {
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
  const fetchPhaseList = async () => {
    try {
      const response = await axios.get(`/programphaselist`, {
        params: {
          id: user?.user_id,
          programId: selectedProgram,
          batchId: selectedBatch,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setPhaseList(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchExamList = async () => {
    try {
      const response = await axios.get(`/examlist`, {
        params: {
          id: user?.user_id,
          programId: selectedProgram,
          batchId: selectedBatch,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setExamList(response?.data?.data);

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
    if (selectedProgram && selectedBatch) {
      fetchPhaseList();
    }
  }, [selectedProgram, selectedBatch]);

  React.useEffect(() => {
    if (selectedProgram) {
      fetchBatchList();
    }
  }, [selectedProgram]);

  React.useEffect(() => {
    fetchGradeList();
    fetchSubjectList();
    fetchProgramList();
    fetchExamList();
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    async (e) => {
      e.preventDefault();

      const CreatExam = async () => {
        if (formRef.current) {
          const formData = new FormData(formRef.current);

          // formData.append('exam_instructions', `${instructionHtml}`);
          // formData.append('exam_syllabus', syllabusHtml);
          formData.append('id', `${user?.user_id}`);
          const response = await axios.post(`/saveexam`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem(
                '11%13%07%1C%00%0B%00CXPHR%14'
              )}`,
            },
          });
          toast.success(response?.data?.message || 'Success');
          console.log(response);
          fetchExamList();
        }
      };
      const UpdateExam = async () => {
        if (formRef.current) {
          const formData = new FormData(formRef.current);

          formData.append('exam_id', `${examId}`);
          formData.append('id', `${user?.user_id}`);
          const response = await axios.post(`/updateexam`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem(
                '11%13%07%1C%00%0B%00CXPHR%14'
              )}`,
            },
          });
          toast.success(response?.data?.message || 'Success');
          console.log(response);
          setShowModal(false);
          fetchExamList();
          setExamId(null);
          setExamData(null);
          setSelectedProgram('');
          setSelectedBatch('');
          setInstructionHtml('');
          setSyllabusHtml('');
        }
      };

      if (formRef.current) {
        if (examId || examData?.exam_id) {
          try {
            UpdateExam();
          } catch (e) {
            console.error(e);
          }
        } else {
          try {
            CreatExam();
          } catch (e) {
            console.error(e);
          }
        }
      }
    },
    []
  );

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="List All Exam Setup" />
        <div className="block p-2 md:p-6">
          <div className="flex w-[100%] justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
            <div className="flex w-[100%] justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
              {/* <h3 className=" my-5 mb-4 text-center text-2xl text-black-2">
            List All Exam{' '}
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
                        {examList &&
                          examList
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((exam: Exams, index: number) => (
                              <TableRow
                                className="bg-light"
                                key={exam?.exam_id}
                              >
                                <TableCell>{index}</TableCell>
                                <TableCell>{exam?.exam_name}</TableCell>
                                <TableCell>{exam?.exam_totalmarks}</TableCell>
                                <TableCell>{exam?.exam_duration}</TableCell>
                                <TableCell>{exam?.exam_startdate}</TableCell>
                                <TableCell>{exam?.exam_enddate}</TableCell>
                                <TableCell>
                                  <div className=' flex justify-center'>
                                    <MenuItem onClick={handleView}>
                                      <RemoveRedEyeIcon />
                                    </MenuItem>
                                    <MenuItem onClick={handleEdit}>
                                      <EditIcon />
                                    </MenuItem>
                                    <MenuItem>
                                      {' '}
                                      <Link to="/question-bank">
                                        <AddCircleIcon />
                                      </Link>{' '}
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
                    count={examList?.length}
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
                <div className="h-[60%] w-[60%] overflow-auto rounded-lg bg-[#e7e7e7] p-0 dark:bg-boxdark md:mb-6 md:p-7">
                  <form ref={formRef} onSubmit={onSubmit}>
                    <div className=" p-0">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="mt-1 outline-none dark:bg-boxdark">
                          <label
                            className="text-black-2 "
                            htmlFor="programName"
                          >
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
                          <label
                            className="text-black-2 "
                            htmlFor="programName"
                          >
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
                        <div className="mt-1 outline-none dark:bg-boxdark">
                          <label
                            className="text-black-2 "
                            htmlFor="programName"
                          >
                            Phase
                          </label>
                          <select
                            className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                            name="programphase_id"
                            id=""
                            value={examData?.programphase_id}
                          >
                            <option value=""> -- Please Select --</option>
                            {phaseList &&
                              phaseList.map((data) => (
                                <option value={data?.id} key={data?.id}>
                                  {data?.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="mt-1 outline-none dark:bg-boxdark">
                          <label
                            className="text-black-2 "
                            htmlFor="programName"
                          >
                            Level
                          </label>
                          <select
                            className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                            name="grade_id"
                            id=""
                            value={examData?.grade_id}
                          >
                            <option value=""> -- Please Select --</option>
                            {gradeList &&
                              gradeList.map((data) => (
                                <option value={data?.id} key={data?.id}>
                                  {data?.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="mt-1 outline-none dark:bg-boxdark">
                          <label
                            className="text-black-2 "
                            htmlFor="programName"
                          >
                            Subject
                          </label>
                          <select
                            className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                            name="subject_id"
                            id=""
                            value={examData?.subject_id}
                          >
                            <option value=""> -- Please Select --</option>
                            {subjectList &&
                              subjectList.map((data) => (
                                <option value={data?.id} key={data?.id}>
                                  {data?.subject_title}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div className="mt-1 outline-none dark:bg-boxdark">
                          <label
                            className="text-black-2"
                            htmlFor="programMarks"
                          >
                            Marks
                          </label>
                          <input
                            defaultValue={examData?.exam_totalmarks}
                            type="text"
                            name="exam_totalmarks"
                            id="programMarks"
                            placeholder=" Marks"
                            className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                          />
                        </div>
                        <div className="mt-1 outline-none dark:bg-boxdark">
                          <label className="text-black-2 " htmlFor="examLevel">
                            Exam Level
                          </label>
                          <select
                            className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                            name="examLevel"
                            id="examLevel"
                            value={examData?.examLevelId}
                          >
                            <option value="">
                              -- Please Select Exam Level --
                            </option>

                            <option value={1}>District Level</option>
                            <option value={2}>Division Level</option>
                            <option value={3}>Province Level</option>
                            <option value={4}>National Level</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="mt-1 outline-none dark:bg-boxdark">
                          <label className="text-black-2" htmlFor="ExamName">
                            Exam Name
                          </label>
                          <input
                            defaultValue={examData?.exam_name}
                            type="text"
                            name="exam_name"
                            id="ExamName"
                            placeholder=" Exam Name"
                            className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                          />
                        </div>
                      </div>
                      <h4 className=" my-5 text-3xl font-medium text-black-2">
                        Instructions
                      </h4>
                      <div>
                        <input
                          hidden
                          type="text"
                          name="exam_instructions"
                          id="ExamName"
                          placeholder=" Exam Name"
                          className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                          value={instructionHtml}
                        />
                        <ReactQuill
                          value={instructionHtml}
                          onChange={handleInstructionChange}
                          modules={{
                            toolbar: [
                              [{ header: '1' }, { header: '2' }, { font: [] }],
                              [{ list: 'ordered' }, { list: 'bullet' }],
                              ['bold', 'italic', 'underline'],
                              ['link'],
                              [{ color: [] }, { background: [] }],
                              [{ align: [] }],
                              ['clean'],
                              ['code-block'],
                              [{ size: ['small', false, 'large', 'huge'] }],
                              ['image'],
                            ],
                          }}
                          formats={[
                            'header',
                            'list',
                            'bold',
                            'italic',
                            'underline',
                            'link',
                            'color',
                            'background',
                            'align',
                            'code-block',
                            'size',
                            'image',
                          ]}
                        />
                      </div>
                      <h4 className=" my-5 text-3xl font-medium text-black-2">
                        Syllabus
                      </h4>
                      <div>
                        <input
                          hidden
                          type="text"
                          name="exam_syllabus"
                          id="ExamName"
                          placeholder=" Exam Name"
                          className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                          value={syllabusHtml}
                        />
                        <ReactQuill
                          value={syllabusHtml}
                          onChange={handleSyllabusChange}
                          modules={{
                            toolbar: [
                              [{ header: '1' }, { header: '2' }, { font: [] }],
                              [{ list: 'ordered' }, { list: 'bullet' }],
                              ['bold', 'italic', 'underline'],
                              ['link'],
                              [{ color: [] }, { background: [] }],
                              [{ align: [] }],
                              ['clean'],
                              ['code-block'],
                              [{ size: ['small', false, 'large', 'huge'] }],
                              ['image'],
                            ],
                          }}
                          formats={[
                            'header',
                            'list',
                            'bold',
                            'italic',
                            'underline',
                            'link',
                            'color',
                            'background',
                            'align',
                            'code-block',
                            'size',
                            'image',
                          ]}
                        />
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="mt-1 outline-none dark:bg-boxdark">
                          <label className="text-black-2" htmlFor="programName">
                            Exam Duration (Min.)
                          </label>
                          <input
                            defaultValue={examData?.exam_duration}
                            type="text"
                            name="exam_duration"
                            id="programName"
                            placeholder="Enter Exam Duration"
                            className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                          />
                        </div>
                        <div className="mt-1 outline-none dark:bg-boxdark">
                          <label className="text-black-2" htmlFor="programName">
                            Start Date
                          </label>
                          <input
                            defaultValue={examData?.exam_startdate}
                            type="date"
                            name="exam_startdate"
                            id="programName"
                            placeholder="Enter Exam Duration"
                            className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                          />
                        </div>
                        <div className="mt-1 outline-none dark:bg-boxdark">
                          <label className="text-black-2" htmlFor="programName">
                            End Date
                          </label>
                          <input
                            defaultValue={examData?.exam_enddate}
                            type="Date"
                            name="exam_enddate"
                            id="programName"
                            placeholder="Enter Exam Duration"
                            className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                          />
                        </div>
                        <div className="mt-1 outline-none dark:bg-boxdark">
                          <label
                            className="text-black-2 "
                            htmlFor="programName"
                          >
                            Status
                          </label>
                          <select
                            className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                            name="status_id"
                            id=""
                          >
                            <option value=""> -- Please Select --</option>
                            <option value="1">Active</option>
                            <option value="2">Non-Active</option>
                            <option value="C">C</option>
                          </select>
                        </div>
                      </div>

                      <div className=" mt-7 text-center">
                        <button
                          ref={btnRef}
                          type="submit"
                          className="m-2 rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
                        >
                          Submit
                        </button>
                        <button
                          ref={btnRef}
                          onClick={() => setShowModal(false)}
                          className="m-2 rounded-lg bg-[#be0404] px-8 py-2 font-medium text-white"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : null}
            {showDetailModal ? (
              <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#0000006e] outline-none focus:outline-none">
                <div className="h-[80%] w-[60%] overflow-auto rounded-lg border bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
                  <div className=" p-0">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="mt-1 outline-none dark:bg-boxdark">
                        <label className="text-black-2 " htmlFor="programName">
                          Program
                        </label>
                        <p>{selectedProgram}</p>
                      </div>
                      <div className="mt-1 outline-none dark:bg-boxdark">
                        <label className="text-black-2 " htmlFor="programName">
                          Batch
                        </label>
                        <p>{selectedBatch}</p>
                      </div>
                      <div className="mt-1 outline-none dark:bg-boxdark">
                        <label className="text-black-2 " htmlFor="programName">
                          Phase
                        </label>

                        <p>{examData?.programphase_name}</p>
                      </div>
                      <div className="mt-1 outline-none dark:bg-boxdark">
                        <label className="text-black-2 " htmlFor="programName">
                          Level
                        </label>
                        <p>{examData?.name}</p>
                      </div>
                      <div className="mt-1 outline-none dark:bg-boxdark">
                        <label className="text-black-2 " htmlFor="programName">
                          Subject
                        </label>
                        <p>{examData?.subject_title}</p>
                      </div>

                      <div className="mt-1 outline-none dark:bg-boxdark">
                        <label className="text-black-2" htmlFor="programMarks">
                          Marks
                        </label>
                        <p>{examData?.exam_totalmarks}</p>
                      </div>

                      <div className="mt-1 outline-none dark:bg-boxdark">
                        <label className="text-black-2" htmlFor="ExamName">
                          Exam Name
                        </label>
                        <p>{examData?.exam_name}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <h4 className=" my-5 text-3xl font-medium text-black-2">
                          Instructions
                        </h4>
                        <p>
                          {' '}
                          <p>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: instructionHtml,
                              }}
                            />
                          </p>
                        </p>
                      </div>
                      <div>
                        <h4 className=" my-5 text-3xl font-medium text-black-2">
                          Syllabus
                        </h4>
                        <p>
                          <div
                            dangerouslySetInnerHTML={{ __html: syllabusHtml }}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-4">
                      <div className="mt-1 outline-none dark:bg-boxdark">
                        <label className="text-black-2" htmlFor="programName">
                          Exam Duration (Min.)
                        </label>
                        <p>{examData?.exam_duration}</p>
                      </div>
                      <div className="mt-1 outline-none dark:bg-boxdark">
                        <label className="text-black-2" htmlFor="programName">
                          Start Date
                        </label>
                        <p>{examData?.exam_startdate}</p>
                      </div>
                      <div className="mt-1 outline-none dark:bg-boxdark">
                        <label className="text-black-2" htmlFor="programName">
                          End Date
                        </label>
                        <p>{examData?.exam_enddate}</p>
                      </div>
                    </div>
                  </div>
                  <div className=" mt-7 text-end">
                    <button
                      onClick={() => setShowDetailModal(false)}
                      className="rounded-lg bg-[#be0404] px-8 py-2 font-medium text-white"
                    >
                      Close
                    </button>
                  </div>
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
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default ListAllExam;
