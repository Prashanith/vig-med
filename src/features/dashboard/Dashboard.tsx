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
        desc='Generate Bills For the Customers and Download'
        onClick={() => navigateToBillGeneration("/generate-bill")}
        icon={<FaNoteSticky />}
      />
      <ActionCard
        id='sales'
        title='View Sales'
        desc='View Sales Data to Get Insights'
        onClick={() => navigateToBillGeneration("/sales")}
        icon={<FaMoneyBillTrendUp />}
      />
      <ActionCard
        id='billGeneration'
        title='View Past Bills'
        desc='Track Saved Bills'
        onClick={() => navigateToBillGeneration("/generate-bill")}
        icon={<FaHistory />}
      />
      <ActionCard
        id='addSale'
        title='Add Sale'
        desc='Add Sales Date For Tracking and Insights'
        onClick={() => navigateToBillGeneration("/add-sale")}
        icon={<FaHistory />}
      />
    </div>
  );
}

export default Dashboard;
