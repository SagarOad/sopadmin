import Breadcrumb from '../components/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const phaseManagement = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName="Phase Management" />
        <div className="m-5">
        <Grid container spacing={2}>
          <Grid className=" px-2" item md={3}>
            <Link to="/phase-management/program-phases">
          <div className="bg-white py-8 px-5 rounded-lg" style={{ border: '4px solid orange'}} >
              <h5 className=" text-base font-medium uppercase text-black-2">
                Step 1
              </h5>
              <p className=" text-xl text-[#000000]  my-3">Program Phase</p>
              
              <LinearProgress
                color="success"
                variant="determinate"
                value={60}
              />
            </div>
            </Link>
          </Grid>
          <Grid className=" px-2" item md={3}>
          <Link to="/phase-management/phase-centers">
          <div className="bg-white py-8 px-5 rounded-lg" style={{ border: '4px solid orange'}} >
              <h5 className=" text-base font-medium uppercase text-black-2">
              Step 2
              </h5>
              <p className=" text-xl text-[#000000]  my-3">Phase Center</p>
              
              <LinearProgress
                color="success"
                variant="determinate"
                value={60}
              />
            </div>
            </Link>
          </Grid>
          <Grid className=" px-2" item md={3}>
          <Link to="/phase-management/block-management">
            <div className="bg-white py-8 px-5 rounded-lg" style={{ border: '4px solid orange'}} >
              <h5 className=" text-base font-medium uppercase text-black-2">
              Step 3
              </h5>
              <p className=" text-xl text-[#000000]  my-3">Block Phase Wise</p>
              
              <LinearProgress
                color="success"
                variant="determinate"
                value={60}
              />
            </div>
            </Link>
          </Grid>
          <Grid className=" px-2" item md={3}>
          <Link to="/phase-management/seating-arrangement">
          <div className="bg-white py-8 px-5 rounded-lg" style={{ border: '4px solid orange'}} >
              <h5 className=" text-base font-medium uppercase text-black-2">
              Step 4
              </h5>
              <p className=" text-xl text-[#000000]  my-3">Seating Arrangement</p>
              
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

export default phaseManagement;
