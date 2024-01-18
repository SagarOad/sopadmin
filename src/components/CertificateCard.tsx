interface Props {
  heading: string;
  title1: string;
  title2: string;
  title3: string;
  title4: string;
  title5: string;
}

const CertificateCard = ({
  heading,
  title1,
  title2,
  title3,
  title4,
  title5,
}: Props) => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default xl:col-span-4">
      <div className="bg-green p-7.5 text-center">
        <h1 className="text-[32px] font-bold text-white dark:text-white">
          {heading}
        </h1>
      </div>

      <div className="p-7.5 text-center text-[20px] dark:bg-boxdark font-bold text-black">
        <h3 className="my-3 dark:text-white">Duration: {title1}</h3>
        <h3 className="my-3 dark:text-white">Passing Year: {title2}</h3>
        <h3 className="my-3 dark:text-white">Obtained Marks: {title3}</h3>
        <h3 className="my-3 dark:text-white">Result Type: {title5}</h3>
      </div>
    </div>
  );
};

export default CertificateCard;
