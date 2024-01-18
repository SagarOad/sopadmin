import { SetStateAction, useState } from 'react';

interface Props {
  quiz: any;
  title: string;
  created_at: string;
  description: string;
}

const QuizAccordion = (quiz: { quiz: any }) => {
  const [selected, setSelected] = useState(null);
  console.log(quiz.quiz, 'quizData');
  const data = quiz.quiz;
  const toggle = (i: SetStateAction<null>) => {
    if (selected == i) {
      return setSelected(null);
    }

    setSelected(i);
  };
  return (
    <div>
      <div className="accordion px-[12px]">
        {data?.map((item: Props, i: SetStateAction<null>) => (
          <div className="bg-[#E7E7E7] dark:bg-boxdark border dark:border-strokedark">
            <div className="title flex items-center justify-between px-3 md:px-8 py-4">
              <h1
                onClick={() => toggle(i)}
                className="cursor-pointer rounded-md bg-[#86ACF5] p-3 text-[21px] text-white"
              >
                {item?.title}
              </h1>
              <h2 className="text-[21px] text-[#AEAEAE]">{item?.created_at}</h2>
            </div>
            <div className={selected == i ? 'content show' : 'content'}>
              <div className="flex justify-between bg-white p-8">
                <div className="text-[18px] text-[#AEAEAE]">
                  <p className="mb-4">{item?.title}</p>
                  {item?.description ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizAccordion;
