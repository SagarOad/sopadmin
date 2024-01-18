import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from './Breadcrumb';
import RegistrationButtons from './RegistrationButtons';

const Guide = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Student Registraion For SOP Program' />
      
      <div className='flex'>
      <div className='p-4 md:p-6 2xl:p-10 w-[50%]'>
      <RegistrationButtons />
      <div className='mt-[50px]'>
     
        <h1 className="text-[21px] my-4 font-medium text-black my">Step 1</h1>
        <p className="text-[21px]  text-black">
          PLease select your desired program and fill out the neccessary details
          in "Program Registration Tab" after submitting the details a fee
          challan will be generated.
        </p>
      </div>

      <div className='mt-[50px]'>
        <h1 className="text-[21px] my-4 font-medium text-black">Step 2</h1>
        <p className="text-[21px]  text-black">
          Please go to the "Challan Tab" there you can play the mentioned amount
          in fee challan through any of the following payment methods
        </p>
      </div>

      <div className='mt-[50px]'>
        <h1 className="text-[21px] my-4 font-medium text-black">Step 3</h1>
        <p className="text-[21px]  text-black">
          PLease upload the receipt of your transaction in the "Verification
          Tab", so we can process your registration asap.
        </p>
      </div>
      </div>

      <div className='50% flex justify-center items-center'>
        <img className='w-[500px]' src='https://us.123rf.com/450wm/rastudio/rastudio2011/rastudio201100264/159210258-registration-abstract-concept-vector-illustration.jpg?ver=6' />
      </div>
      </div>
    </DefaultLayout>
  );
};

export default Guide;
