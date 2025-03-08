import { useNavigate } from "react-router-dom";
import ActionCard from "./components/ActionCard";
import { LucideNotebookPen, LucideNotebookTabs } from "lucide-react";

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
        icon={<LucideNotebookPen />}
      />
      <ActionCard
        id='billGeneration'
        title='View Past Bills'
        desc=''
        onClick={() => navigateToBillGeneration()}
        icon={<LucideNotebookTabs />}
      />
    </div>
  );
}

export default Home;
