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
      className='w-60 h-40 bg-secondary text-primary flex justify-center items-center rounded-lg shadow-lg text-xl gap-x-2'
      id={id}
      onClick={() => onClick()}
    >
      {icon && icon}
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
}

export default ActionCard;
