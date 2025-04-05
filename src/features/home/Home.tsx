import { useNavigate } from "react-router";
import ActionCard from "./components/ActionCard";

function Home() {
  const nav = useNavigate();

  function navigateToBillGeneration() {
    nav("/generate-bill", { replace: true });
  }

  return (
    <div className='w-full h-full flex justify-center items-center gap-8'>
      <ActionCard
        id='billGeneration'
        title='Create Bill'
        desc=''
        onClick={() => navigateToBillGeneration()}
      />
      <ActionCard
        id='billGeneration'
        title='View Past Bills'
        desc=''
        onClick={() => navigateToBillGeneration()}
      />
    </div>
  );
}

export default Home;
