const MenuItem = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-2 mb-1 cursor-pointer
       hover:text-blue-600 duration-100 p-1 rounded "
    >
      <div className="text-lg">{icon}</div>
      <div>{label}</div>
    </div>
  );
};

export default MenuItem;
