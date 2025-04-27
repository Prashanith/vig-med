import { useNavigate } from "react-router";
import ActionCard from "./components/ActionCard";
import { FaHistory } from "react-icons/fa";
import { FaMoneyBillTrendUp, FaNoteSticky } from "react-icons/fa6";

function Dashboard() {
  const nav = useNavigate();

  function navigateToBillGeneration(route: string) {
    nav(route);
  }

  return (
    <div className='w-full h-full flex justify-center items-center gap-8'>
      <ActionCard
        id='billGeneration'
        title='Create Bill'
        desc='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam dolorum impedit obcaecati recusandae'
        onClick={() => navigateToBillGeneration("/generate-bill")}
        icon={<FaNoteSticky />}
      />
      <ActionCard
        id='sales'
        title='View Sales'
        desc='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam dolorum impedit obcaecati recusandae'
        onClick={() => navigateToBillGeneration("/sales")}
        icon={<FaMoneyBillTrendUp />}
      />
      <ActionCard
        id='billGeneration'
        title='View Past Bills'
        desc='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam dolorum impedit obcaecati recusandae'
        onClick={() => navigateToBillGeneration("/generate-bill")}
        icon={<FaHistory />}
      />
      <ActionCard
        id='addSale'
        title='Add Sale'
        desc='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam dolorum impedit obcaecati recusandae'
        onClick={() => navigateToBillGeneration("/add-sale")}
        icon={<FaHistory />}
      />
    </div>
  );
}

export default Dashboard;
