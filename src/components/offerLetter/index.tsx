import DefaultLayout from '../../layout/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@mui/material';

const OfferLetter = () => {
  const {
    state: { user },
  } = useAuth();
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="block p-6 ">
      <div className=" webView  rounded-lg bg-[#ffffff] p-0 md:mb-6 md:p-7">
        <div className="row inspectionMain align-items-center mt-5">
          <div className="col-lg-12 border-bottom print-hidden mb-4 pb-3 text-end">
            <Button
              onClick={handlePrint}
              variant="contained"
              className=" bgSecondary text-white"
            >
              <i className="fa-solid fa-print me-2"></i>
              Print
            </Button>
          </div>
        </div>
        <h3 className=" mb-4 text-center text-4xl text-black-2">
          Offer Letter
        </h3>
        <div className="appointment-letter">
          <p style={{ textAlign: 'center', fontSize: '20px' }}>
            PRIVATE AND CONFIDENTIAL
          </p>
          <p>Current Date</p>
          <p>
            Mr. ƒ Ms. NAME <br />
            Address
            <br />
            City- PIN
          </p>
          <br />
          <p>Dear Applicant First Name,</p>
          <br />
          <p>
            We thank you for deciding to be a part of the Company Name family.
          </p>
          <br />
          <p>
            Congratulations and welcome onboard a dynamic and winning team!{' '}
          </p>
          <br />
          <p>
            Further to your acceptance of the offer letter dated Date of Offer
            Letter, we are pleased to confirm your appointment as Designation
            for our Department Name at Location in Company Name .{' '}
          </p>
          <p>
            Please make note of the following important terms and conditions of
            your employment:{' '}
          </p>
          <br />
          <p>
            Commencement of employment: You have joined our services on date of
            joining and the said date has been recorded as your Date of Joining
            and will be considered as such for all future purposes pertaining to
            your employmentƒassociation with us.
          </p>
          <br />
          <p>
            Compensation & Benefits: Please refer to Annexure I, for details of
            your remuneration and benefits as applicable to you. The aforesaid
            CTC is subject to applicable taxes and statutory deductions that may
            prevail from time to time.
          </p>
          <br />
          <ul style={{ paddingLeft: '15px' }}>
            Transfer:
            <li>
              While your current posting is in Location with Department, the
              company reserves the right to transfer you to another location,
              unit, department or company, associate company, subsidiary
              company, group company based on its requirements.
            </li>
            <li>
              In the event of such transfer you will be required to abide by the
              rules and regulations, service conditions and benefits of the
              department, store and location where you are transferred to.
            </li>
          </ul>
          <br />
          <p>
            Retirement: Your retirement from the services of the company will be
            on attainment of the age of 60 years.
          </p>
          <br />
          <p>
            Governing Terms & Conditions: You will be governed by the clauses
            mentioned in your Service Agreement, TCOC (Tata Code of Conduct),
            company HR policies and POSH (Prevention of Sexual Harassment) at
            all points of time during your tenure of employment with the
            company. Please note that the appointment is subject to the
            backgroundƒdocument verification. Please note that failure to adhere
            to these norms, may lead to immediate termination from the services
            of the company.
          </p>
          <br />
          <p>
            Declarations: This appointment is made on the basis of information
            provided by you. Should it prove untrueƒincorrect at any time, the
            Company reserves the rights to take appropriate action including
            forthwith termination of service. We shall be entitled to initiate
            necessary enquiries with the source of reference provided by you. In
            case of unfavorable report, we shall be entitled to take appropriate
            steps including forthwith terminating this agreement
          </p>
          <br />
          <p>
            Wish you a successful professional stint with us. We look forward to
            a mutually beneficial and enriching experience having you on board.
            All the best!
          </p>
          <br />
          <p>
            Warm Regards,
            <br />
            For Company Name
          </p>
          <p>
            Name,
            <br />
            Authorised Signatory Designation
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferLetter;
