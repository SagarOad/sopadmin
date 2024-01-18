import { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from './Breadcrumb';
import axios from '../api/axios';
import ExamCard from './ExamCard';
import { useAuth } from '../context/AuthContext';

// Define the type for your data
interface ExamsData {
  id: number;
  title: string;
  exam_type: string;
  image: string;
}

const MyExams = () => {
  const {
    state: { user },
  } = useAuth();
  const [data, setData] = useState<ExamsData[]>([]);
  // const user = localStorage.getItem('user') || null;
  // const userData = user ? JSON.parse(user) : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/dashboard-top-records`, {
          params: {
            user_id: user?.user_id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });

        setData(response.data.exam_records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (url: string | URL | undefined) => {
    window.open(url, '_blank');
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Exams" />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-4">
        {data.map((sub) => (
          <ExamCard
            key={sub.id}
            title={sub.title}
            img={sub.image}
            type={sub?.exam_type}
          />
        ))}
      </div>
    </DefaultLayout>
  );
};

export default MyExams;
