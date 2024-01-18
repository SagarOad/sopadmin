import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from './Breadcrumb';
import Classes from './Classes';
import ClassData from '../ClassData';
import { NavLink, useLocation } from 'react-router-dom';

const ChooseSubjects = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Quizes" />
      <div className="p-4 md:p-6 2xl:p-10">
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-4">
          {ClassData.map((data) => (
            <Classes
              key={data.id}
              img={data.img}
              standard=""
              subjects={data.subjects}
              chapter=""
              quizes=""
              slug={''}
              exam={0}
            />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <NavLink
            to="/choosechapters"
            className={`mt-4 items-center justify-center bg-[#00A651] px-5 py-2 text-[17px] font-medium text-white
          ${pathname.includes('choosechapters')}`}
          >
            Next
          </NavLink>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ChooseSubjects;
