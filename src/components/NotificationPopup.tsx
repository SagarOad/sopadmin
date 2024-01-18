import { useState, useEffect } from 'react';
import { MdNotificationsActive } from 'react-icons/md';
import axios from '../api/axios';

// Define the type for your data
interface NotificationData {
  id: number;
  title: string;
  slug: string;
  url: string;
}

const notificationPopup = () => {
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
    <div>
      <div className="notifyPopupContainer h-[250px] w-[500px] max-w-full  overflow-scroll rounded-sm border-4 bg-white p-2 shadow-default dark:bg-black">
        {data.map((notification) => (
          <div
            key={notification.id}
            className="col-span-12 rounded-sm border-b border-stroke bg-white shadow-default dark:bg-boxdark xl:col-span-8"
            onClick={() => handleClick(notification?.url)}
          >
            <div>
              <div className="flex flex-col">
                <div className="flex border-stroke">
                  <div className=" flex items-center p-2.5">
                    <div className="flex-shrink-0">
                      <MdNotificationsActive className="text-[32px] text-[#00A651]" />
                    </div>
                  </div>

                  <div className="grid-cols-10 p-2.5 text-left">
                    <h2 className="text-[14px] font-bold text-black dark:text-white">
                      {notification.title}
                    </h2>
                    <p className="text-[14px] text-black dark:text-white">
                      {notification.slug}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default notificationPopup;
