import Breadcrumb from '../components/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from 'react-router-dom';
import { ROLES } from '../constants/roles';
import { useEffect } from 'react';
import { checkUserRole } from '../utils/role';
import { useAuth } from '../context/AuthContext';

const Inventory = () => {
  const {
    state: { user },
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const allowedRoles: number[] = [ROLES.ADMIN, ROLES.HR];

    if (!checkUserRole(user?.role_id || 0, allowedRoles)) {
      navigate('/');
    }
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Inventory" />
      <div className="m-5">
        <Grid container spacing={2}>
          <Grid className=" px-2" item md={3}>
            <Link to="/inventory/addinventory">
              <div
                className="rounded-lg bg-white py-8 px-5"
                style={{ border: '4px solid orange' }}
              >
                <h5 className=" text-base font-medium uppercase text-black-2">
                  1
                </h5>
                <p className=" my-3 text-xl  text-[#000000]">Add Inventory</p>

                <LinearProgress
                  color="success"
                  variant="determinate"
                  value={60}
                />
              </div>
            </Link>
          </Grid>

          <Grid className=" px-2" item md={3}>
            <Link to="/inventory/consumed">
              <div
                className="rounded-lg bg-white py-8 px-5"
                style={{ border: '4px solid orange' }}
              >
                <h5 className=" text-base font-medium uppercase text-black-2">
                  2
                </h5>
                <p className=" my-3 text-xl  text-[#000000]">
                  Consumed Inventory List
                </p>

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

export default Inventory;
