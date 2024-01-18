import React, { useEffect, useState } from 'react';
import Breadcrumb from '../src/components/Breadcrumb';
import DefaultLayout from '../src/layout/DefaultLayout';
import axios from './api/axios';
import { ClassicSpinner } from 'react-spinners-kit';
import { AuthContext, useAuth } from './context/AuthContext';

interface QuizData {
  id: number;
  user_id: number;
  title: string;
  total_exams: number;
  total_marks: number;
  username: string;
  name: string;
}

const LeaderBoard = () => {
  const {
    state: { user },
  } = useAuth();

  const [data, setData] = useState<QuizData[]>([]);
  const [loading, setLoading] = useState(true);

  // const user = localStorage.getItem('user') || null;
  // const userData = user ? JSON.parse(user) : null;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/analysis/exam/${user?.user_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        setLoading(false);
        setData(response.data.records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Leaderboard" />
      {/* <div className="py-8">
        <div className="flex pb-6">
          <div className="flex w-[250px] items-center justify-center">
            <h1 className="text-[20px] font-medium text-[#848484]">
              Program Name
            </h1>
          </div>

          <div className="w-[300px]">
            <input
              placeholder="Program Name"
              className="w-full rounded-lg border-2 border-[#CCCCCC] bg-transparent py-3 px-5 outline-none transition"
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex w-[250px] items-center justify-center">
            <h1 className="text-[20px] font-medium text-[#848484]">
              Phase Name
            </h1>
          </div>

          <div className="w-[300px]">
            <select className="w-full rounded-lg border-2 border-[#CCCCCC] bg-transparent py-3 px-5 outline-none transition">
              <option value="">Phase Name</option>
              <option value="">Hacking</option>
              <option value="">Web Development</option>
              <option value="">Graphic Desgining</option>
            </select>
          </div>
        </div>
      </div> */}

      <div className="mx-3 flex justify-between bg-[#04BE5B] py-6 px-12 text-[12px] font-medium text-white md:text-[21px]">
        <h1>Student Name</h1>
        <h1>Title</h1>
        <h1>Total Marks</h1>
      </div>
      {loading ? (
        <div className="absolute flex h-full w-full items-center justify-center bg-white">
          <ClassicSpinner color="#04BE5B" />
        </div>
      ) : (
        <>
          {data &&
            data?.map((result) => (
              <div className="mx-3 mb-1 flex justify-between border-b border-[#E0E0E0] px-6 py-6 text-[18px] font-medium text-black md:px-12">
                <div className="flex text-[#848484]">
                  <span className="mr-2 flex h-9 items-center justify-center bg-[#0073C6] px-1 text-[16px] text-white md:mr-5 md:h-auto md:px-3 md:text-[22px]">
                    {user?.username.substring(0, 2)}
                  </span>
                  <div>
                    <h1 className="text-center text-[12px] text-[#0073C6] md:text-[21px]">
                      {user?.name}
                    </h1>
                    {/* <p>Project Lead</p> */}
                  </div>
                </div>
                <div>
                  <div className="text-[#848484]">
                    <h1 className="mr-0 text-[12px] md:mr-[82px] md:text-[21px]">
                      {result?.title}
                    </h1>
                    {/* <p>Cost: $215</p> */}
                  </div>
                </div>
                <div className="text-[#848484]">
                  <h1 className="text-[12px] md:text-[21px]">
                    {result?.total_marks}
                  </h1>
                </div>
              </div>
            ))}
        </>
      )}
    </DefaultLayout>
  );
};

export default LeaderBoard;
