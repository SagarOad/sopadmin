import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';
import { Grid } from '@mui/material';
import { ClassicSpinner } from 'react-spinners-kit';
import { useEffect, useState } from 'react';
import StudentCard from '../StudentCard';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../constants/roles';
import { useNavigate } from 'react-router-dom';
import { checkUserRole } from '../../utils/role';

const SeatingArrangement = () => {
  const {
    state: { user },
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const allowedRoles: number[] = [ROLES.ADMIN, ROLES.CONTROLLER];

    if (!checkUserRole(user?.role_id || 0, allowedRoles)) {
      navigate('/');
    }
  }, []);

  const [loading, setLoading] = useState(true);
  const [blockData, setBlockData] = useState<Phase[]>([]);
  const [data, setData] = useState<Phase[]>([]);
  const [path, setPath] = useState<string>();
  const [block, setBlock] = useState<string>();

  const fetchBLock = async () => {
    try {
      const response = await axios.get(`/getBlockList`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      setBlockData(response?.data?.data);
      setBlock(response?.data?.data[0]?.id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`/blockwiseseting`, {
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
      setData(response?.data?.data);
      setPath(response?.data?.path);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchBLock();
  }, []);

  useEffect(() => {
    if (block) {
      fetchData();
    }
  }, [block]);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Phase Management / Seating Arrangement" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <div className="grid grid-cols-2 gap-4">
            <div className="mt-1 outline-none dark:bg-boxdark">
              <label className="text-black-2 " htmlFor="programName">
                Block
              </label>
              <select
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                name=""
                id=""
                onChange={(e) => setBlock(e.target.value)}
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
          <div className="absolute flex h-full w-full items-center justify-center bg-white">
            <ClassicSpinner color="#04BE5B" />
          </div>
        ) : (
          <div className="bg-[#F4F4F4] p-4 dark:bg-[#292A33] md:p-6 2xl:p-10">
            <Grid container spacing={2}>
              {data &&
                data?.map((data) => (
                  <Grid
                    className=" lms_card mt-4 px-2 text-center"
                    item
                    md={2}
                    key={data?.id}
                  >
                    <StudentCard
                      name={data?.name}
                      path={path}
                      registration={data?.registrationno}
                      image={data?.image}
                    />
                  </Grid>
                ))}
            </Grid>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default SeatingArrangement;
