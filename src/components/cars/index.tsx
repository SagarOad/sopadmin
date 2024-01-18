import Breadcrumb from '../Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import * as React from 'react';
import 'react-quill/dist/quill.snow.css';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { checkUserRole } from '../../utils/role';

interface Column {
  id:
    | 'SNo'
    | 'Name'
    | 'expensefor'
    | 'month'
    | 'day'
    | 'registrationNo'
    | 'details';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'SNo', label: 'S No', minWidth: 70 },
  {
    id: 'Name',
    label: 'Expense Title',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'expensefor',
    label: 'Expense For',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'registrationNo',
    label: 'Expense Amount',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'day',
    label: 'Expense Day',
    minWidth: 170,
    align: 'left',
  },

  {
    id: 'month',
    label: 'Expense Month',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'details',
    label: 'Other Details',
    minWidth: 170,
    align: 'left',
  },
];

interface Data {
  id: number;
  name: string;
  expenseAmount: string;
  expenseFor: string;
  registrationNo: string;
  officeHead: string;
  expenseTitle: string;
  month: string;
  day: string;
  otherDetails: string;
}

const AddCars = () => {
  const {
    state: { user },
  } = useAuth();

  const navigate = useNavigate();

  React.useEffect(() => {
    const allowedRoles: number[] = [ROLES.ADMIN, ROLES.ACCOUNTS];

    if (!checkUserRole(user?.role_id || 0, allowedRoles)) {
      navigate('/');
    }
  }, []);

  const formRef = React.useRef<HTMLFormElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  // const navigate = useNavigate();

  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    async (e) => {
      e.preventDefault();
setSubmitting(true)
      const AddDistrict = async () => {
        if (formRef.current) {
          const formData = new FormData(formRef.current);

          formData.append('id', `${user?.user_id}`);
          const response = await axios.post(`/addCars`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem(
                '11%13%07%1C%00%0B%00CXPHR%14'
              )}`,
            },
          });
          toast.success(response?.data?.message || 'Success');
          console.log(response);
          setOtherDetails('');
          setRegistrationNo('');
          setDay('');
          setMonth('');
          setName('');
          setModel('');
          setImage('');
          navigate('/expense/carslist');
        }
      };

      if (formRef.current) {
        try {
          AddDistrict();
        } catch (e) {
          console.error(e);
        }finally{
setSubmitting(false)

        }
      }
    },
    []
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Expense" />
      <div className="block p-6 ">
        <div className="w-[100%] flex justify-end rounded-lg bg-[#ffffff] p-0 dark:bg-boxdark md:mb-6 md:p-7">
          <h3 className=" mb-4 text-center text-4xl text-black-2">Add Cars</h3>
          <form ref={formRef} onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="carName">
                  Car Name
                </label>
                <input
                  type="text"
                  name="carName"
                  id="carName"
                  placeholder="Enter Car Name"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                />
              </div>

              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="model">
                  Car Model
                </label>
                <input
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Enter Car Model"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setModel(e.target.value)}
                  required
                  value={model}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="registrationNo">
                  Registration No.
                </label>
                <input
                  type="number"
                  name="registrationNo"
                  id="registrationNo"
                  placeholder="Enter Expense Amount"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setRegistrationNo(e.target.value)}
                  required
                  value={registrationNo}
                />
              </div>

              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="image">
                  Car Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  placeholder="Upload Image"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setImage(e.target.value)}
                  required
                  value={image}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="mt-1 outline-none dark:bg-boxdark">
                <label className="text-black-2" htmlFor="otherDetails">
                  Other Details
                </label>
                <input
                  type="text"
                  name="otherDetails"
                  id="otherDetails"
                  placeholder="Enter Other Details"
                  className="mt-1 w-full rounded-lg  border-2 bg-transparent bg-white py-3 px-5 font-medium outline-none transition dark:bg-boxdark"
                  onChange={(e) => setOtherDetails(e.target.value)}
                  required
                  value={otherDetails}
                />
              </div>
            </div>
            <div className=" mt-7 text-center">
            {submitting ?  <button
              className="rounded-lg bg-[#cccc] px-8 py-2 font-medium text-white">
              Submitting...
            </button> :
              <button
              ref={btnRef}
              type="submit"
              className="rounded-lg bg-[#04BE5B] px-8 py-2 font-medium text-white"
              >
                Submit
              </button>
              }
            </div>
          </form>
        </div>

        <ToastContainer />
      </div>







      
    </DefaultLayout>
  );
};

export default AddCars;
