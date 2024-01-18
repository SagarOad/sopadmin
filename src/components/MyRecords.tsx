import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from './Breadcrumb';
import QuizAccordion from './QuizAccordion';
import ExamAccordion from './ExamAccordion';
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { ClassicSpinner } from 'react-spinners-kit';
import { useAuth } from '../context/AuthContext';

// Define the type for your data
interface RecordsData {
  id: number;
  title: string;
  exam_type: string;
  image: string;
}

const MyRecords = () => {
  const {
    state: { user },
  } = useAuth();
  const [examData, setExamData] = useState<RecordsData[]>([]);
  const [quizData, setQuizData] = useState<RecordsData[]>([]);
  const [loading, setLoading] = useState(true);

  // const user = localStorage.getItem('user') || null;
  // const userData = user ? JSON.parse(user) : null;

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
        setExamData(response.data.exam_records);
        setQuizData(response.data.lms_records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(quizData);

  // const initialTab = <QuizAccordion quiz={quizData} />;
  // const secondTab = <ExamAccordion exam={examData} />;
  // const [initialContent, setInitialContent] = useState<JSX.Element>(initialTab);
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Records" />

      <div className="mx-3 bg-[#F4F4F4] dark:bg-[#292A33]">
        <div className="flex w-[100%] justify-between px-8 py-6 md:w-[50%]">
          <button
            className={`${
              // initialContent === initialTab ? 'bg-[#292A33]' : 'bg-white'
              activeTab === 0 ? 'bg-[#292A33]' : 'bg-white'
            } 
                rounded-full py-3 px-4 text-[18px] text-[#838383] focus:bg-[#292A33] focus:text-white`}
            type="button"
            onClick={() => {
              // setInitialContent(initialTab);
              setActiveTab(0);
            }}
          >
            Quiz
          </button>
          <button
            className={`${
              // initialContent === secondTab ? 'bg-[#292A33]' : 'bg-white'
              activeTab === 1 ? 'bg-[#292A33]' : 'bg-white'
            } 
                rounded-full py-3 px-4 text-[18px] text-[#838383] focus:bg-[#292A33] focus:text-white`}
            type="button"
            onClick={() => {
              // setInitialContent(secondTab);
              setActiveTab(1);
            }}
          >
            Exams
          </button>
        </div>
        {/* <div>{initialContent}</div> */}
        {loading ? (
          <div className="absolute flex h-full w-full items-center justify-center bg-white">
            <ClassicSpinner color="#04BE5B" />
          </div>
        ) : (
          <div>
            {activeTab == 0 ? (
              <QuizAccordion quiz={quizData} />
            ) : (
              <ExamAccordion exam={examData} />
            )}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default MyRecords;
