import { useEffect } from "react";
import { useNavigate } from "react-router";

function SplashScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 1500);
  }, []);

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <p className='font-stretch-semi-expanded text-primary text-6xl font-bold underline underline-offset-8'>
        VIGNESHWARA MEDICALS
      </p>
    </div>
  );
}

export default SplashScreen;
