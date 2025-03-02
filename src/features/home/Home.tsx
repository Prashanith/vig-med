import { useNavigate } from "react-router-dom";
import ActionCard from "./components/ActionCard";

function Home() {
  const nav = useNavigate();

  function navigateToBillGeneration() {
    nav("/generate-bill", { replace: true });
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <ActionCard
        id='billGeneration'
        title='Create Bill'
        desc=''
        onClick={() => navigateToBillGeneration()}
      />
    </div>
  );
}

export default Home;
