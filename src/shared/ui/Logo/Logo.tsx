import { Keyboard } from "lucide-react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-1 cursor-pointer">
      <Keyboard size={34} className="pt-1" />
      <span className="text-3xl">aometype.</span>
    </div>
  );
};

export default Logo;
