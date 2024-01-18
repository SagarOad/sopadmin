import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../images/logo/image 2.jpg';
import SidebarLinkGroup from './SidebarLinkGroup';
import userImg from '../assets/avatar.png';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../constants/roles';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const navigate = useNavigate();

  const {
    state: { user },
  } = useAuth();
  // const auth = localStorage.getItem('user') || null;
  // const user = auth ? JSON.parse(auth) : null;
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white  p-2 duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0 lg:hidden ' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex h-[83px] items-center justify-between bg-white dark:bg-boxdark">
        <span className="pd:mr-24 flex w-100 border-b pb-1">
          <div className="mr-3 bg-white p-1">
            <img src={Logo} className=" h-8" alt="Logo" />
          </div>
          <span className="self-center whitespace-nowrap text-xl font-semibold text-black dark:text-white sm:text-2xl">
            SOP
          </span>
        </span>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="">
          {/* <!-- Menu Group --> */}
          <div>
            <div className="flex items-center justify-start border-b bg-white py-4 px-2">
              <div>
                <img
                  className="mr-2 w-12"
                  src={
                    user?.image != ''
                      ? `https://studentofpakistan.com/sopadminbackend/public/userimage/${user?.image}`
                      : userImg
                  }
                  alt="user image"
                />
              </div>
              <div>
                <div className="flex">
                  <h1 className="text-[24px] text-black-2">{user?.name}</h1>
                  <p className=" ml-2 mt-2 inline rounded-sm bg-[orange] px-2 text-sm font-black text-white">
                    {user?.role_name}
                  </p>
                </div>
                <p className="text-[16px] text-black-2">{user?.email}</p>
              </div>
            </div>

            <ul className="space-y-2 bg-white font-medium dark:bg-boxdark">
              {/* <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black dark:text-white duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b  ${
                    pathname.includes('mainpage') && 'bg-[#00a751] text-white '
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  Dashboard
                </NavLink>
                <NavLink
                  to="/profile"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black dark:text-white duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b  ${
                    pathname.includes('profile') && 'bg-[#00a751] text-white '
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  My Profile
                </NavLink>
              </li> */}

              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('mainpage') && 'bg-[#00a751] text-white '
                  }`}
                >
                  <i className="fa-solid fa-house"></i>
                  {/*  <i className="fa-solid fa-arrow-right-long"></i> */}
                  Dashboard
                </NavLink>
              </li>
              {user?.role_id === ROLES.ADMIN && (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/progammanagement' ||
                    pathname.includes('progammanagement')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="/progammanagement"
                          className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                            (pathname === '/progammanagement' ||
                              pathname.includes('progammanagement')) &&
                            'bg-[#00a751] text-white '
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true),
                              navigate('/progammanagement');
                          }}
                        >
                          <i className="fa-solid fa-table-cells"></i>
                          Program Management
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && 'rotate-180'
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </NavLink>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-2 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/progammanagement/programregistration"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Program Registration
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/progammanagement/all-batches"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Batches
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/progammanagement/programphase"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Program Phase
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
              {user?.role_id === ROLES.ADMIN || user?.role_id === ROLES.HR ? (
                <li>
                  <NavLink
                    to="/students-management"
                    className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                      pathname.includes('students-management') &&
                      'bg-[#00a751] text-white '
                    }`}
                  >
                    <i className="fa-solid fa-graduation-cap"></i>
                    Students Management
                  </NavLink>
                </li>
              ) : null}
              {user?.role_id === ROLES.ADMIN ||
              user?.role_id === ROLES.ACCOUNTS ? (
                <li>
                  <NavLink
                    to="/application-management"
                    className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                      pathname.includes('application-management') &&
                      'bg-[#00a751] text-white '
                    }`}
                  >
                    <i className="fa-solid fa-arrow-right-long"></i>
                    Application Management
                  </NavLink>
                </li>
              ) : null}
              {user?.role_id === ROLES.ADMIN || user?.role_id === ROLES.HR ? (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/attendancemanagement' ||
                    pathname.includes('attendancemanagement')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="/attendancemanagement"
                          className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                            (pathname === '/attendancemanagement' ||
                              pathname.includes('attendancemanagement')) &&
                            'bg-[#00a751] text-white '
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true),
                              navigate('/attendancemanagement');
                          }}
                        >
                          <i className="fa-solid fa-bookmark"></i>
                          Attendance Management
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && 'rotate-180'
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </NavLink>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-2 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/attendancemanagement/addattendance"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Students Attendance
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/attendancemanagement/employeesattendance"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Employees Attendance
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ) : null}
              {user?.role_id === ROLES.ADMIN ||
              user?.role_id === ROLES.ACCOUNTS ? (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/accountmanagement' ||
                    pathname.includes('accountmanagement')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="/accountmanagement"
                          className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                            (pathname === '/accountmanagement' ||
                              pathname.includes('accountmanagement')) &&
                            'bg-[#00a751] text-white '
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true),
                              navigate('/accountmanagement');
                          }}
                        >
                          <i className="fa-solid fa-folder"></i>
                          Account Management
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && 'rotate-180'
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </NavLink>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-2 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/accountmanagement/requestedpayment"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Requested payment
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/accountmanagement/verifiedpayment"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Verified Payment
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/accountmanagement/rejectedpayment"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Rejected Payment
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/accountmanagement/accountcredit"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#00a751] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Account Credits
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/accountmanagement/accountdebit"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#00a751] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Account Debits
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/accountmanagement/balancesheet"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#00a751] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Balance Sheet
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ) : null}
              {user?.role_id === ROLES.ADMIN ||
              user?.role_id === ROLES.CONTROLLER ? (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/physicalexam' ||
                    pathname.includes('physicalexam')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="/physicalexam"
                          className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                            (pathname === '/physicalexam' ||
                              pathname.includes('physicalexam')) &&
                            'bg-[#00a751] text-white '
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true),
                              navigate('/physicalexam');
                          }}
                        >
                          <i className="fa-solid fa-chair"></i>
                          Physical Exam Setup
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && 'rotate-180'
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </NavLink>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-2 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/physicalexam/phasecenter"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Phase Center
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/physicalexam/blockmanagement"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Block Management
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/physicalexam/seating-arrangement"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Seating Arrangement
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ) : null}
              {user?.role_id === ROLES.ADMIN ||
              user?.role_id === ROLES.CONTROLLER ? (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/onlineexam' ||
                    pathname.includes('onlineexam')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="/onlineexam"
                          className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                            (pathname === '/onlineexam' ||
                              pathname.includes('onlineexam')) &&
                            'bg-[#00a751] text-white '
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true),
                              navigate('/onlineexam');
                          }}
                        >
                          <i className="fa-solid fa-globe"></i>
                          Online Exam Setup
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && 'rotate-180'
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </NavLink>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-2 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/onlineexam/examsetup"
                                className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white dark:border-b dark:text-white  ${
                                  pathname.includes('examsetup') &&
                                  'bg-[#ffa500] text-white '
                                }`}
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Exams Setup
                              </NavLink>
                            </li>






                            <li>
                              <NavLink
                                to="/onlineexam/listallexam"
                                className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white dark:border-b dark:text-white  ${
                                  pathname.includes('listallexam') &&
                                  'bg-[#ffa500] text-white '
                                }`}
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                List All Exam Setup
                              </NavLink>
                            </li>







                            {/* <li>
                              <NavLink
                                to="/onlineexam/question-bank"
                                className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white dark:border-b dark:text-white  ${
                                  pathname.includes('question-bank') &&
                                  'bg-[#ffa500] text-white '
                                }`}
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Question Bank
                              </NavLink>
                            </li> */}
                            <li>
                              <NavLink
                                to="/onlineexam/all-questions"
                                className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white dark:border-b dark:text-white  ${
                                  pathname.includes('all-questions') &&
                                  'bg-[#ffa500] text-white '
                                }`}
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                List All Question
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/onlineexam/questionapproval"
                                className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white dark:border-b dark:text-white  ${
                                  pathname.includes('questionapproval') &&
                                  'bg-[#ffa500] text-white '
                                }`}
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Question Approval
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ) : null}
              {user?.role_id === ROLES.ADMIN ||
              user?.role_id === ROLES.CONTROLLER ? (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/physicalresultmanagement' ||
                    pathname.includes('physicalresultmanagement')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="/physicalresultmanagement"
                          className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                            (pathname === '/physicalresultmanagement' ||
                              pathname.includes('physicalresultmanagement')) &&
                            'bg-[#00a751] text-white '
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true),
                              navigate('/physicalresultmanagement');
                          }}
                        >
                          <i className="fa-regular fa-file-lines"></i>
                          Physical Result Management
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && 'rotate-180'
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </NavLink>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-2 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/physicalresultmanagement/uploadresult"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Upload Result
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/physicalresultmanagement/meritlist"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Merit List
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/physicalresultmanagement/result"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Result
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ) : null}
              {user?.role_id === ROLES.ADMIN ||
              user?.role_id === ROLES.CONTROLLER ? (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/onlineresultmanagement' ||
                    pathname.includes('onlineresultmanagement')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="/onlineresultmanagement"
                          className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                            (pathname === '/onlineresultmanagement' ||
                              pathname.includes('onlineresultmanagement')) &&
                            'bg-[#00a751] text-white '
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true),
                              navigate('/onlineresultmanagement');
                          }}
                        >
                          <i className="fa-solid fa-file-export"></i>
                          Online Result <br /> Management
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && 'rotate-180'
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </NavLink>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-2 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/onlineresultmanagement/generateresult"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Generate Result
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ) : null}
              {user?.role_id === ROLES.ADMIN ||
              user?.role_id === ROLES.CONTROLLER ? (
                <li>
                  <NavLink
                    to="/learning-material-management"
                    className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                      pathname.includes('learning-material-management') &&
                      'bg-[#00a751] text-white '
                    }`}
                  >
                    <i className="fa-solid fa-lines-leaning"></i>
                    Learning Material Management
                  </NavLink>
                </li>
              ) : null}
              {/* <li>
                <NavLink
                  to="/user-management"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('user-management') &&
                    'bg-[#00a751] text-white '
                  }`}
                >
                  <i className="fa-solid fa-user-group"></i>
                  User Management
                </NavLink>
              </li> */}
              {user?.role_id === ROLES.ADMIN || user?.role_id === ROLES.HR ? (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/usermanagement' ||
                    pathname.includes('usermanagement')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="/usermanagement"
                          className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                            (pathname === '/usermanagement' ||
                              pathname.includes('usermanagement')) &&
                            'bg-[#00a751] text-white '
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true),
                              navigate('/usermanagement');
                          }}
                        >
                          <i className="fa-solid fa-user-group"></i>
                          User Management
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && 'rotate-180'
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </NavLink>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-2 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/usermanagement/all-users"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                All Users
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/usermanagement/add-user"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Add User
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/usermanagement/employeetiming"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Employee Timing
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/usermanagement/employeeleave"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Employee Leaves
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/usermanagement/employeeapprovedleave"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Approved Leaves
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/usermanagement/employeedeclinedleave"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Declined Leaves
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ) : null}
              {/* <li>
                <NavLink
                  to="/progammanagement"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('progammanagement') &&
                    'bg-[#00a751] text-white '
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  Program Management
                </NavLink>
              </li> */}
              {/* <li>
                <NavLink
                  to="/progammanagement/all-batches"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('all-batches') &&
                    'bg-[#00a751] text-white '
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  All Batches
                </NavLink>
              </li> */}
              {/* 
              <li>
                <NavLink
                  to="/phase-management"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('phase-management') &&
                    'bg-[#00a751] text-white '
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  Phase Management
                </NavLink>
              </li> */}
              {user?.role_id === ROLES.ADMIN && (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/support-center' ||
                    pathname.includes('support-center')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="/support-center"
                          className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                            (pathname === '/support-center' ||
                              pathname.includes('support-center')) &&
                            'bg-[#00a751] text-white '
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true),
                              navigate('/support-center');
                          }}
                        >
                          <i className="fa-solid fa-headset"></i>
                          Support Center Management
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && 'rotate-180'
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </NavLink>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-2 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/support-center/active-tickets"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Active
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/support-center/opened-tickets"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Opened
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/support-center/closed-tickets"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Closed
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
              {user?.role_id === ROLES.ADMIN && (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/setting' || pathname.includes('setting')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="/setting"
                          className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                            (pathname === '/setting' ||
                              pathname.includes('setting')) &&
                            'bg-[#00a751] text-white '
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true),
                              navigate('/setting');
                          }}
                        >
                          <i className="fa-solid fa-gear"></i>
                          Setting
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && 'rotate-180'
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </NavLink>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-2 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/setting/district"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                District
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/setting/province"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Province
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
              {user?.role_id === ROLES.ADMIN || user?.role_id === ROLES.HR ? (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/inventory' || pathname.includes('inventory')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="/inventory"
                          className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                            (pathname === '/inventory' ||
                              pathname.includes('inventory')) &&
                            'bg-[#00a751] text-white '
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true),
                              navigate('/inventory');
                          }}
                        >
                          <i className="fa-solid fa-maximize"></i>
                          Inventory
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && 'rotate-180'
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </NavLink>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-2 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/inventory/addinventory"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Add Inventory
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/inventory/consumed"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#ffa500] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Consumed Inventory List
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ) : null}
              {user?.role_id === ROLES.ADMIN ||
              user?.role_id === ROLES.ACCOUNTS ? (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/expense' || pathname.includes('expense')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="/expense"
                          className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                            (pathname === '/expense' ||
                              pathname.includes('expense')) &&
                            'bg-[#00a751] text-white '
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true),
                              navigate('/expense');
                          }}
                        >
                          <i className="fa-solid fa-arrow-right-long"></i>
                          Expenses
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && 'rotate-180'
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </NavLink>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-2 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/expense/office"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#00a751] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Office
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/expense/addexpense"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#00a751] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Add Expense
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/expense/addcars"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#00a751] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Add Cars
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/expense/carslist"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#00a751] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Cars List
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ) : null}
              {user?.role_id === ROLES.ADMIN && (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/blog' || pathname.includes('blog')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="/blog"
                          className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                            (pathname === '/blog' ||
                              pathname.includes('blog')) &&
                            'bg-[#00a751] text-white '
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true),
                              navigate('/blog');
                          }}
                        >
                          <i className="fa-solid fa-arrow-right-long"></i>
                          Blogs
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && 'rotate-180'
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </NavLink>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-2 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/blog/addblog"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#00a751] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Add New Blog
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/blog/bloglist"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#00a751] hover:text-white ' +
                                  (isActive && 'bg-[#ffa500] !text-white ')
                                }
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                                Blogs List
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/blog' || pathname.includes('blog')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/gallery"
                        className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                          (pathname === '/gallery' ||
                            pathname.includes('gallery')) &&
                          'bg-[#00a751] text-white '
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true),
                            navigate('/gallery');
                        }}
                      >
                        <i className="fa-solid fa-arrow-right-long"></i>
                        Gallery
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-2 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/gallery/addalbum"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#00a751] hover:text-white ' +
                                (isActive && 'bg-[#ffa500] !text-white ')
                              }
                            >
                              <i className="fa-solid fa-arrow-right-long"></i>
                              Add New Album
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/gallery/albums"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 px-4 py-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-[#00a751] hover:text-white ' +
                                (isActive && 'bg-[#ffa500] !text-white ')
                              }
                            >
                              <i className="fa-solid fa-arrow-right-long"></i>
                              Albums
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <li>
                <NavLink
                  to="/notifications"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('notifications') &&
                    'bg-[#00a751] text-white'
                  }`}
                >
                  <i className="fa-solid fa-bell"></i>
                  Notifications
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/faq"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('faq') && 'bg-[#00a751] text-white'
                  }`}
                >
                  <i className="fa-solid fa-question"></i>
                  FAQs
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/support-center/active-tickets"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('active-tickets') &&
                    'bg-[#00a751] text-white '
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  Active
                </NavLink>
              </li> */}
              {/* <li>
                <NavLink
                  to="/support-center/opened-tickets"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('opened-tickets') &&
                    'bg-[#00a751] text-white '
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  Opened
                </NavLink>
              </li> */}
              {/* 
              <li>
                <NavLink
                  to="/support-center/closed-tickets"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('closed-tickets') &&
                    'bg-[#00a751] text-white '
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  Closed
                </NavLink>
              </li> */}

              {/* <li>
                <NavLink
                  to="/profile"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('profile') && 'bg-[#00a751] text-white '
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  My Profile
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/myeducation/educationhistory"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('educationhistory') &&
                    'bg-[#4A4A4A] text-white'
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  My Education
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/myeducation/myskills"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('myskills') && 'bg-[#4A4A4A] text-white'
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  My Skills and Certificates
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/myeducation/mydocuments"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('mydocuments') &&
                    'bg-[#4A4A4A] text-white'
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  My Documents
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/myeducation/myrecords"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('myrecords') && 'bg-[#4A4A4A] text-white'
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  My Records
                </NavLink>
              </li> */}
              {/* <li>
                <NavLink
                  to="/myeducation/myexams"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black dark:text-white duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b  ${
                    pathname.includes('myexams') && 'bg-[#4A4A4A] text-white'
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  My Exams
                </NavLink>
              </li> */}
              {/* <li>
                <NavLink
                  to="/myeducation/myquizes"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('myquizes') && 'bg-[#4A4A4A] text-white'
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  My Quizes
                </NavLink>
              </li> */}
              {/* <!-- Menu Item My Education --> */}

              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Forms --> */}

              {/* <!-- Menu Item Forms --> */}

              {/* <!-- Menu Item Tables --> */}

              {/* <!-- Menu Item Tables --> */}

              {/* <!-- Menu Item Settings --> */}
              {/* <li>
                <NavLink
                  to="/samplepaper"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('/samplepaper') &&
                    'bg-[#4A4A4A] text-white'
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  Sample paper
                </NavLink>
              </li> */}

              {/* <li>
                <NavLink
                  to="/leaderboard"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('/leaderboard') &&
                    'bg-[#4A4A4A] text-white'
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  Leaderboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('/contact') && 'bg-[#4A4A4A] text-white'
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  Contact
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/faq"
                  className={`group relative flex items-center gap-2.5  py-3 px-6 font-medium text-black duration-300 ease-in-out hover:bg-[#00a751] hover:text-white dark:border-b dark:text-white  ${
                    pathname.includes('/faq') && 'bg-[#4A4A4A] text-white'
                  }`}
                >
                   <i className="fa-solid fa-arrow-right-long"></i>
                  FAQs Managements
                </NavLink>
              </li> */}
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
