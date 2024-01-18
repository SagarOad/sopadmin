import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from '../../context/AuthContext';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { checkUserRole } from '../../utils/role';
import { ROLES } from '../../constants/roles';

interface MCQFormState {
  checkbox1: boolean;
  checkbox2: boolean;
  checkbox3: boolean;
  checkbox4: boolean;
}
interface Image {
  option_nameone: string;
  option_nametwo: string;
  option_namethree: string;
  option_namefour: string;
}

const QuestionBank = () => {
  const {
    state: { user },
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const allowedRoles: number[] = [ROLES.ADMIN, ROLES.CONTROLLER];

    if (!checkUserRole(user?.role_id || 0, allowedRoles)) {
      navigate('/');
    }
  }, []);
  // const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const [explanationHtml, setExplanationHtml] = useState('');
  const [questionHtml, setQuestionHtml] = useState('');
  const [examList, setExamList] = useState<Exams>();
  const [selectedProgram, setSelectedProgram] = useState<string | number>();
  const [nameOne, setOptionnameOne] = useState<string | number>();
  const [nameTwo, setOptionnameTwo] = useState<string | number>();
  const [nameThree, setOptionnameThree] = useState<string | number>();
  const [nameFour, setOptionnameFour] = useState<string | number>();
  const [questionType, setQuestionType] = useState<string | number>('1');
  const [questionLevel, setQuestionLevel] = useState<string | number>('1');
  const [images, setImages] = useState<Image>();

  const url = window.location.href;
  const extractUserIdFromUrl = (url: string) => {
    const parts = url.split('question-bank?');
    return parts[parts.length - 1];
  };
  const examId = extractUserIdFromUrl(url);

  const handleQuestionChange = (html: SetStateAction<string>) => {
    setQuestionHtml(html);
  };
  const handleExplanationChange = (html: SetStateAction<string>) => {
    setExplanationHtml(html);
  };

  const [formState, setFormState] = useState<MCQFormState>({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  });

  const handleCheckboxChange = (checkboxName: keyof MCQFormState) => {
    setFormState((prevState) => ({
      ...prevState,
      [checkboxName]: !prevState[checkboxName],
    }));
  };

  const fetchExamList = async () => {
    try {
      const response = await axios.get(`/examlist`, {
        params: {
          id: user?.user_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '11%13%07%1C%00%0B%00CXPHR%14'
          )}`,
        },
      });
      setExamList(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchExamList();
  }, []);
  useEffect(() => {
    setImages({
      option_nameone: '',
      option_nametwo: '',
      option_namethree: '',
      option_namefour: '',
    });
  }, [questionType]);

  const handleProgramSelect = (event: { target: { value: any } }) => {
    const selectedValue = event.target.value;
    setSelectedProgram(selectedValue);
  };

  const handleImageChange = (e: any, fieldName: string) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      setImages((prevImages: any) => ({
        ...prevImages,
        [fieldName]: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      const AddQuestion = async () => {
        if (formRef.current) {
          const formData = new FormData(formRef.current);

          formData.append('id', `${user?.user_id}`);
          const response = await axios.post(`/savequestion`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem(
                '11%13%07%1C%00%0B%00CXPHR%14'
              )}`,
            },
          });
          toast.success(response?.data?.message || 'Success');
          console.log(response);
          navigate('/onlineexam/all-questions');
        }
      };

      if (formRef.current) {
        try {
          AddQuestion();
        } catch (e) {
          console.error(e);
        }
      }
    },
    []
  );

  const onAddMoreSubmit: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(async (e) => {
      e.preventDefault();

      const AddQuestion = async () => {
        if (formRef.current) {
          const formData = new FormData(formRef.current);

          formData.append('id', `${user?.user_id}`);
          const response = await axios.post(`/savequestion`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem(
                '11%13%07%1C%00%0B%00CXPHR%14'
              )}`,
            },
          });
          toast.success(response?.data?.message || 'Success');
          console.log(response);

          setOptionnameOne('');
          setOptionnameTwo('');
          setOptionnameThree('');
          setOptionnameFour('');
          setExplanationHtml('');
          setQuestionHtml('');
          setFormState({
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
          });
        }
      };

      if (formRef.current) {
        try {
          AddQuestion();
        } catch (e) {
          console.error(e);
        }
      }
    }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Question Bank" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <form ref={formRef} onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="programName">
                  Select Exams
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="exam_slug"
                  required
                  id=""
                  onChange={handleProgramSelect}
                  value={selectedProgram || examId}
                >
                  <option value=""> -- Select Exams --</option>
                  {examList &&
                    examList.map((data) => (
                      <option value={data?.exam_id} key={data?.exam_id}>
                        {data?.exam_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="programName">
                  Select Question Type
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="questiontype_id"
                  required
                  id=""
                  onChange={(e) => setQuestionType(e.target.value)}
                  value={questionType}
                >
                  <option value={'1'}>MCQs</option>
                  <option value={'2'}>Fill in the blanks</option>
                  <option value={'3'}>Verbal Intelligence (image)</option>
                </select>
              </div>
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2 " htmlFor="programName">
                  Select Question Level
                </label>
                <select
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  name="questionlevel_id"
                  required
                  id=""
                  onChange={(e) => setQuestionLevel(e.target.value)}
                  value={questionLevel}
                >
                  <option value={'1'}>Beginner</option>
                  <option value={'2'}>Novice</option>
                  <option value={'3'}>Intermediate</option>
                  <option value={'4'}>Advance</option>
                  <option value={'5'}>Expert</option>
                </select>
              </div>
            </div>
            <h4 className=" my-5 text-3xl font-medium text-black-2">
              Question{' '}
              {questionType === '2' ? (
                <span className="text-base text-red ">
                  {
                    ' ( example: The color of Banana is _____. OR Ali is a _____ boy. )'
                  }
                </span>
              ) : null}
            </h4>
            <div>
              <input
                hidden
                type="text"
                name="question_name"
                id="ExamName"
                placeholder=" Exam Name"
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                value={questionHtml}
              />
              <ReactQuill
                value={questionHtml}
                onChange={handleQuestionChange}
                modules={{
                  toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['bold', 'italic', 'underline'],
                    ['link'],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    ['clean'],
                    ['code-block'],
                    [{ size: ['small', false, 'large', 'huge'] }],
                    ['image'],
                  ],
                }}
                formats={[
                  'header',
                  'list',
                  'bold',
                  'italic',
                  'underline',
                  'link',
                  'color',
                  'background',
                  'align',
                  'code-block',
                  'size',
                  'image',
                ]}
              />
            </div>
            <h4 className=" my-5 text-3xl font-medium text-black-2">
              Explanation <span className=" text-sm">(Optional)</span>{' '}
            </h4>
            <div>
              <input
                hidden
                type="text"
                name="question_explanation"
                id="ExamName"
                placeholder=" Exam Name"
                className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                value={explanationHtml}
              />
              <ReactQuill
                value={explanationHtml}
                onChange={handleExplanationChange}
                modules={{
                  toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['bold', 'italic', 'underline'],
                    ['link'],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    ['clean'],
                    ['code-block'],
                    [{ size: ['small', false, 'large', 'huge'] }],
                    ['image'],
                  ],
                }}
                formats={[
                  'header',
                  'list',
                  'bold',
                  'italic',
                  'underline',
                  'link',
                  'color',
                  'background',
                  'align',
                  'code-block',
                  'size',
                  'image',
                ]}
              />
            </div>
            {questionType !== '2' ? (
              <div className=" mt-7 text-center">
                <p className="text-[red]">Select the right Answers</p>
              </div>
            ) : null}
            {questionType === '1' ? (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="programName">
                    Add Option A
                  </label>
                  <span className="flex">
                    <input
                      hidden
                      type="text"
                      name="option_correctone"
                      id="programName"
                      placeholder="Enter Option A "
                      className="mx-2  px-5 "
                      value={formState.checkbox1 ? 1 : 0}
                    />
                    <input
                      type="checkbox"
                      id="programName"
                      placeholder="Enter Option A "
                      className="mx-2  px-5 "
                      checked={formState.checkbox1}
                      onChange={() => handleCheckboxChange('checkbox1')}
                    />

                    <input
                      type="text"
                      name="option_nameone"
                      id="programName"
                      required
                      placeholder="Enter Option A "
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => setOptionnameOne(e.target.value)}
                      value={nameOne}
                    />
                  </span>
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="programName">
                    Add Option B
                  </label>
                  <span className="flex">
                    <input
                      hidden
                      type="text"
                      name="option_correcttwo"
                      id="programName"
                      placeholder="Enter Option B "
                      className="mx-2  px-5 "
                      value={formState.checkbox2 ? 1 : 0}
                    />
                    <input
                      type="checkbox"
                      id="programName"
                      placeholder="Enter Option B "
                      className="mx-2  px-5 "
                      checked={formState.checkbox2}
                      onChange={() => handleCheckboxChange('checkbox2')}
                    />
                    <input
                      type="text"
                      name="option_nametwo"
                      id="programName"
                      required
                      placeholder="Enter Option B "
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => setOptionnameTwo(e.target.value)}
                      value={nameTwo}
                    />
                  </span>
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="programName">
                    Add Option C
                  </label>
                  <span className="flex">
                    <input
                      hidden
                      type="text"
                      name="option_correctthree"
                      id="programName"
                      placeholder="Enter Option C "
                      className="mx-2  px-5 "
                      value={formState.checkbox3 ? 1 : 0}
                    />
                    <input
                      type="checkbox"
                      value={'option_namethree'}
                      id="programName"
                      placeholder="Enter Option A "
                      className="mx-2  px-5 "
                      checked={formState.checkbox3}
                      onChange={() => handleCheckboxChange('checkbox3')}
                    />
                    <input
                      type="text"
                      name="option_namethree"
                      id="programName"
                      required
                      placeholder="Enter Option C "
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => setOptionnameThree(e.target.value)}
                      value={nameThree}
                    />
                  </span>
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="programName">
                    Add Option D
                  </label>
                  <span className="flex">
                    <input
                      hidden
                      type="text"
                      name="option_correctfour"
                      id="programName"
                      placeholder="Enter Option D "
                      className="mx-2  px-5 "
                      value={formState.checkbox4 ? 1 : 0}
                    />
                    <input
                      type="checkbox"
                      value={'option_namefour'}
                      id="programName"
                      placeholder="Enter Option A "
                      className="mx-2  px-5 "
                      checked={formState.checkbox4}
                      onChange={() => handleCheckboxChange('checkbox4')}
                    />
                    <input
                      type="text"
                      name="option_namefour"
                      id="programName"
                      placeholder="Enter Option D "
                      required
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => setOptionnameFour(e.target.value)}
                      value={nameFour}
                    />
                  </span>
                </div>
              </div>
            ) : questionType === '2' ? (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="programName">
                    Blank
                  </label>
                  <span className="flex">
                    <input
                      hidden
                      type="text"
                      name="option_correctone"
                      id="programName"
                      placeholder="Enter Option A "
                      className="mx-2  px-5 "
                      value={1}
                    />
                    <input
                      type="checkbox"
                      id="programName"
                      placeholder="Enter Option A "
                      className="mx-2  px-5 "
                      checked
                      onChange={() => handleCheckboxChange('checkbox1')}
                    />

                    <input
                      type="text"
                      name="option_nameone"
                      id="programName"
                      required
                      placeholder="Enter Blank"
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => setOptionnameOne(e.target.value)}
                      value={nameOne}
                    />
                  </span>
                </div>
              </div>
            ) : questionType === '3' ? (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="programName">
                    Add Option A
                  </label>
                  <span className="flex">
                    <input
                      hidden
                      type="text"
                      name="option_correctone"
                      id="programName"
                      placeholder="Enter Option A "
                      className="mx-2  px-5 "
                      value={formState.checkbox1 ? 1 : 0}
                    />
                    <input
                      type="checkbox"
                      id="programName"
                      placeholder="Enter Option A "
                      className="mx-2  px-5 "
                      checked={formState.checkbox1}
                      onChange={() => handleCheckboxChange('checkbox1')}
                    />

                    <input
                      type="file"
                      name="option_nameone"
                      id="programName"
                      required
                      placeholder="Enter Option A "
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => handleImageChange(e, 'option_nameone')}
                    />
                  </span>
                  {images?.option_nameone && (
                    <img
                      src={images?.option_nameone}
                      alt="Uploaded Preview"
                      width={200}
                      height={200}
                    />
                  )}
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="programName">
                    Add Option B
                  </label>
                  <span className="flex">
                    <input
                      hidden
                      type="text"
                      name="option_correcttwo"
                      id="programName"
                      placeholder="Enter Option B "
                      className="mx-2  px-5 "
                      value={formState.checkbox2 ? 1 : 0}
                    />
                    <input
                      type="checkbox"
                      id="programName"
                      placeholder="Enter Option B "
                      className="mx-2  px-5 "
                      checked={formState.checkbox2}
                      onChange={() => handleCheckboxChange('checkbox2')}
                    />
                    <input
                      type="file"
                      name="option_nametwo"
                      id="programName"
                      required
                      placeholder="Enter Option B "
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => handleImageChange(e, 'option_nametwo')}
                    />
                  </span>
                  {images?.option_nametwo && (
                    <img
                      src={images?.option_nametwo}
                      alt="Uploaded Preview"
                      width={200}
                      height={200}
                    />
                  )}
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="programName">
                    Add Option C
                  </label>
                  <span className="flex">
                    <input
                      hidden
                      type="text"
                      name="option_correctthree"
                      id="programName"
                      placeholder="Enter Option C "
                      className="mx-2  px-5 "
                      value={formState.checkbox3 ? 1 : 0}
                    />
                    <input
                      type="checkbox"
                      value={'option_namethree'}
                      id="programName"
                      placeholder="Enter Option A "
                      className="mx-2  px-5 "
                      checked={formState.checkbox3}
                      onChange={() => handleCheckboxChange('checkbox3')}
                    />
                    <input
                      type="file"
                      name="option_namethree"
                      id="programName"
                      required
                      placeholder="Enter Option C "
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => handleImageChange(e, 'option_namethree')}
                    />
                  </span>
                  {images?.option_namethree && (
                    <img
                      src={images?.option_namethree}
                      alt="Uploaded Preview"
                      width={200}
                      height={200}
                    />
                  )}
                </div>
                <div className="mt-1 outline-none dark:bg-boxdark">
                  <label className="text-black-2" htmlFor="programName">
                    Add Option D
                  </label>
                  <span className="flex">
                    <input
                      hidden
                      type="text"
                      name="option_correctfour"
                      id="programName"
                      placeholder="Enter Option D "
                      className="mx-2  px-5 "
                      value={formState.checkbox4 ? 1 : 0}
                    />
                    <input
                      type="checkbox"
                      value={'option_namefour'}
                      id="programName"
                      placeholder="Enter Option A "
                      className="mx-2  px-5 "
                      checked={formState.checkbox4}
                      onChange={() => handleCheckboxChange('checkbox4')}
                    />
                    <input
                      type="file"
                      name="option_namefour"
                      id="programName"
                      placeholder="Enter Option D "
                      required
                      className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                      onChange={(e) => handleImageChange(e, 'option_namefour')}
                    />
                  </span>
                  {images?.option_namefour && (
                    <img
                      src={images?.option_namefour}
                      alt="Uploaded Preview"
                      width={200}
                      height={200}
                    />
                  )}
                </div>
              </div>
            ) : null}

            <div className=" mt-7 text-center">
              <button
                ref={btnRef}
                type="submit"
                className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
              >
                Submit
              </button>
              <button
                onClick={onAddMoreSubmit}
                className="mx-2 rounded-lg bg-[orange] px-8 py-2 font-medium text-white"
              >
                Add More Question
              </button>
            </div>
          </form>
        </div>

        <ToastContainer />
      </div>
    </DefaultLayout>
  );
};

export default QuestionBank;
