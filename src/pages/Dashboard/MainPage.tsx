import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import PollIcon from '@mui/icons-material/Poll';
import ChartOne from '../../components/ChartOne';
import applications from '../../images/icon/image_2023_08_21T08_41_54_461Z.png';
import Payment from '../../images/icon/image_2023_08_21T08_42_08_536Z.png';
import Queries from '../../images/icon/image_2023_08_21T08_42_17_109Z.png';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import easypaisa from "../../assets/easypaisa.png"
import jazzcash from "../../assets/jazzcash.png"
import mcb from "../../assets/mcb.png"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ClassicSpinner } from 'react-spinners-kit';

interface Column {
  id:
    | 'SNo'
    | ''
    | 'Name'
    | 'Program'
    | 'RefrenceNo'
    | 'Amount'
    | 'Method'
    | 'district'
    | 'province';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const paymentcolumns: readonly Column[] = [
  {
    id: 'Name',
    label: 'Name',
    align: 'left',
  },

  {
    id: 'Program',
    label: 'Program',
    minWidth: 70,
    align: 'left',
  },

  {
    id: 'Amount',
    label: 'Amount',
    minWidth: 70,
    align: 'left',
  },
  {
    id: 'Method',
    label: 'Method',
    minWidth: 70,
    align: 'left',
  },
];
const studentcolumns: readonly Column[] = [
  {
    id: 'Name',
    label: 'Name',
    align: 'left',
  },
  { id: '', label: '', minWidth: 70 },

  {
    id: 'Program',
    label: 'Program',
    minWidth: 70,
    align: 'left',
  },

  {
    id: 'district',
    label: 'District',
    minWidth: 70,
    align: 'left',
  },
  {
    id: 'province',
    label: 'Province',
    minWidth: 70,
    align: 'left',
  },
];

const MainPage = () => {
  const {
    state: { user },
  } = useAuth();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Dashboard>();
  const [path, setPath] = useState<string>('');
  const [approvedData, setApprovedData] = useState<Dashboard>();
  const [declinedData, setDeclinedData] = useState<Dashboard>();
  const [requestedData, setRequestedData] = useState<Dashboard>();
  const [paymentsData, setPaymentsData] = useState<Dashboard>();
  const [studentData, setStudentData] = useState<Dashboard>();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/admindashboard`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setLoading(false);
      setData(response?.data?.data);
      setStudentData(response?.data?.monthlystudents);
      setPaymentsData(response?.data?.monthlypayments);
      setApprovedData(response?.data?.approvepaymentgraph);
      setDeclinedData(response?.data?.declinepaymentgraph);
      setRequestedData(response?.data?.requestpaymentgraph);
      setPath(response?.data?.studentimagepath);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Admin Dashboard" />
      {loading ? (
        <div className="absolute flex h-full w-full items-center justify-center bg-white">
          <ClassicSpinner color="#04BE5B" />
        </div>
      ) : (
        <>
          <div className="m-5">
            <Grid container spacing={2}>
              <Grid className=" px-2" item md={4}>
                <div className="flex rounded-lg bg-white py-8 px-5">
                  <span>
                    <p className=" text-2xl text-[black]">
                      {data?.studentCount}
                    </p>

                    <h4 className=" text-md pt-3 pb-1 text-black-2">
                      Students
                    </h4>
                  </span>
                  <span className="m-auto mr-0  text-6xl">
                    <PeopleAltIcon
                      sx={{ color: '#00A651' }}
                      fontSize="inherit"
                    />
                  </span>
                </div>
              </Grid>
              <Grid className=" px-2" item md={4}>
                <div className="flex rounded-lg bg-white py-8 px-5">
                  <span>
                    <p className=" text-2xl text-[black]">
                      {data?.examCount}
                    </p>

                    <h4 className=" text-md pt-3 pb-1 text-black-2">Exams</h4>
                  </span>
                  <span className="m-auto mr-0 text-6xl">
                    <AutoStoriesIcon
                      sx={{ color: '#00A651' }}
                      fontSize="inherit"
                    />
                  </span>
                </div>
              </Grid>
              <Grid className=" px-2" item md={4}>
                <div className="flex rounded-lg bg-white py-8 px-5">
                  <span>
                    <p className=" text-2xl text-[black]">
                      {data?.usersCount}
                    </p>

                    <h4 className=" text-md pt-3 pb-1 text-black-2">Users</h4>
                  </span>
                  <span className="m-auto mr-0 text-6xl">
                    <AdminPanelSettingsIcon
                      sx={{ color: '#00A651' }}
                      fontSize="inherit"
                    />
                  </span>
                </div>
              </Grid>

              <Grid className=" px-2" item md={4}>
                <div className="rounded-lg bg-white py-8 px-5">
                  <p className=" text-2xl text-[black]">{data?.openticket}</p>
                  <h5 className=" text-base font-medium uppercase text-black-2">
                    Open Ticket
                  </h5>
                  <LinearProgress
                    color="warning"
                    variant="determinate"
                    value={
                      ((data?.openticket || 0) / (data?.allicket || 0)) * 100
                    }
                  />
                </div>
              </Grid>
              <Grid className=" px-2" item md={4}>
                <div className="rounded-lg bg-white py-8 px-5">
                  <p className=" text-2xl text-[black]">
                    {data?.activeticket}
                  </p>
                  <h5 className=" text-base font-medium uppercase text-black-2">
                    Active Ticket
                  </h5>

                  <LinearProgress
                    color="warning"
                    variant="determinate"
                    value={
                      ((data?.activeticket || 0) / (data?.allicket || 0)) * 100
                    }
                  />
                </div>
              </Grid>
              <Grid className=" px-2" item md={4}>
                <div className="rounded-lg bg-white py-8 px-5">
                  <p className=" text-2xl text-[black]">
                    {data?.closeticket}
                  </p>
                  <h5 className=" text-base font-medium uppercase text-black-2">
                    Close Ticket
                  </h5>

                  <LinearProgress
                    color="warning"
                    variant="determinate"
                    value={
                      ((data?.closeticket || 0) / (data?.allicket || 0)) * 100
                    }
                  />
                </div>
              </Grid>
            </Grid>
          </div>
          <div className="m-5">
            <h3 className="my-3 text-black-2">
              <PollIcon sx={{ color: 'black' }} /> Payment Overview
            </h3>
            <Grid container spacing={2}>
              <Grid className=" px-2" item md={4}>
                <div className="flex rounded-lg bg-white py-8 px-5">
                  <span>
                    <p className=" text-2xl text-[black]">
                      Rs {data?.requestefPayment}
                    </p>

                    <p className=" pt-3 pb-1 text-sm text-black-2">
                      <ExitToAppIcon sx={{ color: '#00000' }} />
                      Requested
                    </p>
                  </span>
                  <span className="m-auto mr-0 mt-1">
                    <img src={applications} alt="applications" />
                  </span>
                </div>
              </Grid>
              <Grid className=" px-2" item md={4}>
                <div className="flex rounded-lg bg-white py-8 px-5">
                  <span>
                    <p className=" text-2xl text-[black]">
                      Rs {data?.approvedPayment}
                    </p>

                    <p className=" pt-3 pb-1 text-sm text-black-2">
                      <CheckBoxIcon sx={{ color: '#00000' }} />
                      Approved
                    </p>
                  </span>
                  <span className="m-auto mr-0 mt-1">
                    <img src={Payment} alt="applications" />
                  </span>
                </div>
              </Grid>
              <Grid className=" px-2" item md={4}>
                <div className="flex rounded-lg bg-white py-8 px-5">
                  <span>
                    <p className=" text-2xl text-[black]">
                      Rs {data?.declinedPayment}
                    </p>

                    <p className=" pt-3 pb-1 text-sm text-black-2">
                      <ThumbDownAltIcon sx={{ color: '#00000' }} />
                      Declined
                    </p>
                  </span>
                  <span className="m-auto mr-0 mt-1">
                    <img src={Queries} alt="applications" />
                  </span>
                </div>
              </Grid>
            </Grid>

            <div className='mt-6'>
              <Grid container spacing={2}>
                <Grid className=" px-2" item md={4}>
                  <div className="flex rounded-lg bg-white py-8 px-5">
                    <span>
                      <p className=" text-2xl text-[black]">
                        Rs {data?.requestefPayment}
                      </p>

                      <p className=" pt-3 pb-1 text-sm text-black-2">
                        {/* <ExitToAppIcon sx={{ color: '#00000' }} /> */}
                        Easypaisa
                      </p>
                    </span>
                    <span className="m-auto mr-0 mt-1">
                      <img className='w-[70px]' src={easypaisa} alt="easypaisa" />
                    </span>
                  </div>
                </Grid>
                <Grid className=" px-2" item md={4}>
                  <div className="flex rounded-lg bg-white py-8 px-5">
                    <span>
                      <p className=" text-2xl text-[black]">
                        Rs {data?.approvedPayment}
                      </p>

                      <p className=" pt-3 pb-1 text-sm text-black-2">
                        {/* <CheckBoxIcon sx={{ color: '#00000' }} /> */}
                        Jazzcash
                      </p>
                    </span>
                    <span className="m-auto mr-0 mt-1">
                      <img className='w-[80px]' src={jazzcash} alt="jazzcash" />
                    </span>
                  </div>
                </Grid>
                <Grid className=" px-2" item md={4}>
                  <div className="flex rounded-lg bg-white py-8 px-5">
                    <span>
                      <p className=" text-2xl text-[black]">
                        Rs {data?.declinedPayment}
                      </p>

                      <p className=" pt-3 pb-1 text-sm text-black-2">
                        {/* <ThumbDownAltIcon sx={{ color: '#00000' }} /> */}
                        MCB
                      </p>
                    </span>
                    <span className="m-auto mr-0 mt-1">
                      <img className='w-[70px]' src={mcb} alt="mcb" />
                    </span>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className="m-5">
            <ChartOne
              value1={approvedData}
              value2={declinedData}
              value3={requestedData}
            />
          </div>

          <div className="m-5">
            <Grid container spacing={2}>
              <Grid className=" h-[40px] px-2" item md={6}>
                <div className=" rounded-lg bg-white py-8 px-5">
                  <h3 className="mb-3">
                    <AccountBalanceWalletIcon sx={{ color: 'black' }} />{' '}
                    Current Payments
                  </h3>
                  <TableContainer sx={{ maxHeight: 640 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {paymentcolumns.map((column) => (
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
                        {paymentsData &&
                          paymentsData.map(
                            (student: Payment, index: number) => (
                              <TableRow className="bg-light" key={student?.id}>
                                <TableCell>{student?.user_name}</TableCell>
                                <TableCell>{student?.program_name}</TableCell>
                                <TableCell>{student?.payment_amount}</TableCell>
                                <TableCell>{student?.payment_method}</TableCell>
                              </TableRow>
                            )
                          )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
              <Grid className=" h-[40px] px-2" item md={6}>
                <div className=" rounded-lg bg-white py-8 px-5">
                  <h3 className="mb-3">
                    <GroupIcon sx={{ color: 'black' }} /> Current Enroll
                    Student
                  </h3>
                  <TableContainer sx={{ maxHeight: 640 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {studentcolumns.map((column) => (
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
                        {studentData &&
                          studentData.map((student: Payment, index: number) => (
                            <TableRow className="bg-light" key={student?.id}>
                              <TableCell>
                                <img
                                  className=" m-auto mr-0  h-[40px] w-[40px] object-contain object-top"
                                  src={`${path}${student?.image}`}
                                />
                              </TableCell>
                              <TableCell>{student?.name}</TableCell>
                              <TableCell>{student?.program_name}</TableCell>
                              <TableCell>{student?.district}</TableCell>
                              <TableCell>{student?.province}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </DefaultLayout>
  );
};

export default MainPage;
