import { useEffect } from "react";
import { useNavigate } from "react-router";

function SplashScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }, []);

  return (
    <div className='flex justify-center items-center w-full h-screen splashBg'>
      <p className='font-stretch-semi-expanded text-primary text-6xl font-bold underline-offset-8'>
        VIGNESHWARA MEDICALS
      </p>
    </div>
  );
}

export default SplashScreen;
