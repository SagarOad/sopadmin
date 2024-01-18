interface Props {
  id: number;
  title: string;
  path: string;
  file: string;
}

const AlbumCard = ({ title, file, path, id }: Props) => {
  return (
    <div className="col-span-12 h-45 cursor-pointer  rounded-sm border-4 border-[#00A651] bg-white p-7.5 text-center  shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="">
        <img
          className=" m-auto  h-[90px] object-contain object-top"
          src={`${path}${id}/${file}`}
          loading={'lazy'}
        />
      </div>
      <h2 className="my-3 mb-0 text-[15px] font-medium text-[#000000] dark:text-white">
        {title}
      </h2>

      {/* 
      <div className='flex justify-between mt-6'>
      <button className="mt-4 rounded-lg flex justify-center items-center bg-[#00A651] px-5 py-2 text-[17px] font-medium text-white">
          <FiEdit className="mr-2" />
          Edit
        </button>

        <button className="mt-4 rounded-lg bg-[#BE0404] flex justify-center items-center px-5 py-2 text-[17px] font-medium text-white">
          <RiDeleteBin5Line className="mr-2" />
          Delete
        </button>
      </div> */}
    </div>
  );
};

export default AlbumCard;
