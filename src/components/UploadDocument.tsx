import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from './Breadcrumb';
import { NavLink, useLocation } from 'react-router-dom';

const UploadDocument = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <DefaultLayout>
      <Breadcrumb pageName='My Documents' />
    <div className='p-4 md:p-6 2xl:p-10'>
      <div className="col-span-12 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            GENERAL INFO
          </h3>
        </div>
        <form action="#">
          <div className="p-2">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Document Name
                </label>
                <input
                  type="text"
                  placeholder="Document Name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Category
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <option value="">Select Category</option>
                    <option value="">Army</option>
                    <option value="">Navy</option>
                    <option value="">Air Force</option>
                    <option value="">Karate</option>
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

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Select Document <span className="text-meta-1">*</span>
              </label>
              
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                placeholder="Upload file here"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          <div className='flex justify-end'>
            <button className="flex w-[150px] mr-2 justify-center rounded bg-[#00A651] p-3 font-medium text-gray">
             Upload
            </button>

            <NavLink
          to="/myeducation/mydocuments"
          className={`flex w-[150px] justify-center rounded bg-[#e12353] p-3 font-medium text-gray
          ${
            pathname.includes('myeducation/mydocuments')
          }`}
        >
          Close
        </NavLink>
          </div>
          </div>
        </form>
      </div>
    </div>
    </DefaultLayout>
  );
};

export default UploadDocument;
