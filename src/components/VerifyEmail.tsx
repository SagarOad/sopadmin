// @ts-nocheck

import { AiOutlineUnlock } from 'react-icons/ai';
import Logo from '../assets/Logo1.png';
import authBanner from '../assets/studentofpakistan 1.png';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  const [success, setSuccess] = useState(false);

  const handleVerification = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/emailverification',
        {
          otp,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // Handle successful sign-up response, e.g., show a success message or redirect
      console.log(response.data);
      setSuccess(true);
      navigate('/login');
      toast.success('Registration Successful!');
    } catch (err) {
      // Handle sign-up error, e.g., display an error message
      if (!err?.response) {
        console.log('No Server Response');
      } else if (err.response?.status === 404) {
        console.log("It's a 404 Error");
      } else {
        console.log('Verification Failed');
      }
    }
  };

  return (
    <div className="flex h-auto py-16 px-6 md:px-16 lg:h-[100vh] lg:py-0 lg:px-36">
      <div className="block w-[100vw] items-center justify-between rounded-sm bg-white lg:flex">
        <div className="w-auto bg-[#F5F5F5] py-8 px-3 shadow-lg md:px-8 lg:w-[40%]">
          <img className="mx-auto w-28" alt="Logo" src={Logo} />
          <div className="mt-7 mb-11">
            <h1 className="text-center text-[28px]">Verify Your Email</h1>
            <p className="text-center text-[18px] text-[#848484]">
              Enter Your OTP recieved in your email
            </p>
          </div>
          <div className="w-[100%]">
            <label className=" block text-[18px] font-medium text-black dark:text-white">
              <div className="mt-3 flex h-16 items-center justify-between rounded-lg border-l-8 border-stroke border-l-red bg-white px-6 outline-none drop-shadow-md">
                <input
                  type="text"
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  id="email"
                  className="w-full border-r-[1px] border-[#848484] py-2 text-[#848484] outline-none"
                ></input>
                <AiOutlineUnlock className="ml-5 text-[32px] font-thin text-[#848484]" />
              </div>
            </label>
          </div>

          <button
            onClick={handleVerification}
            className="mt-6 w-full cursor-pointer rounded-lg border bg-green py-3 text-center text-[20px] text-white transition hover:bg-opacity-90 md:mt-3 md:py-4"
          >
            Submit
          </button>
          <div className="text-center">
            <Link to={'/email/verification'}>
              <p>
                Generate <span className=" text-green">OTP</span> again?
              </p>
            </Link>
          </div>
        </div>

        <div className="hidden w-auto lg:block lg:w-[40%]">
          <img src={authBanner} alt="banner" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifyEmail;
