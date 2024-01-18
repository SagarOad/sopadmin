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
  id: '' | 'Name' | 'model' | 'registrationNo' | 'details';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: '', label: '', minWidth: 70 },
  {
    id: 'Name',
    label: 'Name',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'model',
    label: 'Model',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'registrationNo',
    label: 'Registration No',
    minWidth: 170,
    align: 'left',
  },

  {
    id: 'details',
    label: 'Other Details',
    minWidth: 170,
    align: 'left',
  },
];

interface Data {
  id: number;
  carName: string;
  model: string;
  registrationNo: string;
  image: string;
  otherDetails: string;
}

const CarsList = () => {
  const {
    state: { user },
  } = useAuth();

  const navigate = useNavigate();

  React.useEffect(() => {
    const allowedRoles: number[] = [ROLES.ADMIN, ROLES.ACCOUNTS];

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
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');

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
      const response = await axios.get(`/carList`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setPhaseList(response?.data?.carList);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchExamList();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Expense / Cars List" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <h3 className=" my-5 mb-4 text-center text-2xl text-black-2">
            Cars List
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
                            <TableCell>
                              {' '}
                              <img
                                className=" m-auto  h-[40px] w-[40px] object-contain object-top"
                                src={`${phase}${phase?.image}`}
                              />
                            </TableCell>
                            <TableCell>{phase?.carName}</TableCell>
                            <TableCell>{phase?.model}</TableCell>
                            <TableCell>{phase?.registrationNo}</TableCell>
                            <TableCell>{phase?.otherDetails}</TableCell>
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
      </div>
    </DefaultLayout>
  );
};

export default CarsList;
