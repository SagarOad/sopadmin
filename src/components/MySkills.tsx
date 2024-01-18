import Breadcrumb from '../components/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import EducationCard from './EducationCard';
import { useState, useEffect } from 'react';
import Data from '../MySkillsData';
import axios from '../api/axios';
import CertificateCard from './CertificateCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';

interface SkillsData {
  id: number;
  certificate_name: string;
  certificate_duration: string;
  certificate_year: string;
  certificate_obtainmarks: string;
  certificate_grade: string;
}

const MySkills = () => {
  const {
    state: { user },
  } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const [grade, setGrade] = useState('');
  const [obtainmarks, setObtainmarks] = useState(' ');
  const [name, setName] = useState(' ');
  const [description, setDescription] = useState(' ');
  const [institute, setInstitute] = useState(' ');
  const [year, setYear] = useState(' ');
  const [city, setCity] = useState(' ');
  const [duration, setDuration] = useState(' ');
  const [totalmarks, setTotalmarks] = useState(' ');

  // const user = localStorage.getItem('user') || null;
  // const userData = user ? JSON.parse(user) : null;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // // Append form field values
      formData.append('certificate_name', name);
      formData.append('certificate_description', description);
      formData.append('certificate_obtainmarks', obtainmarks);
      formData.append('certificate_totalmarks', totalmarks);
      formData.append('certificate_duration', duration);
      formData.append('certificate_year', year);
      formData.append('certificate_institutename', institute);
      formData.append('certificate_city', city);
      formData.append('certificate_grade', grade);
      formData.append('userId', `${user?.user_id}`);

      const response = await axios.post(`/savemycertificate`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      console.log(response.data);
      setShowModal(false);
      toast.success('Added Successfully!');

      // setSuccess(true);
    } catch (err) {
      console.log(err);
      toast.error('Faild');
    }
  };

  const [data, setData] = useState<SkillsData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/certificatelist`, {
          params: {
            userId: user?.user_id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });

        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Skills and Certificates" />
      <div className="p-4 md:p-6 2xl:p-10">
        <div className="flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 rounded-lg bg-green px-10 py-4 text-[17px] font-medium text-white"
          >
            Upload
          </button>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-4">
          {data.map((data) => (
            <CertificateCard
              key={data.id}
              heading={data.certificate_name}
              title1={data.certificate_duration}
              title2={data.certificate_year}
              title3={data.certificate_obtainmarks}
              title4=""
              title5={data?.certificate_grade}
            />
          ))}
        </div>
        {showModal ? (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
              <div className="w-[62%] bg-white">
                <div className="w-[100%] p-4 md:p-6">
                  <h3 className="my-6 text-[22px] font-medium text-black">
                    ADD CERTIFICATE FORM
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-2">
                      <div className="col-span-12 bg-white p-2 xl:col-span-6">
                        {/* Student Card Starts Here */}
                        <div className="mx-auto items-center justify-center">
                          <div className="">
                            <label className="block font-medium text-black">
                              Certificate Name
                            </label>
                            <div className="mt-2 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none">
                              <input
                                type="text"
                                placeholder="Certificate Name"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="mt-2">
                            <label className="block font-medium text-black dark:text-white">
                              Obtained Marks
                            </label>
                            <div className="mt-2 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none">
                              <input
                                type="text"
                                placeholder="Obtained Marks"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) => setObtainmarks(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="mt-2">
                            <label className=" block font-medium text-black">
                              Duration Of Certificate (No.Of Months)
                            </label>
                            <div className="mt-2 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none">
                              <input
                                type="text"
                                placeholder="Duration Of Certificate"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) => setDuration(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="mt-2">
                            <label className="block font-medium text-black dark:text-white">
                              Institute Name
                            </label>
                            <div className="mt-2 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none">
                              <input
                                type="text"
                                placeholder="Institute Name"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) => setInstitute(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="mt-2">
                            <label className=" block font-medium text-black">
                              Grade
                            </label>
                            <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white py-1 outline-none">
                              <select
                                className="w-full bg-transparent py-3 px-5 outline-none transition"
                                onChange={(e) => setGrade(e.target.value)}
                              >
                                <option value="">Select Your Grade</option>
                                <option value="Grade 1">Grade 1</option>
                                <option value="Grade 2">Grade 2</option>
                                <option value="Grade 3">Grade 3</option>
                                <option value="Grade 4">Grade 4</option>
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
                          </div>
                        </div>
                        {/* Student Card ends here */}
                      </div>

                      <div className="col-span-12 bg-white p-2  xl:col-span-6">
                        <div className="mx-auto items-center justify-center">
                          <div className="mt-2">
                            <label className="block font-medium text-black dark:text-white">
                              Description
                            </label>
                            <div className="mt-2 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none">
                              <input
                                type="text"
                                placeholder="Description"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="mt-2">
                            <label className="block font-medium text-black dark:text-white">
                              Total Marks
                            </label>
                            <div className="mt-2 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none">
                              <input
                                type="text"
                                placeholder="Total Marks"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) => setTotalmarks(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="mt-2">
                            <label className="block font-medium text-black dark:text-white">
                              Certificate Year
                            </label>
                            <div className="mt-2 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none">
                              <input
                                type="text"
                                placeholder="Certificate Year"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) => setYear(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="mt-2">
                            <label className="block font-medium text-black dark:text-white">
                              City
                            </label>
                            <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none">
                              <input
                                type="text"
                                placeholder="City"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) => setCity(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="my-6 flex items-center justify-end">
                      <button className="mr-3 rounded-lg bg-green py-4 px-12 text-[18px] text-white">
                        Submit
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="rounded-lg bg-[#E72E2E] py-4 px-12 text-[18px] text-white"
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          </>
        ) : null}
        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default MySkills;
