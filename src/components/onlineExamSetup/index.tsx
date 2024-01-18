import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
// import { ClassicSpinner } from 'react-spinners-kit';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';

// interface Column {
//   id:
//     | 'SNo'
//     | 'ExamName'
//     | 'ExamDuration'
//     | 'startDate'
//     | 'endDate'
//     | 'action'
//     | 'ExamMarks';
//   label: string;
//   minWidth?: number;
//   align?: 'left';
//   format?: (value: string) => string;
// }

// const columns: readonly Column[] = [
//   { id: 'SNo', label: 'S No', minWidth: 70 },
//   {
//     id: 'ExamName',
//     label: 'Exam Name',
//     minWidth: 170,
//     align: 'left',
//   },
//   {
//     id: 'ExamMarks',
//     label: 'Exam Total Marks',
//     minWidth: 170,
//     align: 'left',
//   },
//   {
//     id: 'ExamDuration',
//     label: 'Exam Duration (Min)',
//     minWidth: 170,
//     align: 'left',
//   },
//   {
//     id: 'startDate',
//     label: 'Start Date',
//     minWidth: 170,
//     align: 'left',
//   },
//   {
//     id: 'endDate',
//     label: 'End Date',
//     minWidth: 220,
//     align: 'left',
//   },
//   {
//     id: 'action',
//     label: 'action',
//     minWidth: 170,
//     align: 'left',
//   },
// ];

const OnlineExamSetup = () => {
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
  const [submitting, setSubmitting] = useState(false);
  // const [showDetailModal, setShowDetailModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const handleInstructionChange = (html: React.SetStateAction<string>) => {
    setInstructionHtml(html);
  };
  const handleSyllabusChange = (html: React.SetStateAction<string>) => {
    setSyllabusHtml(html);
  };

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLElement>, exam: Exams) => {
  //   setAnchorEl(event.currentTarget);
  //   setExamId(exam?.exam_id);
  //   setExamData(exam);
  //   setSelectedProgram(exam?.program_id);
  //   setSelectedBatch(exam?.batch_id);
  //   setInstructionHtml(exam?.exam_instructions);
  //   setSyllabusHtml(exam?.exam_syllabus);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleEdit = () => {
  //   setShowModal(true);
  //   setAnchorEl(null);
  // };
  // const handleView = () => {
  //   setShowDetailModal(true);
  //   setAnchorEl(null);
  // };
  // const handleDelete = () => {
  //   setShowDeleteModal(true);
  //   setAnchorEl(null);
  // };
  // const onDelete = async () => {
  //   try {
  //     if (examId) {
  //       const response = await axios.get(`/deleteexam`, {
  //         params: {
  //           id: `${user?.user_id}`,
  //           exam_id: `${examId}`,
  //         },
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${localStorage.getItem(
  //             '11%13%07%1C%00%0B%00CXPHR%14'
  //           )}`,
  //         },
  //       });
  //       fetchExamList();

  //       setAnchorEl(null);
  //       setShowDeleteModal(false);
  //       toast.success(response?.data?.message || 'Successfully Deleted');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     toast.error('Failed.');
  //   }
  // };
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

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    const CreatExam = async () => {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
  
        // formData.append('exam_instructions', `${instructionHtml}`);
        // formData.append('exam_syllabus', syllabusHtml);
        formData.append('id', `${user?.user_id}`);
        const response = await axios.post(`/saveexam`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('11%13%07%1C%00%0B%00CXPHR%14')}`,
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
            Authorization: `Bearer ${localStorage.getItem('11%13%07%1C%00%0B%00CXPHR%14')}`,
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
          await UpdateExam();
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false); // Set to false to indicate completion
        }
      } else {
        try {
          await CreatExam();
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false); // Set to false to indicate completion
        }
      }
    }
  };
  
  
  // No dependencies array as we are not using useCallback
  

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Online Exam Setup" />
      <div className="block p-6 ">
        <div className="w-[100%] rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
         
          <form ref={formRef} onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="programName">
                  Program
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="program_id"
                  id=""
                  onChange={handleProgramSelect}
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
                <label className="text-black-2 " htmlFor="programName">
                  Batch
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="batch_id"
                  id=""
                  onChange={handleBatchSelect}
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
                <label className="text-black-2 " htmlFor="programName">
                  Phase
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="programphase_id"
                  id=""
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
                <label className="text-black-2 " htmlFor="programName">
                  Level
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="grade_id"
                  id=""
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
                <label className="text-black-2 " htmlFor="programName">
                  Subject
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="subject_id"
                  id=""
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
                <label className="text-black-2" htmlFor="programMarks">
                  Marks
                </label>
                <input
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
                  required
                >
                  <option value=""> -- Please Select Exam Level --</option>

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
                  type="Date"
                  name="exam_enddate"
                  id="programName"
                  placeholder="Enter Exam Duration"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                />
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="programName">
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
          {submitting ?     <button
                className="rounded-lg bg-[#cccc] px-8 py-2 font-medium text-black"
              >
                Submitting...
              </button> :    <button
                ref={btnRef}
                type="submit"
                className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
              >
                Submit
              </button>}
            </div>
          </form>
        </div>
     
        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default OnlineExamSetup;
