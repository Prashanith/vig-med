import { ReactNode } from "react";

interface IActionCard {
  id: string;
  title: string;
  desc: string;
  icon?: ReactNode;
  onClick: () => void;
}

function ActionCard({ id, title, desc, icon, onClick }: IActionCard) {
  return (
    <div
      className='w-60 h-36 p-5 text-primary flex flex-col justify-start items-start rounded-lg shadow-lg space-y-3'
      id={id}
      onClick={() => onClick()}
    >
      <div className='w-full flex flex-row justify-between items-center'>
        <h3 className="text-xl">{title}</h3>
        {icon && icon}
      </div>
      <p className='text-sm line-clamp-3 overflow-clip'>{desc}</p>
    </div>
  );
}

export default ActionCard;
