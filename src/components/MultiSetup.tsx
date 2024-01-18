import { useState } from 'react';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full rounded-lg bg-white p-6 shadow-md lg:max-w-xl">
        <h2 className="mb-4 text-lg font-medium">Step {step} of 2</h2>
        <div className="mb-4 flex">
          <div
            className={`border-gray-400 w-1/2 border-r ${
              step === 1 ? 'bg-blue-500 text-black' : 'bg-gray-200'
            } cursor-pointer p-2 text-center`}
            onClick={() => setStep(1)}
          >
            Step 1
          </div>
          <div
            className={`w-1/2 ${
              step === 2 ? 'bg-blue-500 text-black' : 'bg-gray-200'
            } cursor-pointer p-2 text-center`}
            onClick={() => setStep(2)}
          >
            Step 2
          </div>
          <div
            className={`w-1/2 ${
              step === 2 ? 'bg-blue-500 text-black' : 'bg-gray-200'
            } cursor-pointer p-2 text-center`}
            onClick={() => setStep(3)}
          >
            Step 2
          </div>
        </div>
        {step === 1 ? <Step1 /> : <Step2 />}
        {step === 2 ? <Step3 /> : <Step4 />}
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-lg px-6 py-1.5"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          {step < 2 && (
            <button
              className="bg-blue-500 hover:bg-blue-600 rounded-lg px-6 py-1.5 text-black"
              onClick={handleNext}
            >
              Next
            </button>
          )}

          {step === 2 && (
            <button
              className="bg-blue-500 hover:bg-blue-600 rounded-lg px-6 py-1.5 text-black"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Step1 = () => (
  <div>
    <h3 className="mb-4 text-lg font-medium">Step 1</h3>
    <div className="mb-4">
      <label className="text-gray-700 mb-2 block font-medium" htmlFor="name">
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        className="border-gray-400 w-full border p-2"
      />
    </div>
    <div className="mb-4">
      <label className="text-gray-700 mb-2 block font-medium" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="border-gray-400 w-full border p-2"
      />
    </div>
  </div>
);

const Step2 = () => (
  <div>
    <h3 className="mb-4 text-lg font-medium">Step 2</h3>
    <div className="mb-4">
      <label
        className="text-gray-700 mb-2 block font-medium"
        htmlFor="password"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="border-gray-400 w-full border p-2"
      />
    </div>
  </div>
);

const Step3 = () => (
  <div>
    <h3 className="mb-4 text-lg font-medium">Step 3</h3>
    <div className="mb-4">
      Hello World
    </div>
  </div>
);

const Step4 = () => (
    <div>
      <h3 className="mb-4 text-lg font-medium">Step 3</h3>
      <div className="mb-4">
        Hello World
      </div>
    </div>
  );

export default MultiStepForm;
