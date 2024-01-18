interface Props {
  name: string;
  registration: string;
  image: string;
  path: any;
}

const StudentCard = ({ name, registration, image, path }: Props) => {
  return (
    <div className="h-60 rounded-sm border-4 border-[#00A651]  bg-white p-7.5  shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="">
        <img
          className=" m-auto  h-[80px] object-contain object-top"
          src={`${path}${image}`}
        />
      </div>
      <h1 className="my-3 text-[25px] font-medium text-[#000000] dark:text-white">
        {name}
      </h1>

      <div className="flex justify-center">
        <h2 className="my-3 text-[13px] text-[#252525]">{registration}</h2>
      </div>
    </div>
  );
};

export default StudentCard;
