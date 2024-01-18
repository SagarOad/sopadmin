import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from './Breadcrumb';
import { useState } from 'react';
import SamplePaperList from './SamplePaperList';
import SamplePaperGrid from './SamplePaperGrid';

const SamplePaper = () => {
  const initialTab = <SamplePaperList />;
  const secondTab = <SamplePaperGrid />;
  const [initialContent, setInitialContent] = useState(initialTab);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sample Paper" />

      <div className="mx-3">
        <div className="flex w-[100%] md:w-[50%] justify-between px-8 py-6">
          <button
            className="
            rounded-full py-3 px-2 md:px-4 text-[18px] mr-4 font-medium text-[#838383]  focus:border-2 focus:border-[#04BE5B] focus:text-[#04BE5B]"
            type="button"
            onClick={() => {
              setInitialContent(initialTab);
            }}
          >
            List View
          </button>
          <button
            className="
            rounded-full py-3 px-2 md:px-4 text-[18px] font-medium text-[#838383] focus:border-2 focus:border-[#04BE5B] focus:text-[#04BE5B]"
            type="button"
            onClick={() => {
              setInitialContent(secondTab);
            }}
          >
            Grid View
          </button>
        </div>
        <div>{initialContent}</div>
      </div>
    </DefaultLayout>
  );
};

export default SamplePaper;
