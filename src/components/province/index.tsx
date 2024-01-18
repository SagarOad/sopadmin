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
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';

interface Column {
  id: 'SNo' | 'Name' | 'initial' | 'description' | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'SNo', label: 'S No', minWidth: 70 },
  {
    id: 'Name',
    label: 'Name',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'initial',
    label: 'Initial',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    align: 'left',
  },
];

interface Data {
  id: number;
  name: string;
  description: string;
  provinceName: string;
  initial: string;
}

const Province = () => {
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

  const [loading, setLoading] = useState(true);
  const [phaseList, setPhaseList] = useState<Phase>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [name, setName] = useState('');
  const [initial, setInitial] = useState('');
  const [description, setDescription] = useState('');
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

  const fetchExamList = async () => {
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
      setPhaseList(response?.data);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchExamList();
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    const AddDistrict = async () => {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
  
        formData.append('id', `${user?.user_id}`);
        try {
          const response = await axios.post(`/saveprovince`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('11%13%07%1C%00%0B%00CXPHR%14')}`,
            },
          });
  
          toast.success(response?.data?.message || 'Success');
          console.log(response);
          fetchExamList();
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }
    };
  
    if (formRef.current) {
      try {
        await AddDistrict();
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Settings/District" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
        <button className="flex mr-2 justify-center rounded bg-[#00A651] p-3 font-medium text-gray" onClick={()=>setShowFormModal(true)}>     
            Add Province
          </button>
          
        </div>
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <h3 className=" my-5 mb-4 text-center text-2xl text-black-2">
            Province
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
                    {phaseList &&
                      phaseList
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((phase: Data, index: number) => (
                          <TableRow className="bg-light" key={phase?.id}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{phase?.name}</TableCell>
                            <TableCell>{phase?.initial}</TableCell>
                            <TableCell>{phase?.description}</TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[30, 50, 100]}
                component="div"
                count={phaseList?.length}
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
         
          <h4 className='text-center text-2xl'>Add Province</h4>
          
          <form ref={formRef} onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="Name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Province Name"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                />
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="initial">
                  Initial
                </label>
                <input
                  type="text"
                  name="initial"
                  id="initial"
                  placeholder="Enter Province Initial"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setInitial(e.target.value)}
                  required
                  value={initial}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="Name">
                  Descrition
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter Province Description"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
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

export default Province;
