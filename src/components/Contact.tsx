import axios from '../api/axios';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from './Breadcrumb';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClassicSpinner } from 'react-spinners-kit';
import { useAuth } from '../context/AuthContext';

interface ContactData {
  id: number;
  title: string;
  date: string;
  message: string;
  subject: string;
}

const Contact = () => {
  const {
    state: { user },
  } = useAuth();
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<ContactData[]>([]);
  const [city, setCity] = useState('');
  const [file, setFile] = useState<FileList | null>(null);
  const [institute, setInstitute] = useState(' ');

  // const user = localStorage.getItem('user') || null;
  // const userData = user ? JSON.parse(user) : null;

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/ticketlist`, {
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
    fetchUserData();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // // Append form field values
      formData.append('subject', institute);
      formData.append('message', city);
      if (file && file.length > 0) {
        formData.append('image', file[0]);
      }
      formData.append('userId', `${user?.user_id}`);

      const response = await axios.post(`/createTicket`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      console.log(response.data);
      setShowModal(false);
      toast.success('Submit Successfully!');
      fetchUserData();
      // setSuccess(true);
    } catch (err) {
      console.log(err);
      toast.error('Submission Failed');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Support Center / My Tickets" />

      <div>
        <div>
          <div className="mx-3 mt-12 mb-6 flex justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 rounded-lg bg-green px-10 py-4 text-[17px] font-medium text-white"
            >
              Add
            </button>
          </div>

          <span className="mx-3 flex justify-between">
            <span className="w-[10%]  border-2 border-[#D9D9D9]  py-4 px-4">
              No.
            </span>
            <span className="w-[30%] border-2 border-[#D9D9D9]  py-4 px-4">
              Subjects
            </span>
            <span className="w-[60%] border-2 border-[#D9D9D9]  py-4 px-4">
              Message
            </span>
            {/* <span className="w-[8%]  border-2 border-[#D9D9D9] py-4 px-4">
              Status
            </span>
            <span className="w-[12%] border-2 border-[#D9D9D9]  py-4 px-4">
              Action
            </span> */}
          </span>
          {loading ? (
            <div className="absolute flex h-full w-full items-center justify-center bg-white">
              <ClassicSpinner color="#04BE5B" />
            </div>
          ) : (
            <>
              {data?.map((item, i) => (
                <span className="mx-3 flex justify-between" key={item?.id}>
                  <span className="w-[10%]  border-2 border-[#D9D9D9]  py-4 px-4">
                    {i}
                  </span>
                  <span className="w-[30%] border-2 border-[#D9D9D9]  py-4 px-4">
                    {item?.subject}
                  </span>
                  <span className="w-[60%] border-2 border-[#D9D9D9]  py-4 px-4">
                    {item?.message}
                  </span>
                </span>
              ))}
            </>
          )}
        </div>
        {showModal ? (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
              <div className="w-[62%] bg-white">
                <div className="w-[100%] p-4 md:p-6">
                  <h3 className="my-6 text-[22px] font-medium text-black">
                    Create Ticket
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-2">
                      <div className="col-span-12 bg-white p-2 ">
                        <div className="mx-auto items-center justify-center">
                          <div className="mt-2">
                            <label className="block text-black dark:text-white">
                              Please Describe Your Issue
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
                            <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none">
                              <input
                                type="text"
                                placeholder="Enter Message"
                                className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                                onChange={(e) => setCity(e.target.value)}
                              />
                              {/* <textarea 
                              onChange={(e) => setCity(e.target.value)}
                              
                              rows={3}
                              placeholder="City"
                              className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                            ></textarea> */}
                            </div>
                          </div>

                          <div className="mt-4">
                            <input
                              type="file"
                              onChange={(e) => setFile(e.target.files)}
                            />
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

export default Contact;
