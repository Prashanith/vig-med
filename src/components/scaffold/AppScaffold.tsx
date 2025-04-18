import { Outlet } from "react-router";
import Button from "../button/button";
import { FaSignOutAlt } from "react-icons/fa";
import { logOut } from "../../features/authentication/services/authService";

function AppScaffold() {
  return (
    <div className='w-full h-screen flex flex-col justify-start items-start'>
      <nav className='pagePadding h-[70px] w-full flex justify-between items-center bg-primary text-secondary-text'>
        <h2 className='text-lg font-medium'>
          <img src='/logo.svg' className='h-12' />
        </h2>
        <Button onClick={() => logOut()} endIcon={<FaSignOutAlt />}>
          SIGN OUT
        </Button>
      </nav>
      <div className='pagePadding h-full overflow-y-scroll w-full p-6 splashBg'>
        <Outlet />
      </div>
    </div>
  );
}

export default AppScaffold;
