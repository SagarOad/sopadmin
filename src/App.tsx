import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './Styles.css';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import NotificationPage from './pages/NotificationPage';
import MainPage from './pages/Dashboard/MainPage';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import StudentProfile from './pages/studentProfile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import MySkills from './components/MySkills';
import MyDocuments from './components/MyDocuments';
import MyRecords from './components/MyRecords';
import MyExams from './components/MyExams';
import MyQuizes from './MyQuizes';
import UploadDocument from './components/UploadDocument';
import EducationHistory from './components/EducationHistory';
import StudentRegistration from './components/StudentRegistration';
import ProgramRegistration from './components/ProgramRegistration';
import Challan from './components/Challan';
import Verification from './components/Verification';
import ChooseSubjects from './components/ChooseSubjects';
import ChooseChapters from './components/ChooseChapters';
import StartQuiz from './components/StartQuiz';
import QuizPaper from './components/QuizPaper';
import Guide from './components/Guide';
import ProtectedRoutes from './components/protectedRoutes';
import RegistrationTabs from './components/RegistrationTabs';
import SamplePaper from './components/SamplePaper';
import Contact from './components/Contact';
import LeaderBoard from './LeaderBoard';
import VerifyEmail from './components/VerifyEmail';
import VerifyOTP from './components/VerifyOTP';
import ReverseProtectedRoutes from './components/protectedRoutes/reverseProtection';
import ForgetPassword from './components/ForgetPassword';
import VerifyEmailForgetPassword from './components/VerifyEmailForgetPassword';
import ChangePassword from './components/ChangePassword';
import ProgramPhases from './components/phaseManagement/programphases';
import phaseManagement from './pages/phaseManagement';
import SeatingArrangement from './components/phaseManagement/seatingArrangement';
import StudentsManagement from './pages/studentsManagement';
import AllStudents from './components/studentsManagement/allStudents';
import OnlineExamSetup from './components/onlineExamSetup';
import QuestionBank from './components/questionBank';
import ListAllQuestions from './components/questionBank/listAllQuestions';
import Cookies from 'js-cookie';
import { useAuthContext } from './hooks/useAuthContext';
import SupportCenterManagement from './pages/supportCenterManagement';
import ActiveTickets from './components/supportCenterManagement/activeTickets';
import UserManagement from './pages/usermanagement';
import AllUsers from './components/userManagement/allUsers';
import AllBatches from './components/programManagement/allBatches';
import OpenedTickets from './components/supportCenterManagement/openedTickets';
import ClosedTickets from './components/supportCenterManagement/closedTickets';
import learningMaterial from './components/learningMaterialManagement';
import AddUser from './components/userManagement/addUser';
import UpdateUser from './components/userManagement/updateUser';
import Notifications from './components/notification';
import FAQs from './components/faqs';
import PhaseCenter from './components/phaseManagement/PhaseCenter';
import ProgramPhase from './components/programManagement/programPhase';
import UploadResult from './components/resultManagement/uploadResult';
import MeritList from './components/resultManagement/meritList';
import Result from './components/resultManagement/result';
import RequestedPayment from './components/accountManagement/requestedPayment';
import RejectedPayment from './components/accountManagement/rejectedPayment';
import VerifiedPayment from './components/accountManagement/verifiedPayment';
import GenerateResult from './components/resultManagement/generate';
import ProgramsManagement from './pages/programManagement';
import AddAttendance from './components/attendanceManagement/AddAttendance';
import AttendanceManagement from './pages/attendanceManagement';
import AccountManagement from './pages/accountManagement';
import ExamManagement from './pages/examManagement';
import OnlineExamManagement from './pages/onlineExamManagement';
import ResultManagement from './pages/resultManagement';
import OnlineResultManagement from './pages/onlineResultManagement';
import District from './components/district';
import ExtraSettings from './pages/setting';
import Province from './components/province';
import Inventory from './pages/inventory';
import InventoryList from './components/inventory';
import ConsumedInventoryList from './components/inventory/consumed';
import Office from './components/office';
import Expenses from './pages/expenses';
import ExpensesList from './components/expense';
import AddCars from './components/cars';
import CarsList from './components/cars/carsList';
import ApplicationManagement from './pages/applicationManagement';
import AllApplications from './components/applicationManagement';
import EmployeesAttendance from './components/attendanceManagement/employeesAttendance';
import AccountCredit from './components/expense/credit';
import AccountDebit from './components/expense/debit';
import BalanceSheet from './components/expense/balanceSheet';
import OfferLetter from './components/offerLetter';
import Blogs from './pages/blog';
import AddNewBlog from './components/blog';
import BlogsList from './components/blog/bloglist';
import Gallery from './pages/gallery';
import AddNewAlbum from './components/album';
import Albums from './components/album/albums';
import EmployeeTiming from './components/userManagement/empoyeeTiming';
import EmployeeLeave from './components/userManagement/empoyeeLeave';
import EmployeeApprovedLeave from './components/userManagement/empoyeeApprovedLeave';
import EmployeeDeclinedLeave from './components/userManagement/empoyeeDeclinedLeave';
import QuestionApproval from './components/questionApproval';
import BlockManagement from './components/phaseManagement/blockManagement';
import ListAllExam from './pages/listAllExam';

