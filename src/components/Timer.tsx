const Timer = () => {
  return (
    <div className="my-6 border bg-[#E6E6E6] dark:border-strokedark dark:bg-boxdark">
      <div className="bg-green py-10">
        <h1 className="text-center text-[26px] font-medium leading-[32px] text-white dark:text-white md:text-[32px]">
          LAST DATE OF STUDENT REGISTRATION
        </h1>
      </div>
      <div className="hidden auto-cols-max grid-flow-col justify-center gap-5 py-8 text-center md:grid">
        <div className="rounded-box flex flex-col bg-[#7D7D7D] px-12 py-6 pt-10">
          <h1 className="countdown font-mono text-[28px] text-white md:text-[60px]">
            15
          </h1>
          <p className="pt-8 text-[18px] text-white md:text-[26px]">days</p>
        </div>
        <div className="rounded-box text-neutral-content flex flex-col bg-[#7D7D7D] px-12 py-6 pt-10">
          <h1 className="countdown font-mono text-[28px] text-white md:text-[60px]">
            10
          </h1>
          <p className="pt-8 text-[18px] text-white md:text-[26px]">hours</p>
        </div>
        <div className="rounded-box text-neutral-content flex flex-col bg-[#7D7D7D] px-12 py-6 pt-10">
          <h1 className="countdown font-mono text-[28px] text-white md:text-[60px]">
            24
          </h1>
          <p className="pt-8 text-[18px] text-white md:text-[26px]">min</p>
        </div>
        <div className="rounded-box text-neutral-content flex flex-col bg-[#7D7D7D] px-12 py-6 pt-10">
          <h1 className="countdown font-mono text-[28px] text-white md:text-[60px]">
            34
          </h1>
          <p className="pt-8 text-[18px] text-white md:text-[26px]">sec</p>
        </div>
      </div>

      <div className="my-4 flex justify-center md:hidden">
        <div className="mx-2 flex w-auto items-center justify-center bg-[#7D7D7D] p-3">
          <div>
            <p className="text-center text-[20px] text-white">15</p>
            <p className="text-center text-[18px]">days</p>
          </div>
        </div>
        <div className="mx-2 flex w-auto items-center justify-center bg-[#7D7D7D] p-3">
          <div>
            <p className="text-center text-[20px] text-white">10</p>
            <p className="text-center text-[18px]">hours</p>
          </div>
        </div>
        <div className="mx-2 flex w-auto items-center justify-center bg-[#7D7D7D] p-3">
          <div>
            <p className="text-center text-[20px] text-white">24</p>
            <p className="text-center text-[18px]">min</p>
          </div>
        </div>
        <div className="mx-2 flex w-auto items-center justify-center bg-[#7D7D7D] p-3">
          <div>
            <p className="text-center text-[20px] text-white">34</p>
            <p className="text-center text-[18px]">sec</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
