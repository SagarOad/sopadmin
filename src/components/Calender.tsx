import { useState } from 'react';
import Calendar from 'react-calendar';

const Calender = () => {
  const [date, setDate] = useState<any>(new Date());
  return (
    <div>
      <div className="h-[250px] w-[500px] max-w-full overflow-scroll rounded-sm border-4 bg-white p-2 shadow-default dark:bg-boxdark">
        <div className="calender-container text-black dark:text-white">
          <Calendar onChange={setDate} value={date} />
        </div>

        <div className="text-center text-black dark:text-white">
          Selected date: {date.toDateString()}
        </div>
      </div>
    </div>
  );
};

export default Calender;
