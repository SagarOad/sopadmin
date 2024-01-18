import { useState, useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from './Breadcrumb';
import axios from '../api/axios';
import { ClassicSpinner } from 'react-spinners-kit';

interface FAQData {
  id: number;
  title: string;
  question: string;
  answer: string;
  image: string;
}

const Faq = () => {
  const [data, setData] = useState<FAQData[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/faqlist`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              '11%13%07%1C%00%0B%00CXPHR%14'
            )}`,
          },
        });
        setLoading(false);

        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  const toggle = (i: number | null) => {
    if (selected == i) {
      return setSelected(null);
    }

    setSelected(i);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="FAQ" />
      <div className="mx-3 mt-12">
        {loading ? (
          <div className="absolute flex h-full w-full items-center justify-center bg-white">
            <ClassicSpinner color="#04BE5B" />
          </div>
        ) : (
          <div className="accordion px-[12px]">
            {data?.map((item, i) => (
              <div className="bg-[#E7E7E7] dark:bg-boxdark">
                <div className="title flex items-center justify-between px-8 py-4">
                  <h1
                    onClick={() => toggle(i)}
                    className="cursor-pointer rounded-md bg-[#86ACF5] p-3 text-[21px] text-white"
                  >
                    {item?.question}
                  </h1>
                </div>
                <div className={selected == i ? 'content show' : 'content'}>
                  <div className="flex justify-between bg-white p-8 dark:bg-black">
                    <div className="text-[18px] text-[#AEAEAE]">
                      <p className="mb-4">{item?.title}</p>
                      {item?.answer ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: item?.answer }}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Faq;
