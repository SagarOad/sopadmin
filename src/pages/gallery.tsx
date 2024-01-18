import Breadcrumb from '../components/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const Gallery = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gallery" />
      <div className="m-5">
        <Grid container spacing={2}>
          <Grid className=" px-2" item md={3}>
            <Link to="/gallery/addalbum">
              <div
                className="rounded-lg bg-white py-8 px-5"
                style={{ border: '4px solid orange' }}
              >
                <h5 className=" text-base font-medium uppercase text-black-2">
                  1
                </h5>
                <p className=" my-3 text-xl  text-[#000000]">Add New Album</p>

                <LinearProgress
                  color="success"
                  variant="determinate"
                  value={60}
                />
              </div>
            </Link>
          </Grid>
          <Grid className=" px-2" item md={3}>
            <Link to="/gallery/albums">
              <div
                className="rounded-lg bg-white py-8 px-5"
                style={{ border: '4px solid orange' }}
              >
                <h5 className=" text-base font-medium uppercase text-black-2">
                  2
                </h5>
                <p className=" my-3 text-xl  text-[#000000]">Albums</p>

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

export default Gallery;
