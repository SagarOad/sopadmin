interface Props {
  heading: string;
  title1: string;
  title2: string;
  title3: string;
  title4: string;
  title5: string;
}

const EducationCard = ({
  heading,
  title1,
  title2,
  title3,
  title4,
  title5,
}: Props) => {
  return (
    <div className="col-span-12 dark:bg-boxdark dark:border-strokedark rounded-sm border border-stroke bg-white shadow-default xl:col-span-4">
      <div className="bg-green p-7.5 text-center">
        <h1 className="text-[32px] font-bold text-white dark:text-white">
          {heading}
        </h1>
      </div>

      <div className="p-7.5 text-center text-[20px] text-black dark:text-white font-bold">
        <h3 className="my-3">Result: {title1}</h3>
        <h3 className="my-3">Obtained Marks: {title2}</h3>
        <h3 className="my-3">Passing Year: {title3}</h3>
        <h3 className="my-3">Result Type: {title5}</h3>
      </div>
    </div>
  );
};

export default EducationCard;
