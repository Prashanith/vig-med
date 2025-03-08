import { Outlet } from "react-router-dom";

function AppScaffold() {
  return (
    <div className='w-full h-screen flex justify-start items-start'>
      <nav className='h-14 flex justify-center items-center bg-primary'>
        Vigneshwara Medical & General Stores
      </nav>
      <Outlet />
    </div>
  );
}

export default AppScaffold;
