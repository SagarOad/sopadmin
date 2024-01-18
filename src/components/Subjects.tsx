import SubjectCard from './SubjectCard';
import SubjectsData from '../SubjectsData';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';

// Define the type for your data
interface SubjectData {
  id: number;
  category: string;
  date: string;
  image: string;
}

const Subjects = () => {
  const {
    state: { user },
  } = useAuth();
  const [data, setData] = useState<SubjectData[]>([]);
  // const user = localStorage.getItem('user') || null;
  // const userData = user ? JSON.parse(user) : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/exam-categories`, {
          params: {
            user_id: user?.user_id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });

        setData(response.data.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-12">
      <div className="bg-green py-10">
        <h1 className="text-center text-[26px] font-medium leading-[32px] text-white dark:text-white md:text-[32px]">
          SUBJECTS FOR SOP COMPETETION
        </h1>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-4">
        {data?.map((sub) => (
          <SubjectCard key={sub.id} title={sub.category} img={sub.image} />
        ))}
      </div>
      {/* <Timer /> */}
    </div>
  );
};

export default Subjects;
