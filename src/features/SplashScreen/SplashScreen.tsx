import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  useEffect(() => {
    setTimeout(() => {
      nav("/home");
    }, 1500);
  }, []);

  const nav = useNavigate();
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='logo'>Vigneshwara Medicals</div>
    </div>
  );
}

export default SplashScreen;
