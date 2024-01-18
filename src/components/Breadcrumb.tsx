import { useNavigate } from 'react-router-dom';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';

interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="sticky top-0 z-999 hidden w-full flex-col gap-3 bg-[#fff] p-4 px-3 drop-shadow-1 dark:border-strokedark dark:drop-shadow-none sm:flex-row  sm:items-center sm:justify-between md:p-6 lg:block 2xl:p-6">
      {/* <h2 className="text-title-md2 font-medium text-black-2">
        SOP Admin Dashboard
      </h2> */}

      <div className="mt-3 flex items-center justify-between">
        <h2 className="flex text-title-md2 font-thin text-[#3b3b3b]">
          <span className="mr-2 flex text-green">
            <AiFillHome className="mr-2" />
            SOP /{' '}
          </span>
          {pageName}
        </h2>

        <div onClick={handleGoBack}>
          <BsFillArrowRightSquareFill className="rounded-lg bg-white text-[34px] text-[#00A651]  hover:text-[#ffa500]" />
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
