import { useNavigate } from "react-router";
import ActionCard from "./components/ActionCard";
import { FaHistory, FaMoneyBill, FaNotesMedical } from "react-icons/fa";
import { FaMoneyBillTrendUp, FaNoteSticky } from "react-icons/fa6";

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
        desc='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam dolorum impedit obcaecati recusandae'
        onClick={() => navigateToBillGeneration()}
        icon={<FaNoteSticky />}
      />
      <ActionCard
        id='sales'
        title='View Sales'
        desc='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam dolorum impedit obcaecati recusandae'
        onClick={() => navigateToBillGeneration()}
        icon={<FaMoneyBillTrendUp />}
      />
      <ActionCard
        id='billGeneration'
        title='View Past Bills'
        desc='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam dolorum impedit obcaecati recusandae'
        onClick={() => navigateToBillGeneration()}
        icon={<FaHistory />}
      />
    </div>
  );
}

export default Home;
