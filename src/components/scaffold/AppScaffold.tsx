import { Outlet } from "react-router-dom";

function AppScaffold() {
  return (
    <div className='w-full h-screen flex flex-col justify-start items-start'>
      <nav className='h-[60px] w-full flex justify-center items-center bg-primary text-secondary-text'>
        <h2 className='text-lg font-medium'>Vigneshwara Medicals</h2>
      </nav>
      <div className="h-full overflow-y-scroll w-full p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AppScaffold;
