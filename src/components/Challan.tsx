import { useState } from 'react';
import meezan from '../assets/mcb.png';
import easypaisa from '../assets/easypaisa.png';
import jazzcash from '../assets/jazzcash.png';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Challan = ({ setActiveTab }: any) => {
  const {
    state: { user },
  } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const [address, setAddress] = useState('');
  const [bankName, setBankName] = useState(' ');
  const [accHolderName, setAccHolderName] = useState(' ');
  const [accNumber, setAccNumber] = useState(' ');
  const [routingNumber, setRoutingNumber] = useState(' ');
  const [amount, setAmount] = useState(' ');
  const [refNumber, setRefNumber] = useState(' ');
  const [name, setName] = useState(' ');

  // const user = localStorage.getItem('user') || null;
  // const userData = user ? JSON.parse(user) : null;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      setShowModal(false);
      setActiveTab(2);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="px-6">
        <h1 className="my-8 text-green">
          you may submit challan physically at any nearest MCB branch, or pay
          online via ATM, jazzcash or easypaisa account.{' '}
        </h1>

        <div className=" flex flex-wrap">
          <div className="my-2 mx-2 w-[100%] rounded-b-xl bg-[white] pb-6 drop-shadow-lg dark:bg-boxdark lg:w-[300px]">
            <div className="h-[100px] rounded-t-xl bg-green"></div>

            <div className="px-4">
              <div className="flex">
                <div className="mt-[-45px] flex h-[90px] w-[90px] items-center justify-center rounded-full border-2 border-[#04BE5B] bg-white">
                  <img className="w-[65%]" src={meezan} alt="meezan-bank" />
                </div>
                <h1 className="px-2 font-medium dark:text-white">
                  MCB BANK LIMITED
                </h1>
              </div>

              <div className="my-4">
                <h1 className="text-[13px] text-[#848484] dark:text-white">
                  ACCOUNT:
                </h1>
                <p className="text-[13px] text-[#848484] dark:text-white">
                  IBAN# PK86MUCB0402217501008858
                </p>
              </div>

              <div className="my-4">
                <h1 className="text-[13px] text-[#848484] dark:text-white">
                  ADDRESS:
                </h1>
                <p className="text-[13px] text-[#848484] dark:text-white">
                  F-6 Super Market Branch Islamabad, Branch Code 1028
                </p>
              </div>
            </div>
          </div>

          <div className="my-2 mx-2 w-[100%] rounded-b-xl bg-[white] pb-6 drop-shadow-lg dark:bg-boxdark lg:w-[300px]">
            <div className="h-[100px] rounded-t-xl bg-green"></div>

            <div className="px-4">
              <div className="flex">
                <div className="mt-[-45px] flex h-[90px] w-[90px] items-center justify-center rounded-full border-2 border-[#04BE5B] bg-white">
                  <img className="w-[65%]" src={easypaisa} alt="meezan-bank" />
                </div>
                <div className="mx-2 mt-[-45px] flex h-[90px] w-[90px] items-center justify-center rounded-full border-2 border-[#04BE5B] bg-white">
                  <img className="w-[65%]" src={jazzcash} alt="meezan-bank" />
                </div>
              </div>

              <div className="my-4">
                <p className="text-[13px] text-[#04BE5B]">
                  You may submit challan physically at any nearest MCB branch,
                  or pay online via ATM, Jazzcash or easypaisa account.
                </p>
              </div>

              <div className="my-4">
                <p className="text-[13px] text-[#848484] dark:text-white">
                  <span className="text-[14px] text-[#FD0808] dark:font-bold">
                    Note:
                  </span>{' '}
                  Dear student, when you pay your fee challan then confirm your
                  enrollment form.
                </p>
              </div>
            </div>
          </div>

          <div className="my-2 w-[100%] lg:w-[300px]">
            <div className="mx-2 h-[66%] rounded-xl bg-[white] p-4 drop-shadow-lg dark:bg-boxdark">
              <h1 className="text-[20px] text-black dark:text-white">
                Select Payment Method
              </h1>
              <div className="my-4 flex flex-col">
                <button
                  className="rounded-lg bg-green py-3 text-white"
                  onClick={() => setShowModal(true)}
                >
                  Bank Draft
                </button>
                <button className="mt-2 rounded-lg border-4 border-green py-3">
                  Online Payment
                </button>
              </div>
            </div>

            <div className="mx-2 mt-3 flex h-[30%] flex-col rounded-xl bg-[white] p-4 drop-shadow-lg dark:bg-boxdark">
              <button className="mt-2 rounded-lg bg-green py-3 text-white">
                Download Challan
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="w-[62%] bg-white">
              <div className="w-[100%] p-4 dark:border-strokedark dark:bg-boxdark md:p-6">
                <h3 className="my-6 text-[22px] font-medium text-black dark:text-white">
                  Banker's Draft
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-2">
                    <div className="col-span-6 bg-white p-2 dark:bg-boxdark  xl:col-span-6 ">
                      <div className="mx-auto items-center justify-center">
                        <div className="mt-2">
                          <label className="block text-black dark:text-white">
                            Full Name
                          </label>
                          <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none dark:border-white dark:bg-boxdark">
                            <input
                              required
                              type="text"
                              placeholder="Enter your Full Name"
                              className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 bg-white p-2 dark:bg-boxdark  xl:col-span-6 ">
                      <div className="mx-auto items-center justify-center">
                        <div className="mt-2">
                          <label className="block text-black dark:text-white">
                            Address
                          </label>
                          <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none dark:border-white dark:bg-boxdark">
                            <input
                              required
                              type="text"
                              placeholder="Enter your Address"
                              className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-2">
                    <div className="col-span-6 bg-white p-2 dark:bg-boxdark  xl:col-span-6 ">
                      <div className="mx-auto items-center justify-center">
                        <div className="mt-2">
                          <label className="block text-black dark:text-white">
                            Bank Name
                          </label>
                          <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none dark:border-white dark:bg-boxdark">
                            <input
                              required
                              type="text"
                              placeholder="Enter Bank Name"
                              className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                              onChange={(e) => setBankName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 bg-white p-2 dark:bg-boxdark  xl:col-span-6 ">
                      <div className="mx-auto items-center justify-center">
                        <div className="mt-2">
                          <label className="block text-black dark:text-white">
                            Account Holder Name
                          </label>
                          <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none dark:border-white dark:bg-boxdark">
                            <input
                              required
                              type="text"
                              placeholder="Enter Account Holder Name"
                              className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                              onChange={(e) => setAccHolderName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-2">
                    <div className="col-span-6 bg-white p-2 dark:bg-boxdark  xl:col-span-6 ">
                      <div className="mx-auto items-center justify-center">
                        <div className="mt-2">
                          <label className="block text-black dark:text-white">
                            Account Number
                          </label>
                          <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none dark:border-white dark:bg-boxdark">
                            <input
                              required
                              type="text"
                              placeholder="Enter Account Number"
                              className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                              onChange={(e) => setAccNumber(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 bg-white p-2 dark:bg-boxdark  xl:col-span-6 ">
                      <div className="mx-auto items-center justify-center">
                        <div className="mt-2">
                          <label className="block text-black dark:text-white">
                            Routing Number
                          </label>
                          <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none dark:border-white dark:bg-boxdark">
                            <input
                              required
                              type="text"
                              placeholder="Enter Account Holder Name"
                              className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                              onChange={(e) => setRoutingNumber(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-2">
                    <div className="col-span-6 bg-white p-2 dark:bg-boxdark  xl:col-span-6 ">
                      <div className="mx-auto items-center justify-center">
                        <div className="mt-2">
                          <label className="block text-black dark:text-white">
                            Amount
                          </label>
                          <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none dark:border-white dark:bg-boxdark">
                            <input
                              required
                              type="text"
                              placeholder="Enter Amount"
                              className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 bg-white p-2 dark:bg-boxdark  xl:col-span-6 ">
                      <div className="mx-auto items-center justify-center">
                        <div className="mt-2">
                          <label className="block text-black dark:text-white">
                            Reference Number (optional)
                          </label>
                          <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-l-8 border-[#CCCCCC] border-l-red bg-white outline-none dark:border-white dark:bg-boxdark">
                            <input
                              type="text"
                              placeholder="Enter Account Holder Name"
                              className="w-full bg-transparent py-3 px-5 font-medium outline-none transition"
                              onChange={(e) => setRefNumber(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="my-6 flex items-center justify-end">
                    <button className="mr-3 rounded-lg bg-green py-4 px-12 text-[18px] text-white">
                      Submit
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="rounded-lg bg-[#E72E2E] py-4 px-12 text-[18px] text-white"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </div>
  );
};

export default Challan;
