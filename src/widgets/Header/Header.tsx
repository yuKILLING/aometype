import Logo from "../../shared/ui/Logo/Logo";
import { Crown } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="flex justify-around items-center m-5">
      <Logo />
      <Crown className="cursor-pointer" />
    </header>
  );
};

export default Header;
