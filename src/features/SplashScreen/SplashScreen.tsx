import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  useEffect(() => {
    setTimeout(() => {
      nav("/home");
    }, 1500);
  }, []);

  const nav = useNavigate();
  return <div className='w-full h-screens'></div>;
}

export default SplashScreen;