const xorEncrypt = (data: string, key: string) => {
  const encryptedData = data.split('').map((char, i) => {
    const keyChar = key.charCodeAt(i % key.length);
    const encryptedChar = char.charCodeAt(0) ^ keyChar;
    return String.fromCharCode(encryptedChar);
  });
  return encryptedData.join('');
};
const xorDecrypt = (encryptedData: string, key: string) => {
  return xorEncrypt(encryptedData, key); // Since XOR is symmetric, encryption and decryption are the same
};

function App() {
  const { dispatch } = useAuthContext();
  React.useEffect(() => {
    const data = Cookies.get('%2515M%250');
    if (data) {
      if (data) {
        const decryptedData = xorDecrypt(data, 'pakistanzindabad');
        dispatch({ type: 'LOGIN', payload: JSON.parse(decryptedData) });
      }
    } else {
      dispatch({
        type: 'LOGOUT',
        payload: null,
      });
    }
  }, [dispatch]);

  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (
    <>
      <Routes>
        {/* <Route path="/" element={<ECommerce />} /> */}
        <Route path="/" element={<ProtectedRoutes Component={MainPage} />} />
        <Route
          path="/offerletter"
          element={<ProtectedRoutes Component={OfferLetter} />}
        />
        <Route
          path="/phase-management/program-phases"
          element={<ProtectedRoutes Component={ProgramPhases} />}
        />
        <Route
          path="/phase-management/phase-centers"
          element={<ProtectedRoutes Component={PhaseCenter} />}
        />
        <Route
          path="/phase-management/block-management"
          element={<ProtectedRoutes Component={BlockManagement} />}
        />

        <Route
          path="/phase-management"
          element={<ProtectedRoutes Component={phaseManagement} />}
        />
        <Route
          path="/attendancemanagement/addattendance"
          element={<ProtectedRoutes Component={AddAttendance} />}
        />
        <Route
          path="/attendancemanagement/employeesattendance"
          element={<ProtectedRoutes Component={EmployeesAttendance} />}
        />
        <Route
          path="/attendancemanagement"
          element={<ProtectedRoutes Component={AttendanceManagement} />}
        />
        <Route
          path="/students-management"
          element={<ProtectedRoutes Component={StudentsManagement} />}
        />

        <Route
          path="/application-management"
          element={<ProtectedRoutes Component={ApplicationManagement} />}
        />

        <Route
          path="/application-management/all-applications"
          element={<ProtectedRoutes Component={AllApplications} />}
        />
        <Route
          path="/onlineexam/examsetup"
          element={<ProtectedRoutes Component={OnlineExamSetup} />}
        />

<Route
          path="/onlineexam/listallexam"
          element={<ProtectedRoutes Component={ListAllExam} />}
        />
        <Route
          path="/progammanagement/programphase"
          element={<ProtectedRoutes Component={ProgramPhase} />}
        />

        <Route
          path="/physicalresultmanagement/uploadresult"
          element={<ProtectedRoutes Component={UploadResult} />}
        />
        <Route
          path="/physicalresultmanagement/meritlist"
          element={<ProtectedRoutes Component={MeritList} />}
        />
        <Route
          path="/physicalresultmanagement"
          element={<ProtectedRoutes Component={ResultManagement} />}
        />
        <Route
          path="/physicalresultmanagement/result"
          element={<ProtectedRoutes Component={Result} />}
        />
        <Route
          path="/onlineresultmanagement/generateresult"
          element={<ProtectedRoutes Component={GenerateResult} />}
        />
        <Route
          path="/onlineresultmanagement"
          element={<ProtectedRoutes Component={OnlineResultManagement} />}
        />
        <Route path="/faq" element={<ProtectedRoutes Component={FAQs} />} />

        <Route
          path="/onlineexam/question-bank"
          element={<ProtectedRoutes Component={QuestionBank} />}
        />
        <Route
          path="/onlineexam/all-questions"
          element={<ProtectedRoutes Component={ListAllQuestions} />}
        />
        <Route
          path="/onlineexam"
          element={<ProtectedRoutes Component={OnlineExamManagement} />}
        />
        <Route
          path="/onlineexam/questionapproval"
          element={<ProtectedRoutes Component={QuestionApproval} />}
        />
        <Route
          path="/students-management/all-students"
          element={<ProtectedRoutes Component={AllStudents} />}
        />
        <Route
          path="/support-center"
          element={<ProtectedRoutes Component={SupportCenterManagement} />}
        />
        <Route
          path="/support-center/active-tickets"
          element={<ProtectedRoutes Component={ActiveTickets} />}
        />
        <Route
          path="/support-center/opened-tickets"
          element={<ProtectedRoutes Component={OpenedTickets} />}
        />
        <Route
          path="/support-center/closed-tickets"
          element={<ProtectedRoutes Component={ClosedTickets} />}
        />
        <Route
          path="/usermanagement"
          element={<ProtectedRoutes Component={UserManagement} />}
        />
        <Route
          path="/usermanagement/add-user"
          element={<ProtectedRoutes Component={AddUser} />}
        />
        <Route
          path="/usermanagement/employeetiming"
          element={<ProtectedRoutes Component={EmployeeTiming} />}
        />
        <Route
          path="/usermanagement/employeeleave"
          element={<ProtectedRoutes Component={EmployeeLeave} />}
        />
        <Route
          path="/usermanagement/employeeapprovedleave"
          element={<ProtectedRoutes Component={EmployeeApprovedLeave} />}
        />
        <Route
          path="/usermanagement/employeedeclinedleave"
          element={<ProtectedRoutes Component={EmployeeDeclinedLeave} />}
        />
        <Route
          path="/usermanagement/update-user"
          element={<ProtectedRoutes Component={UpdateUser} />}
        />
        <Route
          path="/learning-material-management"
          element={<ProtectedRoutes Component={learningMaterial} />}
        />
        <Route
          path="/progammanagement"
          element={<ProtectedRoutes Component={ProgramsManagement} />}
        />
        <Route
          path="/progammanagement/all-batches"
          element={<ProtectedRoutes Component={AllBatches} />}
        />
        <Route
          path="/usermanagement/all-users"
          element={<ProtectedRoutes Component={AllUsers} />}
        />
        <Route
          path="/calendar"
          element={<ProtectedRoutes Component={NotificationPage} />}
        />
        <Route
          path="/student-profile"
          element={<ProtectedRoutes Component={StudentProfile} />}
        />
        <Route
          path="/studentregistration"
          element={<ProtectedRoutes Component={StudentRegistration} />}
        />

        <Route
          path="/myeducation/educationhistory"
          element={<ProtectedRoutes Component={EducationHistory} />}
        />

        <Route
          path="/myeducation/myskills"
          element={<ProtectedRoutes Component={MySkills} />}
        />
        <Route
          path="/myeducation/mydocuments"
          element={<ProtectedRoutes Component={MyDocuments} />}
        />
        <Route
          path="/myeducation/myrecords"
          element={<ProtectedRoutes Component={MyRecords} />}
        />
        <Route
          path="/myeducation/myexams"
          element={<ProtectedRoutes Component={MyExams} />}
        />
        <Route
          path="/myeducation/myquizes"
          element={<ProtectedRoutes Component={MyQuizes} />}
        />
        <Route
          path="/forms/form-elements"
          element={<ProtectedRoutes Component={FormElements} />}
        />
        <Route
          path="/forms/form-layout"
          element={<ProtectedRoutes Component={FormLayout} />}
        />
        <Route
          path="/tables"
          element={<ProtectedRoutes Component={Tables} />}
        />
        <Route
          path="/settings"
          element={<ProtectedRoutes Component={Settings} />}
        />
        <Route
          path="/documentupload"
          element={<ProtectedRoutes Component={UploadDocument} />}
        />
        <Route
          path="/programregistration"
          element={<ProtectedRoutes Component={ProgramRegistration} />}
        />
        <Route
          path="/payment"
          element={<ProtectedRoutes Component={Challan} />}
        />
        <Route
          path="/verification"
          element={<ProtectedRoutes Component={Verification} />}
        />

        <Route
          path="/choosesubject"
          element={<ProtectedRoutes Component={ChooseSubjects} />}
        />
        <Route
          path="/choosechapters"
          element={<ProtectedRoutes Component={ChooseChapters} />}
        />
        <Route
          path="/notifications"
          element={<ProtectedRoutes Component={Notifications} />}
        />
        <Route
          path="/startquiz"
          element={<ProtectedRoutes Component={StartQuiz} />}
        />
        <Route
          path="/quizpaper"
          element={<ProtectedRoutes Component={QuizPaper} />}
        />
        <Route
          path="/leaderboard"
          element={<ProtectedRoutes Component={LeaderBoard} />}
        />
        <Route
          path="/contact"
          element={<ProtectedRoutes Component={Contact} />}
        />
        <Route
          path="/samplepaper"
          element={<ProtectedRoutes Component={SamplePaper} />}
        />
        <Route
          path="/progammanagement/programregistration"
          element={<ProtectedRoutes Component={RegistrationTabs} />}
        />
        <Route
          path="/physicalexam/phasecenter"
          element={<ProtectedRoutes Component={PhaseCenter} />}
        />
        <Route
          path="/physicalexam/blockmanagement"
          element={<ProtectedRoutes Component={BlockManagement} />}
        />
        <Route
          path="/physicalexam/seating-arrangement"
          element={<ProtectedRoutes Component={SeatingArrangement} />}
        />
        <Route
          path="/physicalexam"
          element={<ProtectedRoutes Component={ExamManagement} />}
        />
        <Route
          path="/accountmanagement/requestedpayment"
          element={<ProtectedRoutes Component={RequestedPayment} />}
        />
        <Route
          path="/accountmanagement/rejectedpayment"
          element={<ProtectedRoutes Component={RejectedPayment} />}
        />
        <Route
          path="/accountmanagement/verifiedpayment"
          element={<ProtectedRoutes Component={VerifiedPayment} />}
        />
        <Route
          path="/accountmanagement"
          element={<ProtectedRoutes Component={AccountManagement} />}
        />
        <Route
          path="/accountmanagement/accountcredit"
          element={<ProtectedRoutes Component={AccountCredit} />}
        />
        <Route
          path="/accountmanagement/accountdebit"
          element={<ProtectedRoutes Component={AccountDebit} />}
        />
        <Route
          path="/accountmanagement/balancesheet"
          element={<ProtectedRoutes Component={BalanceSheet} />}
        />
        <Route
          path="/setting/district"
          element={<ProtectedRoutes Component={District} />}
        />
        <Route
          path="/setting/province"
          element={<ProtectedRoutes Component={Province} />}
        />

        <Route
          path="/setting"
          element={<ProtectedRoutes Component={ExtraSettings} />}
        />
        <Route
          path="/expense"
          element={<ProtectedRoutes Component={Expenses} />}
        />
        <Route
          path="/expense/office"
          element={<ProtectedRoutes Component={Office} />}
        />
        <Route
          path="/expense/addexpense"
          element={<ProtectedRoutes Component={ExpensesList} />}
        />
        <Route
          path="/expense/addcars"
          element={<ProtectedRoutes Component={AddCars} />}
        />
        <Route
          path="/expense/carslist"
          element={<ProtectedRoutes Component={CarsList} />}
        />
        <Route
          path="/gallery"
          element={<ProtectedRoutes Component={Gallery} />}
        />
        <Route
          path="/gallery/addalbum"
          element={<ProtectedRoutes Component={AddNewAlbum} />}
        />
        <Route
          path="/gallery/albums"
          element={<ProtectedRoutes Component={Albums} />}
        />
        <Route path="/blog" element={<ProtectedRoutes Component={Blogs} />} />
        <Route
          path="/blog/addblog"
          element={<ProtectedRoutes Component={AddNewBlog} />}
        />
        <Route
          path="/blog/bloglist"
          element={<ProtectedRoutes Component={BlogsList} />}
        />

        <Route
          path="/inventory"
          element={<ProtectedRoutes Component={Inventory} />}
        />
        <Route
          path="/inventory/addinventory"
          element={<ProtectedRoutes Component={InventoryList} />}
        />
        <Route
          path="/inventory/consumed"
          element={<ProtectedRoutes Component={ConsumedInventoryList} />}
        />
        {/* Reverse Protected Routes */}
        <Route
          path="/login"
          element={<ReverseProtectedRoutes Component={SignIn} />}
        />
        <Route
          path="/signup"
          element={<ReverseProtectedRoutes Component={SignUp} />}
        />
        <Route
          path="/email/verification"
          element={<ReverseProtectedRoutes Component={VerifyOTP} />}
        />
        <Route
          path="/forgetpassword"
          element={<ReverseProtectedRoutes Component={ForgetPassword} />}
        />
        <Route
          path="/forgetpassword/verifyemail"
          element={
            <ReverseProtectedRoutes Component={VerifyEmailForgetPassword} />
          }
        />
        <Route
          path="/updatepassword"
          element={<ReverseProtectedRoutes Component={ChangePassword} />}
        />
        <Route
          path="/OTP"
          element={<ReverseProtectedRoutes Component={VerifyEmail} />}
        />

        <Route path="/guide" element={<ProtectedRoutes Component={Guide} />} />

        {/* <Route path="/calendar" element={<NotificationPage />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/studentregistration" element={<StudentRegistration />} /> */}
        {/* <Route path="/notifications-page" element={<NotificationPage />} /> */}
        {/* <Route
          path="/myeducation/educationhistory"
          element={<EducationHistory />}
        /> */}
        {/* <Route path="/myeducation/myskills" element={<MySkills />} /> */}
        {/* <Route path="/myeducation/mydocuments" element={<MyDocuments />} /> */}
        {/* <Route path="/myeducation/myrecords" element={<MyRecords />} /> */}
        {/* <Route path="/myeducation/myexams" element={<MyExams />} /> */}
        {/* <Route path="/myeducation/myquizes" element={<MyQuizes />} /> */}
        {/* <Route path="/forms/form-elements" element={<FormElements />} /> */}
        {/* <Route path="/forms/form-layout" element={<FormLayout />} /> */}
        {/* <Route path="/tables" element={<Tables />} /> */}
        {/* <Route path="/settings" element={<Settings />} /> */}
        {/* <Route path="/documentupload" element={<UploadDocument />} /> */}
        {/* <Route path="/programregistration" element={<ProgramRegistration />} /> */}
        {/* <Route path="/payment" element={<Challan />} /> */}
        {/* <Route path="/verification" element={<Verification />} /> */}
        {/* <Route path="/certificateupload" element={<CertificateUpload />} /> */}
        {/* <Route path="/choosesubject" element={<ChooseSubjects />} /> */}
        {/* <Route path="/choosechapters" element={<ChooseChapters />} /> */}
        {/* <Route path="/startquiz" element={<StartQuiz />} /> */}
        {/* <Route path="/quizpaper" element={<QuizPaper />} /> */}
        {/* <Route path="/guide" element={<Guide />} /> */}
      </Routes>
    </>
  );
}

export default App;
