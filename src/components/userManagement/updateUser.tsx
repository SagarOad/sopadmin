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

const xorEncrypt = (data: string, key: string) => {
  const encryptedData = data.split('').map((char: string, i: number) => {
    const keyChar = key.charCodeAt(i % key.length);
    const encryptedChar = char.charCodeAt(0) ^ keyChar;
    return String.fromCharCode(encryptedChar);
  });
  return encryptedData.join('');
};
const xorDecrypt = (encryptedData: string, key: string) => {
  return xorEncrypt(encryptedData, key); // Since XOR is symmetric, encryption and decryption are the same
};

const UpdateUser = () => {
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

  const url = window.location.href;
  const extractUserIdFromUrl = (url: string) => {
    const parts = url.split('update-user?');
    return parts[parts.length - 1];
  };
  const userId = extractUserIdFromUrl(url);
  const decryptedId = xorDecrypt(userId, 'sopakistan');

  // const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profile, setProfile] = useState<File | null>(null);

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

  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      const CreateUser = async () => {
        if (formRef.current) {
          const formData = new FormData(formRef.current);

          formData.append('image', profile || '-');
          formData.append('id', `${user?.user_id}`);
          const response = await axios.post(`/updateuser`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem(
                '11%13%07%1C%00%0B%00CXPHR%14'
              )}`,
            },
          });
          toast.success(response?.data?.message || 'Success');
          console.log(response);
          navigate('/user-management/all-users');
        }
      };

      if (formRef.current) {
        try {
          CreateUser();
        } catch (e) {
          console.error(e);
        }
      }
    },
    []
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Management / Update User" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <h3 className=" mb-4 text-center text-2xl font-medium text-black-2">
            Update User
          </h3>
          <form ref={formRef} onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-4 text-center">
              <div className="profile_uploadBtn m-auto mb-5 text-center">
                {previewImage === null ? (
                  <Button variant="text" component="label">
                    <CameraAltRoundedIcon sx={{ color: '#000000' }} />
                    <input
                      hidden
                      name="image"
                      className="form-control"
                      id="vehicleImages"
                      accept="image/*"
                      required
                      type="file"
                      onChange={handleFileChange}
                      multiple={false}
                    />
                  </Button>
                ) : (
                  <div className=" m-auto text-center ">
                    <div>
                      {previewImage && (
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
                      )}
                    </div>
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
                  <option value="Admin">Admin</option>
                  <option value="user">user</option>
                </select>
              </div>
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

            <div className=" mt-7 text-center">
              <button
                ref={btnRef}
                type="submit"
                className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
              >
                Add
              </button>
            </div>
          </form>
        </div>

        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default UpdateUser;
