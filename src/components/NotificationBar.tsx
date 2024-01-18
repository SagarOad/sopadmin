import { useEffect, useState } from 'react';
import { MdNotifications } from 'react-icons/md';
import axios from '../api/axios';
import { ClassicSpinner } from 'react-spinners-kit';

// Define the type for your data
interface NotificationData {
  id: number;
  title: string;
  date: string;
  url: string;
}

const NotificationBar = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<NotificationData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/notifications`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });

        setLoading(false);
        setData(response.data.records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (url: string | URL | undefined) => {
    window.open(url, '_blank');
  };

  return (
    <div className="col-span-12 rounded-sm border bg-[#faebd7] p-2 shadow-default dark:border-strokedark dark:bg-boxdark  xl:col-span-8">
      <div className="bg-green py-6">
        <h1 className="text-center text-[24px] leading-[30px] text-white dark:text-white md:text-[38px]">
          MY NOTIFICATION
        </h1>
      </div>

      <div className="mb-2 mt-6 flex">
        <div className="mr-2 flex items-center justify-center text-[38px]">
          <MdNotifications className="text-[38px] text-green md:text-[48px]" />
        </div>
        {loading ? (
          <div className=" flex h-full w-full items-center justify-center">
            <ClassicSpinner color="#04BE5B" />
          </div>
        ) : (
          <>
            {data &&
              data?.map((item: NotificationData) => (
                <div key={item?.id}>
                  <h1 className="w-[165px] bg-meta-6 text-[14px] font-medium text-black md:text-[16px]">
                    IMPORTANT NOTICE
                  </h1>
                  <p
                    className="mt-1 text-[13px] text-black dark:text-white md:text-[16px]"
                    onClick={() => handleClick(item?.url)}
                  >
                    {item?.title}
                  </p>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationBar;
