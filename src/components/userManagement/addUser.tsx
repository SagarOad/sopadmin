import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';

const AddUser = () => {
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
  // const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [rolesData, setRolesData] = useState<User>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profile, setProfile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [password, setPassword] = useState('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setProfile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = () => {
    setPreviewImage(null);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    const CreateUser = async () => {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
  
        // formData.append('image', profile || '-');
        formData.append('id', `${user?.user_id}`);
        try {
          const response = await axios.post(`/saveuser`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('11%13%07%1C%00%0B%00CXPHR%14')}`,
            },
          });
  
          toast.success(response?.data?.message || 'Success');
          console.log(response);
          navigate('/usermanagement/all-users');
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
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`/rolelist`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      setRolesData(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(password);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Management / Add User" />
      <div className="block p-6 ">
        <div className="w-[100%] rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <h3 className=" mb-4 text-center text-2xl font-medium text-black-2">
            Add User
          </h3>
          <form ref={formRef} onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-4 text-center">
              <div className="profile_uploadBtn m-auto mb-5 text-center">
                <Button variant="text" component="label">
                  <CameraAltRoundedIcon sx={{ color: '#000000' }} />
                  <input
                    name="image"
                    className="form-control uploadInput"
                    id="vehicleImages"
                    accept="image/*"
                    required
                    type="file"
                    onChange={handleFileChange}
                    multiple={false}
                  />
                </Button>

                {previewImage && (
                  <div className="profileImg_preview">
                    <>
                      <button
                        className="cancelBtn"
                        type="button"
                        onClick={resetImage}
                      >
                        x
                      </button>
                      <img className="" src={previewImage} alt="user img" />
                    </>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="userName">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="userName"
                  required
                  placeholder="Enter Name"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="userEmail">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="userEmail"
                  required
                  placeholder="Enter Email"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="UserPhone">
                  Phone
                </label>
                <input
                  type="phone"
                  name="phone"
                  id="UserPhone"
                  required
                  placeholder="Enter Phone"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="userGender">
                  Gender
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="gender"
                  required
                  id="userGender"
                >
                  <option value=""> -- Select Gender --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="userdob">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  id="userdob"
                  required
                  placeholder="Enter Date of Birth"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="userrole">
                  Role
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="role_id"
                  required
                  id="userrole"
                >
                  <option value=""> -- Select Role --</option>
                  {rolesData &&
                    rolesData.map((data: User) => (
                      <option value={data?.role_id} key={data?.role_id}>
                        {' '}
                        {data?.role_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="userAddress">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="userPassword"
                  required
                  placeholder="Enter Password"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  // onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="userAddress">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="userAddress"
                  required
                  placeholder="Enter Address"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {/* <div className="mt-1 outline-none dark:bg-boxdark">
              <label className="text-black-2" htmlFor="userName">
                Address
              </label>
              <input
                type="text"
                name="name"
                id="userName"
                required
                placeholder="Enter Address"
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div> */}
            <div className=" mt-7 text-center">
             {submitting ? <button
                className="rounded-lg bg-[#cccc] px-8 py-2 font-medium text-black"
              >
                Submitting...
              </button> :              
             <button
                ref={btnRef}
                type="submit"
                className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
              >
                Add
              </button>}
            </div>
          </form>
        </div>

        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default AddUser;
