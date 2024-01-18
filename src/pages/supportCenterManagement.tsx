import Breadcrumb from '../components/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from 'react-router-dom';
import { ROLES } from '../constants/roles';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { checkUserRole } from '../utils/role';

const SupportCenterManagement = () => {
  const {
    state: { user },
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const allowedRoles: number[] = [ROLES.ADMIN];

    if (!checkUserRole(user?.role_id || 0, allowedRoles)) {
      navigate('/');
    }
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Support Center Management" />
      <div className="m-5">
        <Grid container spacing={2}>
          <Grid className=" px-2" item md={3}>
            <Link to="/support-center/active-tickets">
              <div
                className="rounded-lg bg-white py-8 px-5"
                style={{ border: '4px solid orange' }}
              >
                <h5 className=" text-base font-medium uppercase text-black-2">
                  1
                </h5>
                <p className=" my-3 text-xl  text-[#000000]">Active Tickets</p>

                <LinearProgress
                  color="success"
                  variant="determinate"
                  value={60}
                />
              </div>
            </Link>
          </Grid>
          <Grid className=" px-2" item md={3}>
            <Link to="/support-center/opened-tickets">
              <div
                className="rounded-lg bg-white py-8 px-5"
                style={{ border: '4px solid orange' }}
              >
                <h5 className=" text-base font-medium uppercase text-black-2">
                  2
                </h5>
                <p className=" my-3 text-xl  text-[#000000]">Opened Tickets</p>

                <LinearProgress
                  color="success"
                  variant="determinate"
                  value={60}
                />
              </div>
            </Link>
          </Grid>
          <Grid className=" px-2" item md={3}>
            <Link to="/support-center/closed-tickets">
              <div
                className="rounded-lg bg-white py-8 px-5"
                style={{ border: '4px solid orange' }}
              >
                <h5 className=" text-base font-medium uppercase text-black-2">
                  3
                </h5>
                <p className=" my-3 text-xl  text-[#000000]">Closed Tickets</p>

                <LinearProgress
                  color="success"
                  variant="determinate"
                  value={60}
                />
              </div>
            </Link>
          </Grid>
        </Grid>
      </div>
    </DefaultLayout>
  );
};

export default SupportCenterManagement;
