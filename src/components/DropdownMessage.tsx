import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// import { MdDeleteOutline } from 'react-icons/Md';
// import { AiOutlineShoppingCart } from 'react-icons/ai';


const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <li className="relative" x-data="{ dropdownOpen: false, notifying: true }">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        to="#"
      >
        <span className="absolute -top-0.5 -right-0.5 z-1 h-2 w-2 rounded-full bg-meta-1">
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>

        {/* <AiOutlineShoppingCart className="text-[23px]" /> */}
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className='flex p-2'>
          <div className='w-[20%] flex justify-center items-center'>
            <h1 className='text-[#00A651] text-[35px] font-bold'>XI</h1>
          </div>
          <div className='w-[80%]'>
            <div className='flex justify-between text-[18px] font-extrabold'>
               <h1>Product 1</h1>
               {/* <MdDeleteOutline className="text-[23px]" /> */}
            </div>
            <div className='flex justify-between mt-2'>
              <p>Product Description</p>
              <h1>$12.22</h1>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Dropdown End --> */}
    </li>
  );
};

export default DropdownMessage;
