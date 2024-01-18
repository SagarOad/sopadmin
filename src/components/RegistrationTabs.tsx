'use client';

import React, { useState, useEffect } from 'react';
import ProgRegister from './ProgRegister';
// import Challan from "./Challan";
import ChallanVerify from './ChallanVerify';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from './Breadcrumb';
import Challan from './Challan';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../constants/roles';
import { checkUserRole } from '../utils/role';

const RegistrationTabs = () => {
  const {
    state: { user },
  } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    const allowedRoles: number[] = [ROLES.ADMIN];

    if (!checkUserRole(user?.role_id || 0, allowedRoles)) {
      navigate('/');
    }
  }, [history]);

  // const initialTab = <ProgRegister />;
  // const secondTab = <Challan />;
  // const thirdTab = <ChallanVerify />;
  // const [initialContent, setInitialContent] = useState(initialTab);
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Program Management / Program Registration" />
      <div>
        <div className="flex w-[100%] justify-between px-0 py-6 md:w-[50%] md:px-8">
          {/* <button
            className={`${activeTab === 0 ? 'bg-[#292A33]' : 'bg-white'} 
                rounded-full py-3 px-4 text-[18px] text-[#ffffff] focus:bg-[#292A33] focus:text-white`}
            type="button"
            onClick={() => {
              setActiveTab(0);
            }}
          >
            Program Registration
          </button> */}

          {/* <button
            className={`${activeTab === 1 ? 'bg-[#292A33]' : ''} 
                rounded-full py-3 px-4 text-[18px] text-[#838383] focus:bg-[#292A33] focus:text-white`}
            type="button"
            onClick={() => {
              setActiveTab(1);
            }}
          >
            Challan
          </button> */}

          {/* <button
            className={`${activeTab === 2 ? 'bg-[#292A33]' : ''} 
                rounded-full py-3 px-4 text-[18px] text-[#838383] focus:bg-[#292A33] focus:text-white`}
            type="button"
            onClick={() => {
              setActiveTab(2);
            }}
          >
            Verification
          </button> */}
        </div>
        <div>
          {activeTab == 0 ? (
            <ProgRegister setActiveTab={setActiveTab} />
          ) : // : activeTab == 1 ? (
          //   <Challan setActiveTab={setActiveTab} />
          // ) : activeTab == 2 ? (
          //   <ChallanVerify />
          // )
          null}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RegistrationTabs;
