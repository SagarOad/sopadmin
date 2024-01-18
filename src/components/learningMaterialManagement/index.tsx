import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../api/axios';
import { ClassicSpinner } from 'react-spinners-kit';
import DocumentCard from '../DocumentCard';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';

const learningMaterial = () => {
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

  const formRef = useRef<HTMLFormElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Material[]>([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [payment, setPayment] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`/lmslist`, {
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
      setData(response?.data?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
  
    const CreateUser = async () => {
      setSubmitting(true);
  
      if (formRef.current) {
        const formData = new FormData(formRef.current);
  
        formData.append('id', `${user?.user_id}`);
        try {
          const response = await axios.post(`/uploadlms`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('11%13%07%1C%00%0B%00CXPHR%14')}`,
            },
          });
  
          toast.success(response?.data?.message || 'Success');
          console.log(response);
          setPayment('');
          fetchData();
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }
    };
  
    if (formRef.current) {
      try {
        await CreateUser();
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  // No dependencies array as we are not using useCallback
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Learning Material Management" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <h3 className=" mb-4 text-start text-2xl font-medium text-black-2">
            Upload png & pdf only
          </h3>
          <button className="flex mr-2 justify-center rounded bg-[#00A651] p-3 font-medium text-gray" onClick={()=>setShowFormModal(true)}>
             Add Learning Material Management
            </button>
        </div>

        {loading ? (
          <div className="absolute flex h-full w-full items-center justify-center bg-white">
            <ClassicSpinner color="#04BE5B" />
          </div>
        ) : (
          <div className="bg-[#F4F4F4] p-4 dark:bg-[#292A33] md:p-6 2xl:p-10">
            <div className="flex justify-end"></div>
            <Grid container spacing={2}>
              {data?.map((data) => (
                <Grid
                  className=" lms_card mt-4 px-2 text-center"
                  item
                  md={3}
                  key={data?.lms_id}
                >
                  <DocumentCard
                    title={data?.lms_title}
                    file={data?.lms_document}
                    date={data?.created_at}
                    icon={data?.lms_extension}
                    extension={data?.lms_extension}
                    type={data?.lms_type}
                  />
                </Grid>
              ))}
            </Grid>

            <ToastContainer />
          </div>
        )}
      </div>



      .





      {showFormModal ? (
        <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="absolute bg-black w-full h-full -z-10 opacity-30"></div>
          <div className="md:w-[50%] w-[95%] p-2 rounded-lg bg-[#ffff]  dark:bg-boxdark md:mb-6 md:p-7">
         


          <form ref={formRef} onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="programName">
                  Enter Document Name
                </label>
                <input
                  type="text"
                  name="lms_title"
                  id="programName"
                  required
                  placeholder="Enter Document Name"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="lms_type">
                  Payment
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="lms_type"
                  id="lms_type"
                  onChange={(e) => setPayment(e.target.value)}
                  value={payment}
                >
                  <option value=""> -- Please Select --</option>

                  <option value="1">Paid</option>
                  <option value="0">Unpaid</option>
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4">
              <div className="material_uploadBtn m-auto mb-5 text-center">
                <Button variant="text" component="label">
                  <CameraAltRoundedIcon sx={{ color: '#000000' }} />

                  <input
                    name="lms_document"
                    className="form-control"
                    id="lmsdocument"
                    accept=".png,.pdf"
                    required
                    type="file"
                  />
                </Button>
              </div>
            </div>

            <div className=" mt-7 text-center flex justify-end gap-2">
         {submitting ?  <button
              className="rounded-lg bg-[#cccc] px-8 py-2 font-medium text-black">
              Submitting...
            </button> : <>
              <button
                ref={btnRef}
                type="submit"
                className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
                >
                Upload
              </button>
              <button
              className="rounded-lg bg-[#be0404] px-8 py-2 font-medium text-white"
              onClick={()=>setShowFormModal(false)}
              >
              Close
            </button>
              </>}
            </div>
          </form>


          </div>
        </div>
      ) : null}    
    





    </DefaultLayout>
  );
};

export default learningMaterial;
