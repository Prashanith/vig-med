interface IActionCard {
  id: string;
  title: string;
  desc: string;
  onClick: () => void;
}

function ActionCard({ id, title, desc, onClick }: IActionCard) {
  return (
    <div className="w-60 h-40 bg-blue-200 flex justify-center items-center rounded-lg shadow-lg text-xl" id={id} onClick={() => onClick}>
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
}

export default ActionCard;
