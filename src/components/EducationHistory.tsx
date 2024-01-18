import Breadcrumb from './Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import EducationCard from './EducationCard';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClassicSpinner } from 'react-spinners-kit';
import { useAuth } from '../context/AuthContext';

interface ExamsData {
  id: number;
  education_grade: string;
  education_institutename: string;
  education_resulttype: string;
  education_obtainmarks: string;
  education_passingyear: string;
}

const EducationHistory = () => {
  const {
    state: { user },
  } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [grade, setGrade] = useState('');
  const [subjects, setSubjects] = useState(' ');
  const [marks, setMarks] = useState(' ');
  const [passingYear, setPassingYear] = useState(' ');
  const [institute, setInstitute] = useState(' ');
  const [minorSubjects, setMinorSubjects] = useState(' ');
  const [passingGrade, setPassingGrade] = useState(' ');
  const [city, setCity] = useState(' ');
  const [marksObtained, setMarksObtained] = useState(' ');
  const [resultType, setResultType] = useState(' ');

  // const user = localStorage.getItem('user') || null;
  // const userData = user ? JSON.parse(user) : null;

  const [data, setData] = useState<ExamsData[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/educationlist`, {
        params: {
          userId: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setLoading(false);

      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // // Append form field values
      formData.append('education_totalmarks', marks);
      formData.append('education_passingyear', passingYear);
      formData.append('education_majorsubject', subjects);
      formData.append('education_grade', grade);
      formData.append('education_city', city);
      formData.append('education_minorsubject', minorSubjects);
      formData.append('education_resultgrade', passingGrade);
      formData.append('education_institutename', institute);
      formData.append('education_obtainmarks', marksObtained);
      formData.append('education_resulttype', resultType);
      formData.append('userId', `${user?.user_id}`);

      const response = await axios.post(`/savemyeducation`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      console.log(response.data);
      setShowModal(false);
      toast.success(' Successful!');
      await fetchData();
      // setSuccess(true);
    } catch (err) {
      console.log(err);
      toast.error('Faild');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Education" />
      <div className="border bg-[#F4F4F4] p-4 dark:border-strokedark dark:bg-[#292A33] md:p-6 2xl:p-10">
        <div className="flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 rounded-lg bg-green px-10 py-4 text-[17px] font-medium text-white"
          >
            Add
          </button>
        </div>
        {loading ? (
          <div className="flex h-full w-full items-center justify-center ">
            <ClassicSpinner color="#04BE5B" />
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-4">
            {data.map((data) => (
              <EducationCard
                key={data.id}
                heading={data.education_institutename}
                title1={data.education_grade}
                title2={data.education_obtainmarks}
                title3={data.education_passingyear}
                title4={data.education_resulttype}
                title5={data.education_resulttype}
              />
            ))}
          </div>
        )}
        {showModal ? (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
              <div className="w-[62%] bg-white">
                <div className="w-[100%] p-4 md:p-6">
                  <h3 className="my-6 text-[22px] font-medium text-black">
                    ADD EDUCATION FORM
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-2">
                      <div className="col-span-12 bg-white p-2 xl:col-span-6">
                        {/* Student Card Starts Here */}
                        <div className="mx-auto items-center justify-center">
                          <div className="">
                            <label className=" block text-black">Grade</label>
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
                          <div className="mt-2">
                            <label className="block text-black dark:text-white">
                              Major Subject
                            </label>
                            <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none">
                              <input
                                type="text"
                                placeholder="Enter Major Subject"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) => setSubjects(e.target.value)}
                              />
                            </div>
                          </div>

                          {/* <div className="mt-2">
                            <label className="block text-black dark:text-white">
                              Major Subjects
                            </label>
                            <div className="mt-1 flex justify-between items-center border-2 border-[#CCCCCC] rounded-lg bg-white outline-none">
                              <input
                                type="text"
                                placeholder="Please Select Major Subjects"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) => setSubjects(e.target.value)}
                              />
                            </div>
                          </div> */}

                          {/* <label className="block text-black dark:text-white">
                              Result Type
                            </label>
                            <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none">
                              <input
                                type="text"
                                placeholder="Enter Result Type"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) => setResultType(e.target.value)}
                              />
                            </div> */}
                          <div className="mt-5 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white py-1 outline-none">
                            <select
                              className="w-full bg-transparent py-3 px-5 outline-none transition"
                              onChange={(e) => setResultType(e.target.value)}
                            >
                              <option value="">Select Result Type</option>
                              <option value="Semester">Semester</option>
                              <option value="Yearly">Yearly</option>
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

                          <div className="mt-2">
                            <label className="block text-black dark:text-white">
                              Total Marks
                            </label>
                            <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none">
                              <input
                                type="text"
                                placeholder="Total Marks"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) => setMarks(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="mt-2">
                            <label className="block text-black dark:text-white">
                              Passing Year
                            </label>
                            <div className="mt-2 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none">
                              <input
                                type="text"
                                placeholder="Enter Pasing Year"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) => setPassingYear(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Student Card ends here */}
                      </div>

                      <div className="col-span-12 bg-white p-2  xl:col-span-6">
                        <div className="mx-auto items-center justify-center">
                          <div className="mt-2">
                            <label className="block text-black dark:text-white">
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
                            <label className="block text-black dark:text-white">
                              Minor Subjects
                            </label>
                            <div className="mt-1  flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none">
                              <input
                                type="text"
                                placeholder="Minor Subjects"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) =>
                                  setMinorSubjects(e.target.value)
                                }
                              />
                            </div>
                          </div>

                          {/* <div className="mt-2">
                            <label className="block text-black dark:text-white">
                              Result/Passing Grade
                            </label>
                            <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none">
                              <input
                                type="text"
                                placeholder="Result/Passing Grade"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) =>
                                  setPassingGrade(e.target.value)
                                }
                              />
                            </div>
                          </div> */}
                          <div className="mt-5 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white py-1 outline-none">
                            <select
                              className="w-full bg-transparent py-3 px-5 outline-none transition"
                              onChange={(e) => setPassingGrade(e.target.value)}
                            >
                              <option value="">Select Passing Grade</option>
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                              <option value="D">D</option>
                              <option value="E">E</option>
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

                          <div className="mt-2">
                            <label className="block text-black dark:text-white">
                              Marks Obtained
                            </label>
                            <div className="mt-1  flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none">
                              <input
                                type="text"
                                placeholder="Marks Obtained"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) =>
                                  setMarksObtained(e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="mt-2">
                            <label className="block text-black dark:text-white">
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

export default EducationHistory;
