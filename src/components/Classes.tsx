import { useNavigate } from 'react-router-dom';

interface Props {
  img: string;
  standard: string;
  subjects: string;
  chapter: string;
  quizes: string;
  slug: string;
  exam: number;
}

const Classes = ({
  img,
  standard,
  subjects,
  chapter,
  quizes,
  slug,
  exam,
}: Props) => {
  const navigate = useNavigate();

  const handleClick = (slug: string) => {
    navigate(`/quizpaper?slug=${slug}`);
  };
  return (
    <>
      {exam === 1 ? (
        <div className="col-span-12 flex h-[250px] items-center justify-center rounded-sm border border-stroke bg-[#00A651] pb-4 shadow-default  xl:col-span-4">
          <div className=" flex flex-col items-center justify-center">
            <img className="w-[150px] rounded-full bg-[#ea476f]" src={img} />
            <div>
              <h1 className="mt-4 text-[30px] text-white">{standard}</h1>
              <h1 className="mt-4 text-[24px] text-black">{subjects}</h1>
              <h1 className="mt-4 text-[24px] text-black">{chapter}</h1>
              <h1 className="mt-4 text-[24px] text-black">{quizes}</h1>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => handleClick(slug)}
          className="col-span-12 flex h-[250px] items-center justify-center rounded-sm border border-stroke pb-4 shadow-default  xl:col-span-4"
        >
          <div className=" flex flex-col items-center justify-center">
            <img className="w-[150px] rounded-full bg-[#ea476f]" src={img} />
            <div>
              <h1 className="mt-4 text-[30px] text-black dark:text-white">
                {standard}
              </h1>
              <h1 className="mt-4 text-[24px] text-black">{subjects}</h1>
              <h1 className="mt-4 text-[24px] text-black">{chapter}</h1>
              <h1 className="mt-4 text-[24px] text-black">{quizes}</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Classes;
