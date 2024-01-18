// @ts-nocheck

import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo1.png';
import authBanner from '../../assets/Group.png';
import { VscAccount } from 'react-icons/vsc';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../api/axios';
import Cookies from 'js-cookie';

const xorEncrypt = (data, key) => {
  const encryptedData = data.split('').map((char, i) => {
    const keyChar = key.charCodeAt(i % key.length);
    const encryptedChar = char.charCodeAt(0) ^ keyChar;
    return String.fromCharCode(encryptedChar);
  });
  return encryptedData.join('');
};

const SignIn = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
      const token = response.data.token;

      localStorage.setItem('11%13%07%1C%00%0B%00CXPHR%14', token);
      // localStorage.setItem('user', JSON.stringify(response.data.data));

      const encryptedUserData = xorEncrypt(
        JSON.stringify(response?.data?.data),
        'pakistanzindabad'
      );
      Cookies.set('%2515M%250', encryptedUserData, {
        expires: 7,
      });

      // Clear the form inputs and set success state
      setEmail('');
      setPassword('');
      setSuccess(true);
      toast.success('Login Successful!');
      window.location.reload();
    } catch (err) {
      const error = err?.response?.data?.message;
      if (err?.response?.data?.message === 'Please verify your email!') {
        navigate('/email/verification');
      }
      toast.error(error);
      console.log(error);

      if (!err.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing email or password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else if (err.response?.status === 404) {
        console.log('Server stopped working');
      } else {
        setErrMsg('Login failed');
      }
    }
  };

  const showPass = () => {
    var x = document.getElementById('password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  };

  const [isIconVisible, setIsIconVisible] = useState(false);

  const toggleIconVisibility = () => {
    setIsIconVisible((prevIsVisible) => !prevIsVisible);
  };

  return (
    <>
      <div className="flex h-auto py-16 px-6 md:px-16 lg:h-[100vh] lg:py-0 lg:px-36">
        <div className="block w-[100vw] items-center justify-between rounded-sm bg-white lg:flex">
          <div className="w-auto bg-[#F5F5F5] py-12 px-3 shadow-lg md:px-8 lg:w-[40%]">
            <img className="mx-auto w-28" alt="Logo" src={Logo} />
            <h1 className="my-3 text-center text-[28px]">Log in</h1>
            <form onSubmit={handleSubmit}>
              <div className="w-[100%]">
                <label className="block text-[18px] font-medium text-black dark:text-white">
                  <div className="mt-3 flex h-16 items-center justify-between rounded-lg border-l-8 border-stroke border-l-red bg-white px-6 outline-none drop-shadow-md">
                    <input
                      required
                      type="email"
                      placeholder="Enter your email"
                      id="email"
                      ref={userRef}
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="w-full border-r-[1px] border-[#848484] py-2 text-[#848484] outline-none"
                    ></input>
                    <VscAccount className="ml-5 text-[32px] font-thin text-[#848484]" />
                  </div>
                </label>

                <label className="block text-[18px] font-medium text-black dark:text-white">
                  <div className="mt-3 flex h-16 items-center justify-between rounded-lg border-l-8 border-stroke border-l-red bg-white px-6 outline-none drop-shadow-md">
                    <input
                      required
                      type="password"
                      placeholder="Enter your password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className="w-full border-r-[1px] border-[#848484] py-2 text-[#848484] outline-none"
                    ></input>
                    <button type="button" onClick={showPass}>
                      {isIconVisible ? (
                        <AiOutlineEye
                          className="ml-5 text-[32px] font-thin text-[#848484]"
                          onClick={toggleIconVisibility}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          className="ml-5 text-[32px] font-thin text-[#848484]"
                          onClick={toggleIconVisibility}
                        />
                      )}
                    </button>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 w-full cursor-pointer rounded-lg border bg-green  py-3 text-center text-[20px] text-white transition hover:bg-opacity-90 md:mt-3 md:py-4"
              >
                Log In
              </button>
            </form>
            {/* <Link to="/signup" className="">
              <button className="mt-3 w-full cursor-pointer rounded-lg border bg-green py-3 text-center text-[20px] text-white transition hover:bg-opacity-90 md:py-4">
                Sign Up
              </button>
            </Link> */}

            <div className="mt-3 text-center">
              <Link to="/forgetpassword" className="">
                <p className="text-[20px] text-[#848484]">
                  Forgot your password?
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
    </>
  );
};

export default SignIn;
