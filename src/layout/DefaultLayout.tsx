import { ReactNode, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import NavControls from './navControls';
import Header from '../components/Header';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setShowHeaderFooter(currentPath !== '/offerletter');
  }, []);

  return (
    <div className="bg-smoke  text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        {showHeaderFooter && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden dark:bg-[#292A33]">
          {/* <!-- ===== Header Start ===== --> */}
          {showHeaderFooter && (
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          )}
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl ">
              {/* p-4 md:p-6 2xl:p-10 */}
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
        {showHeaderFooter && <NavControls />}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
