import { useNavigate } from "react-router-dom";
import ActionCard from "./components/ActionCard";

function Home() {
  const nav = useNavigate();

  function navigateToBillGeneration() {
    nav("generate-bill");
  }

  return (
    <div>
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
