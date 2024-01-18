const EducationForm = () => {
  return (
    <div className="w-[62%] bg-white">
      <div className="w-[100%] p-4 md:p-6">
        <h3 className="mt-6 text-[22px] font-medium text-black">
          ADD EDUCATION FORM
        </h3>
        <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-2">
          <div className="col-span-12 bg-white p-7.5 xl:col-span-6">
            {/* Student Card Starts Here */}
            <div className="mx-auto items-center justify-center">
              <div className="">
                <label className=" block text-black">Grade</label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white py-1 outline-none">
                  <select className="w-full bg-transparent py-3 px-5 outline-none transition">
                    <option value="">Select Your Grade</option>
                    <option value="">Grade 1</option>
                    <option value="">Grade 2</option>
                    <option value="">Grade 3</option>
                    <option value="">Grade 4</option>
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

              <div className="mt-2">
                <label className="block text-black dark:text-white">
                  Major Subjects
                </label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none">
                  <input
                    type="text"
                    placeholder="Please Select Major Subjects"
                    className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className=" block text-black">Result Type</label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white py-1 outline-none">
                  <select className="w-full bg-transparent py-3 px-5 outline-none transition">
                    <option value="">Select Your Result Type</option>
                    <option value="Semester">Semester</option>
                    <option value="Yearly">Yearly</option>
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

              <div className="mt-2">
                <label className="block text-black dark:text-white">
                  Total Marks
                </label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none">
                  <input
                    type="text"
                    placeholder="Total Marks"
                    className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className=" block text-black">Passing Yea</label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white py-1 outline-none">
                  <select className="w-full bg-transparent py-3 px-5 outline-none transition">
                    <option value="">Passing Year</option>
                    <option value="">Year 1</option>
                    <option value="">Year 2</option>
                    <option value="">Year 3</option>
                    <option value="">Year 4</option>
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
            </div>
            {/* Student Card ends here */}
          </div>

          <div className="col-span-12 bg-white p-2  xl:col-span-6">
            <div className="mx-auto items-center justify-center">
              <div className="mt-2">
                <label className="block text-black dark:text-white">
                  Institute Name
                </label>
                <div className="mt-2 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none">
                  <input
                    type="text"
                    placeholder="Institute Name"
                    className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className="block text-black dark:text-white">
                  Minor Subjects
                </label>
                <div className="mt-1  flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none">
                  <input
                    type="text"
                    placeholder="Minor Subjects"
                    className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className="block text-black dark:text-white">
                  Result/Passing Grade
                </label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none">
                  <input
                    type="text"
                    placeholder="Result/Passing Grade"
                    className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className="block text-black dark:text-white">
                  Marks Obtained
                </label>
                <div className="mt-1  flex items-center justify-between rounded-lg border-2 border-[#CCCCCC] bg-white outline-none">
                  <input
                    type="text"
                    placeholder="Marks Obtained"
                    className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className="block text-black dark:text-white">City</label>
                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-6 flex items-center justify-end">
          <button className="mr-3 rounded-lg bg-green py-4 px-12 text-[18px] text-white">
            Submit
          </button>
          <button
            // onClick={() => setShowModal(false)}
            className="rounded-lg bg-[#E72E2E] py-4 px-12 text-[18px] text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;
