import { ChangeEvent, useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import userImg from '../assets/Rectangle 123.png';
import DefaultLayout from '../layout/DefaultLayout';
import axios from '../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';

// Define the type for your data
interface UsernData {
  id: number;
  title: string;
  date: string;
  name: string;
  image: string;
  address: string;
  province: string;
  father_name: string;
  district: string;
}

const fixedKey = 'sopuserencrtedid';
// Decode the encoded ID
function decodeID(encodedID: string) {
  const decoded = atob(encodedID);
  let originalID = '';
  for (let i = 0; i < decoded.length; i++) {
    const keyChar = fixedKey[i % fixedKey.length];
    const decodedChar = String.fromCharCode(
      decoded.charCodeAt(i) ^ keyChar.charCodeAt(0)
    );
    originalID += decodedChar;
  }
  return originalID;
}

const StudentProfile = () => {
  const {
    state: { user },
  } = useAuth();

  const url = window.location.href;
  const extractUserIdFromUrl = (url: string) => {
    const parts = url.split('student-profile?');
    return parts[parts.length - 1];
  };
  const userId = extractUserIdFromUrl(url);
  const decodedID = decodeID(userId);

  const [data, setData] = useState<UsernData>();
  const [provinceData, setProvinceData] = useState<UsernData[]>([]);
  const [destrictData, setDestrictData] = useState<UsernData[]>([]);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profile, setProfile] = useState<File | null>(null);
  const [dob, setDOB] = useState('');
  const [name, setName] = useState('');
  const [motherName, setMotherName] = useState(' ');
  const [gender, setGender] = useState('');
  const [religion, setReligion] = useState(' ');
  const [fCNIC, setFCNIC] = useState(' ');
  const [fOccupation, setFOccupation] = useState(' ');
  const [fDasignation, setFDesignation] = useState(' ');
  const [fMobile, setFMobile] = useState(' ');
  const [fDepartment, setFDepartment] = useState(' ');
  const [motherCNIC, setMotherCNIC] = useState(' ');
  const [mOccupation, setMotherOccupation] = useState(' ');
  const [mDesignation, setMotherDesignation] = useState(' ');
  const [town, setTown] = useState(' ');
  const [village, setVillage] = useState(' ');
  const [province, setProvince] = useState(' ');
  const [district, setDistrict] = useState(' ');
  const [postal, setPostal] = useState(' ');
  const [street, setSteet] = useState(' ');
  const [house, setHouse] = useState(' ');
  const [certificate, setCertificate] = useState<Certificate[]>([]);
  const [education, setEducation] = useState<Document[]>([]);
  // const [passport, setPassport] = useState(' ');
  // const [email, setEmail] = useState('');
  // const [fName, setFName] = useState(' ');
  // const [password, setPassword] = useState('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setProfile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // const user = localStorage.getItem('user') || null;
  // const userData = user ? JSON.parse(user) : null;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/studentdetails`, {
          params: {
            user_id: decodedID,
            id: user?.user_id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });

        setCertificate(response.data.certificate);
        setEducation(response?.data?.education);
        setHouse(response?.data?.personal?.address);
        setName(response?.data?.personal?.father_name);
        setFCNIC(response?.data?.personal?.father_cnic);
        setFOccupation(response?.data?.personal?.father_occupation);
        setReligion(response?.data?.personal?.religion);
        setGender(response?.data?.personal?.gender);
        setDOB(response?.data?.personal?.dob);
        setMotherName(response?.data?.personal?.mother_name);
        setMotherCNIC(response?.data?.personal?.mother_cnic);
        setSteet(response?.data?.personal?.street);
        setTown(response?.data?.personal?.town);
        setDistrict(response?.data?.personal?.district);
        setProvince(response?.data?.personal?.province);
        setPostal(response?.data?.personal?.postal);
        setFMobile(response?.data?.personal?.father_mobile);
        setFDepartment(response?.data?.personal?.father_department);
        setFDesignation(response?.data?.personal?.father_designation);
        setMotherOccupation(response?.data?.personal?.mother_occupation);
        setMotherDesignation(response?.data?.personal?.mother_designation);
        setVillage(response?.data?.personal?.village);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/get-province`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });

        setProvinceData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMakeChange = (e: any) => {
    setProvince(e.target.value);

    if (province || data?.province) {
      const fetchDestrict = async () => {
        try {
          const response = await axios.get(`/get-district`, {
            params: {
              provinceId: e.target.value || data?.province,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                '11%13%07%1C%00%0B%00CXPHR%14'
              )}`,
            },
          });

          setDestrictData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchDestrict();
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />
      <div>
        <div className="grid grid-cols-12 gap-4 p-4 dark:border-strokedark dark:bg-boxdark md:gap-6 md:p-6 2xl:gap-2">
          <div className="col-span-12 bg-white p-7.5 dark:border-strokedark  dark:bg-boxdark xl:col-span-4">
            {/* Student Card Starts Here */}
            <div className="mx-auto items-center justify-center">
              <div className="relative z-30 mx-auto flex h-30 w-full max-w-30 items-center justify-center rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                <div className="relative drop-shadow-2">
                  <img
                    className="w-[160px] rounded-full"
                    src={
                      previewImage ||
                      `https://studentofpakistan.com/sopadminbackend/public/userimage/${data?.image}` ||
                      userImg
                    }
                    alt="user img"
                  />
                </div>
              </div>
              <div className="">
                <label className="block dark:text-white">Update Image</label>
                <input
                  type="file"
                  accept="image/*"
                  placeholder="Update Image"
                  className="w-full rounded-md border-2 border-l-8 border-[#CCCCCC] border-l-red bg-[#EEEEEE] py-3 px-6 text-[#848484] outline-none dark:border-white dark:bg-boxdark"
                  onChange={handleFileChange}
                  multiple={false}
                  defaultValue={data?.image}
                />
              </div>
              <h3 className="mt-6 text-[22px] font-medium dark:text-white">
                PERSONAL INFO
              </h3>
              <div className="mt-2">
                <div className="mb-4.5">
                  <label className="block dark:text-white">Date of Birth</label>
                  <input
                    value={dob}
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    className="w-full rounded-md border-2 border-l-8 border-[#CCCCCC] border-l-red bg-[#EEEEEE] py-3 px-6 text-[#848484] outline-none dark:border-white dark:bg-boxdark"
                    onChange={(e) => setDOB(e.target.value)}
                  />
                </div>
                {/* <div className="mt-5">
                    <label className="block dark:text-white">Passport No.</label>
                    <input

                      type="text"
                      placeholder="Enter your Passport Number"
                      className="w-full py-3 px-6 bg-[#EEEEEE] dark:border-white dark:bg-boxdark border-2 border-[#CCCCCC] outline-none border-l-8 border-l-red rounded-md text-[#848484]"
                      onChange={(e) => setPassport(e.target.value)}
                    />
                  </div> */}
                <div className="mt-5">
                  <label className="block dark:text-white">Gender</label>
                  <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none dark:border-white dark:bg-boxdark">
                    <select
                      name="gender"
                      className="w-full bg-transparent py-3 px-5 outline-none transition"
                      onChange={(e) => setGender(e.target.value)}
                      value={gender}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {/* <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span> */}
                  </div>
                </div>

                {/* <div className="mt-5">
                    <label className="block dark:text-white">Merital Status</label>
                    <div className="mt-1 flex justify-between items-center border-2 dark:border-white dark:bg-boxdark border-[#CCCCCC] rounded-lg bg-white outline-none">
                      <select

                        name="gender"
                        className="w-full bg-transparent py-3 px-5 outline-none transition"
                        onChange={(e) => setMarital(e.target.value)}
                      >
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div> */}

                <div className="mt-5">
                  <label className="block dark:text-white ">Religion</label>
                  <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none dark:border-white dark:bg-boxdark">
                    <select
                      className="w-full bg-transparent py-3 px-5 outline-none transition"
                      onChange={(e) => setReligion(e.target.value)}
                      value={religion}
                    >
                      <option value="Islam">Islam</option>
                      <option value="Hinduism">Hinduism</option>
                      <option value="Christian">Christian</option>
                      <option value="Zorostian">Zorostian</option>
                    </select>
                    {/* <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 px-6.5 pb-2">
              <h3 className="text-[22px] font-medium text-black dark:text-white">
                ADDRESS INFO
              </h3>
            </div>

            <div className="">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="mb-2">
                  <label className="block text-black dark:text-white">
                    Village
                  </label>
                  <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none dark:border-white dark:bg-boxdark">
                    <input
                      type="text"
                      value={village}
                      placeholder="Village"
                      className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                      onChange={(e) => setVillage(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="block text-black dark:text-white">
                    Town
                  </label>
                  <div className="mt-1 flex items-center justify-between rounded-lg border-2  border-[#CCCCCC] bg-white outline-none dark:border-white dark:bg-boxdark">
                    <input
                      type="text"
                      value={town}
                      placeholder="Town"
                      className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                      onChange={(e) => setTown(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <label className="block dark:text-white ">Province</label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none dark:border-white dark:bg-boxdark">
                  <select
                    className="w-full bg-transparent py-3 px-5 outline-none transition"
                    onChange={handleMakeChange}
                    value={province}
                  >
                    {provinceData &&
                      provinceData?.map((item) => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                  {/* <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="123 fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span> */}
                </div>
              </div>

              <div className="mb-2">
                <label className="block dark:text-white ">District</label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none dark:border-white dark:bg-boxdark">
                  <select
                    className="w-full bg-transparent py-3 px-5 outline-none transition"
                    onChange={(e) => setDistrict(e.target.value)}
                    value={district}
                  >
                    {destrictData &&
                      destrictData?.map((item) => {
                        return (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        );
                      })}
                    {data?.district ? (
                      <option value={data?.district}>{data?.district}</option>
                    ) : null}
                  </select>
                  {/* <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span> */}
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-black dark:text-white">
                  Postal Code
                </label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none dark:border-white dark:bg-boxdark">
                  <input
                    type="text"
                    value={postal}
                    placeholder="Postal Code"
                    className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                    onChange={(e) => setPostal(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-black dark:text-white">
                  Street
                </label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none dark:border-white dark:bg-boxdark">
                  <input
                    value={street}
                    placeholder="Street"
                    className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                    onChange={(e) => setSteet(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-black dark:text-white">
                  House No
                </label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none dark:border-white dark:bg-boxdark">
                  <input
                    value={house}
                    placeholder="House"
                    className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                    onChange={(e) => setHouse(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Student Card ends here */}
          </div>
          <div className="col-span-12 bg-white p-5 dark:border-strokedark dark:bg-boxdark  xl:col-span-4">
            <div className="px-6.5 pb-2">
              <h3 className="text-[22px] font-medium text-black dark:text-white">
                GENERAL INFO
              </h3>
            </div>

            <div className="">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="mb-2 w-full xl:w-full">
                  <label className="block text-black dark:text-white">
                    Father Name
                  </label>
                  <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none dark:border-white dark:bg-boxdark">
                    <input
                      type="text"
                      name="name"
                      value={name}
                      placeholder="Enter your Father Name"
                      className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="mb-2 w-full xl:w-full">
                    <label className="block text-black dark:text-white">
                      Email
                    </label>
                    <div className="mt-1 border-l-8 flex justify-between dark:border-white dark:bg-boxdark items-center border-l-red border-2 border-[#CCCCCC] rounded-lg bg-white outline-none">
                      <input

                        type="text"
                        defaultvalue={data?.email}
                        placeholder="Enter your name"
                        className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div> */}
              {/* <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="mb-2 w-full xl:w-full">
                    <label className="block text-black dark:text-white">
                      Password
                    </label>
                    <div className="mt-1 border-l-8 flex justify-between dark:border-white dark:bg-boxdark items-center border-l-red border-2 border-[#CCCCCC] rounded-lg bg-white outline-none">
                      <input

                        type="text"
                        defaultvalue={data?.password}
                        placeholder="Enter your name"
                        className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div> */}

              <div className="mb-2">
                <label className="block text-black dark:text-white">
                  Father CNIC
                </label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none dark:border-white dark:bg-boxdark">
                  <input
                    type="number"
                    value={fCNIC}
                    placeholder="Father CNIC"
                    className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                    onChange={(e) => setFCNIC(e.target.value)}
                  />
                </div>
              </div>
              {/* <div className="mb-2">
                  <label className="block text-black dark:text-white">
                    Father Name
                  </label>
                  <div className="mt-1 border-l-8 flex justify-between dark:border-white dark:bg-boxdark items-center border-l-red border-2 border-[#CCCCCC] rounded-lg bg-white outline-none">
                    <input

                      name="Father_name"
                      type="text"
                      placeholder="Father Name"
                      className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                      onChange={(e) => setFName(e.target.value)}
                    />
                  </div>
                </div> */}

              <div className="mb-2 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="block text-black dark:text-white">
                    Father Occupation
                  </label>
                  <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none dark:border-white dark:bg-boxdark">
                    <input
                      type="text"
                      value={fOccupation}
                      placeholder="Father Ocupation"
                      className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                      onChange={(e) => setFOccupation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="block text-black dark:text-white">
                    Father Designation
                  </label>
                  <div className="mt-1 flex items-center justify-between rounded-lg border-2  border-[#CCCCCC] bg-white outline-none dark:border-white dark:bg-boxdark">
                    <input
                      type="text"
                      value={fDasignation}
                      placeholder="Father Designation"
                      className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                      onChange={(e) => setFDesignation(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-black dark:text-white">
                  Father's Mobile Number
                </label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none dark:border-white dark:bg-boxdark">
                  <input
                    type="number"
                    value={fMobile}
                    placeholder="Father's Mobile Number"
                    className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                    onChange={(e) => setFMobile(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="block dark:text-white ">
                  Father's Department
                </label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none dark:border-white dark:bg-boxdark">
                  <input
                    type="text"
                    value={fDepartment}
                    placeholder="Father's Department"
                    className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                    onChange={(e) => setFDepartment(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-black dark:text-white">
                  Mother Name
                </label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none dark:border-white dark:bg-boxdark">
                  <input
                    type="text"
                    value={motherName}
                    placeholder="Mother Name"
                    className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                    onChange={(e) => setMotherName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-black dark:text-white">
                  Mother CNIC
                </label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none dark:border-white dark:bg-boxdark">
                  <input
                    type="number"
                    value={motherCNIC}
                    placeholder="Mother CNIC"
                    className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                    onChange={(e) => setMotherCNIC(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="mb-2 w-full xl:w-1/2">
                  <label className="block text-black dark:text-white">
                    Mother's Occupation
                  </label>
                  <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none dark:border-white dark:bg-boxdark">
                    <input
                      type="text"
                      value={mOccupation}
                      placeholder="Mother's Ocupation"
                      className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                      onChange={(e) => setMotherOccupation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-2 w-full xl:w-1/2">
                  <label className="block text-black dark:text-white">
                    Mother's Designation
                  </label>
                  <div className="mt-1 flex items-center justify-between rounded-lg border-2  border-[#CCCCCC] bg-white outline-none dark:border-white dark:bg-boxdark">
                    <input
                      type="text"
                      value={mDesignation}
                      placeholder="Mother's Designation"
                      className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                      onChange={(e) => setMotherDesignation(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* form 2 starts here */}
          <div className="col-span-12 dark:border-strokedark dark:bg-boxdark  xl:col-span-4">
            <div className=" mb-6 w-[100%] bg-white p-3">
              <h4 className="text-center text-[20px] font-medium uppercase text-black-2">
                Payment History
              </h4>
              <div className="scroll_able pt-4 pl-3">
                <p> 1- 2000 debited from your account</p>
                <p> 1- 2000 debited from your account</p>
                <p> 1- 2000 debited from your account</p>
                <p> 1- 2000 debited from your account</p>
                <p> 1- 2000 debited from your account</p>
                <p> 1- 2000 debited from your account</p>
                <p> 1- 2000 debited from your account</p>
                <p> 1- 2000 debited from your account</p>
                <p> 1- 2000 debited from your account</p>
                <p> 1- 2000 debited from your account</p>
                <p> 1- 2000 debited from your account</p>
                <p> 1- 2000 debited from your account</p>
                <p> 1- 2000 debited from your account</p>
                <p> 1- 2000 debited from your account</p>
              </div>
            </div>
            <div className=" mb-6 w-[100%] bg-white p-3">
              <h4 className="text-center text-[20px] font-medium uppercase text-black-2">
                My Certificate
              </h4>
              <div className="scroll_able pt-4 pl-3">
                <div className="grid grid-cols-4 gap-4">
                  <h4>Title</h4>
                  <h4>Institute</h4>
                  <h4>Marks</h4>
                  <h4>Year</h4>
                </div>
                {certificate &&
                  certificate.map((certificate) => {
                    return (
                      <div
                        className="grid grid-cols-4 gap-4"
                        key={certificate?.certificate_id}
                      >
                        <p>{certificate?.certificate_name}</p>
                        <p>{certificate?.certificate_institutename}</p>
                        <p>{certificate?.certificate_obtainmarks}</p>
                        <p>{certificate?.certificate_year}</p>
                      </div>
                    );
                  })}
                {certificate.length <= 0 ? (
                  <h4 className="mt-5 text-center">No Data</h4>
                ) : null}
              </div>
            </div>
            <div className=" mb-6 w-[100%] bg-white p-3">
              <h4 className="text-center text-[20px] font-medium uppercase text-black-2">
                My Education
              </h4>
              <div className="scroll_able pt-4 pl-3">
                <div className="grid grid-cols-4 gap-4">
                  <h4>Major Subject</h4>
                  <h4>Institute</h4>
                  <h4>Marks</h4>
                  <h4>Grade</h4>
                </div>
                {education &&
                  education.map((edu) => {
                    return (
                      <div
                        className="grid grid-cols-4 gap-4"
                        key={edu?.education_id}
                      >
                        <p>{edu?.education_majorsubject}</p>
                        <p>{edu?.education_institutename}</p>
                        <p>{edu?.education_obtainmarks}</p>
                        <p>{edu?.education_resultgrade}</p>
                      </div>
                    );
                  })}
                {education.length <= 0 ? (
                  <h4 className="mt-5 text-center">No Data</h4>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default StudentProfile;
