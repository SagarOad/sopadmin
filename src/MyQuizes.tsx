import DefaultLayout from './layout/DefaultLayout';
import Breadcrumb from './components/Breadcrumb';
import Classes from './components/Classes';
import { useEffect, useState } from 'react';
import axios from './api/axios';
import image from './images/product/Frame.png';
import { ClassicSpinner } from 'react-spinners-kit';
import { useAuth } from './context/AuthContext';

// Define the type for your data
interface QuizData {
  id: number;
  title: string;
  total_exams: number;
  total_questions: number;
  image: string;
  slug: string;
  examfinish: number;
}

const MyQuizes = () => {
  const {
    state: { user },
  } = useAuth();
  const [data, setData] = useState<QuizData[]>([]);
  // const user = localStorage.getItem('user') || null;
  // const userData = user ? JSON.parse(user) : null;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/dashboard-top-records`, {
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
        setData(response.data.lms_records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Quizes" />
      {loading ? (
        <div className="absolute flex h-full w-full items-center justify-center bg-white">
          <ClassicSpinner color="#04BE5B" />
        </div>
      ) : (
        <div className="p-4 md:p-6 2xl:p-10">
          <div className="mt-4 grid grid-cols-12 gap-4  md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-4">
            {data.map((quiz) => (
              <Classes
                key={quiz.id}
                img={image}
                standard={quiz.title}
                subjects=""
                chapter=""
                quizes=""
                slug={quiz.slug}
                exam={quiz.examfinish}
              />
            ))}
          </div>
          {/* <div className="flex items-center justify-center">
          <NavLink
            to="/choosesubject"
            className={`mt-4 items-center justify-center bg-[#00A651] px-5 py-2 text-[17px] font-medium text-white
          ${
            pathname.includes('choosesubject') && 'bg-graydark dark:bg-meta-4'
          }`}
          >
            Next
          </NavLink>
        </div> */}
        </div>
      )}
    </DefaultLayout>
  );
};

export default MyQuizes;
