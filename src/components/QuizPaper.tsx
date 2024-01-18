import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from './Breadcrumb';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';

interface QuizData {
  id: number;
  question_id: number;
  option_id: number;
  option_name: string;
  question_name: string;
  total_exams: number;
  total_questions: number;
  totalquestion: number;
  totalanswer: number;
  questionhistory: any;
  isanswer: number;
  subject: string;
  message: string;
}

const QuizPaper = () => {
  const {
    state: { user },
  } = useAuth();
  const [data, setData] = useState<QuizData>();
  const [question, setQuestion] = useState<QuizData>();
  const [option, setOption] = useState<QuizData[]>([]);
  // const user = localStorage.getItem('user') || null;
  // const userData = user ? JSON.parse(user) : null;
  const [seconds, setSeconds] = useState(600);
  const [optionId, setOptionId] = useState<string | number>();
  const navigate = useNavigate();

  const getSlugFromURL = () => {
    const queryParams = new URLSearchParams(window.location.search);

    return queryParams.get('slug');
  };

  useEffect(() => {
    fetchData();
  }, []);
  const slug = getSlugFromURL();
  const fetchData = async () => {
    try {
      const response = await axios.get(`/quizdetails`, {
        params: {
          userId: user?.user_id,
          exam_slug: slug,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });

      setOption(response.data.option);
      setQuestion(response.data.question);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // // Append form field values

      formData.append('question_id', `${question?.question_id}`);
      formData.append('option_id', `${optionId}`);

      formData.append('userId', `${user?.user_id}`);

      const response = await axios.post(`/submitquizanswer`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      console.log(response.data);
      fetchData();
      // setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFinish = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('question_id', `${question?.question_id}`);
      formData.append('option_id', `${optionId}`);

      formData.append('userId', `${user?.user_id}`);
      formData.append('exam_slug', `${slug}`);

      const response = await axios.post(`/finishquiz`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      console.log(response);
      toast.success(response?.data?.message);
      navigate('/myeducation/myquizes');
      // setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [seconds]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return { minutes, seconds: remainingSeconds };
  };

  const { minutes, seconds: remainingSeconds } = formatTime(seconds);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Quizes" />
      <div className="mx-3 block md:flex">
        <div className="mr-2 mt-2 w-[100%] border-[3px] border-[#000000] p-4 md:w-[70%] md:p-6 2xl:p-10">
          <div className="flex items-center justify-between border-b-2 border-black py-2">
            <button className="rounded-lg bg-green p-3 px-4 font-bold text-white md:px-12">
              {data?.subject}
            </button>
            <button className="rounded-lg bg-[#5BC8F9] p-3 px-4 font-bold text-white md:px-12">
              Instruction
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col  justify-center"
          >
            <h1 className="border-b-2 border-black py-5 text-[21px] font-bold text-[#00A651] dark:border-white dark:text-white">
              Question No. {data ? data?.totalanswer + 1 : null} of{' '}
              {data?.totalquestion}
            </h1>
            <h1 className="border-b-2 border-black py-5 text-[21px] font-bold text-black dark:border-white dark:text-white">
              {question?.question_name}
            </h1>

            <div className="my-[45px] px-6 text-[21px]">
              {option &&
                option.map((data) => (
                  <div className="my-4" key={data?.option_id}>
                    <input
                      required
                      type="radio"
                      name={question?.question_name}
                      id="{question?.question_id}"
                      value={data?.option_id}
                      onChange={(e) => setOptionId(e.target.value)}
                    />
                    <label className="mx-2 font-medium text-black dark:text-white">
                      {data?.option_name}
                    </label>
                  </div>
                ))}

              <div>
                <div className="my-6 mt-14 flex items-center justify-between">
                  {data &&
                  data?.totalanswer + 1 !=
                    data?.totalquestion / data?.totalquestion ? (
                    <button className="mr-3 w-full rounded-lg bg-[#E72E2E] py-4 px-12 text-[18px] text-white">
                      Previous
                    </button>
                  ) : null}
                  {data && data?.totalanswer + 1 === data?.totalquestion ? (
                    <>
                      {optionId ? (
                        <button
                          onClick={handleFinish}
                          className="w-full rounded-lg bg-[#5BC8F9] p-3 px-12 font-medium text-white"
                        >
                          Finish
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full rounded-lg bg-[#b4b6b6] p-3 px-12 font-medium text-white"
                        >
                          Finish
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      type="submit"
                      className="w-full rounded-lg   bg-green py-4 px-12 text-[18px] text-white"
                    >
                      Next
                    </button>
                  )}
                </div>

                {/* <div className="flex justify-center">
                  <button className="rounded-lg bg-[#5BC8F9] p-3 px-12 font-medium text-white">
                    Finish
                  </button>
                </div> */}
              </div>
            </div>
          </form>
        </div>
        <div className="w-[100%] md:w-[30%]">
          <div className="flex items-center justify-between bg-[#D2EBFF] py-9 px-4">
            <h1 className="font-medium text-[#000000]">
              <span className="#04BE5B text-[32px] font-medium text-green">
                {minutes}
              </span>
              MIN
            </h1>
            <h1 className="font-medium text-[#000000]">
              <span className="#04BE5B text-[32px] font-medium text-green">
                {remainingSeconds}
              </span>
              SEC
            </h1>
          </div>

          <div className="my-3 flex flex-col justify-between bg-[#D2EBFF]">
            <div>
              <h1 className="py-6 text-center text-[22px] font-medium text-black">
                QUESTION PALLETE
              </h1>
              <div className="flex flex-col items-center justify-center">
                {data &&
                  data?.questionhistory?.map(
                    (data: QuizData, index: number) => (
                      <div
                        className={`my-1 w-[90%] rounded-xl ${
                          data?.isanswer == 0 ? 'bg-[#EE2558]' : 'bg-green'
                        }  p-3 text-center text-[20px]  text-white`}
                        key={data?.id}
                      >
                        {data?.isanswer == 0
                          ? `Q${index + 1}-Not Answered`
                          : data?.isanswer == 1
                          ? `Q${index + 1}-Answered`
                          : null}
                      </div>
                    )
                  )}
              </div>
            </div>

            <div className="mx-3 mt-28 mb-10">
              <h1 className="mb-6 mt-5 text-[26px] font-medium text-black">
                Legend :
              </h1>
              <div>
                <div className="flex justify-between">
                  <div className="flex">
                    <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-green text-[16px] font-medium text-white">
                      1
                    </div>
                    <p className="ml-2 text-[18px] font-semibold text-black">
                      {' '}
                      Answered
                    </p>
                  </div>
                  <div className="flex">
                    <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#EE2558] text-[16px] font-medium text-white">
                      2
                    </div>
                    <p className="ml-2 text-[18px] font-semibold text-black">
                      {' '}
                      Answered
                    </p>
                  </div>{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default QuizPaper;
