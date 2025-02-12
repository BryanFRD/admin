import { ReactNode, MouseEventHandler } from "react";

interface ActionButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ActionButton = ({ children, onClick }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="group rounded-md px-2 py-1 transition-all hover:cursor-pointer hover:bg-gray-600/20"
    >
      {children}
    </button>
  );
};

export default ActionButton;
