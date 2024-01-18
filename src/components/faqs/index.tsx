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

interface Column {
  id: 'SNo' | 'Question' | 'Answer';
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
    id: 'Answer',
    label: 'Answer',
    minWidth: 170,
    align: 'left',
  },
];

const FAQs = () => {
  const {
    state: { user },
  } = useAuth();

  const formRef = React.useRef<HTMLFormElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const [loading, setLoading] = useState(true);
  const [notificationList, setNotificationList] = useState<FAQ>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [question, setQuestion] = useState<string | number>('');
  const [answer, setAnswer] = React.useState<string | number>('');
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

  const fetchFAQList = async () => {
    try {
      const response = await axios.get(`/faqlist`, {
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
    fetchFAQList();
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    const CreateNotification = async () => {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
  
        formData.append('id', `${user?.user_id}`);
        try {
          const response = await axios.post(`/savefaq`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('11%13%07%1C%00%0B%00CXPHR%14')}`,
            },
          });
  
          toast.success(response?.data?.message || 'Success');
          console.log(response);
          fetchFAQList();
          setQuestion('');
          setAnswer('');
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
      <Breadcrumb pageName="Frequently Asked Questions" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
        <button className="flex mr-2 justify-center rounded bg-[#00A651] p-3 font-medium text-gray" onClick={()=>setShowFormModal(true)}>     
            Add FAQ
          </button>
                 
        </div>
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <h3 className=" my-5 mb-4 text-center text-2xl text-black-2">
            List All FAQs
          </h3>
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
                      notificationList
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((exam: FAQ, index: number) => (
                          <TableRow className="bg-light" key={exam?.id}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{exam?.question}</TableCell>
                            <TableCell>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: exam?.answer,
                                }}
                              />
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
          <div className="absolute bg-black w-full h-full -z-10 opacity-30"></div>
          <div className="md:w-[50%] w-[95%] p-2 rounded-lg bg-[#ffff]  dark:bg-boxdark md:mb-6 md:p-7">
         
          <h4 className='text-center text-2xl'>Add Expense</h4>
         
          <form ref={formRef} onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="programMarks">
                  Question
                </label>
                <input
                  onChange={(e) => setQuestion(e.target.value)}
                  value={question}
                  type="text"
                  name="question"
                  id="programMarks"
                  placeholder=" Enter Question"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                />
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="programMarks">
                  Answer
                </label>
                <input
                  onChange={(e) => setAnswer(e.target.value)}
                  value={answer}
                  type="text"
                  name="answer"
                  id="programMarks"
                  placeholder=" Enter Answer..."
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                />
              </div>
            </div>

            <div className=" mt-7 text-center flex justify-end gap-2">
            {submitting ?  <button
              className="rounded-lg bg-[#cccc] px-8 py-2 font-medium text-white">
              Submitting...
            </button> :

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
              onClick={()=>setShowFormModal(false)}
              >
              Close
            </button>
                </>
            }
            </div>
          </form>
          
          </div>
        </div>
      ) : null}  




    </DefaultLayout>
  );
};

export default FAQs;
