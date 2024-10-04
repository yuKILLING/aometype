import Logo from "../../shared/ui/Logo/Logo";
import LangHandler from "../../shared/ui/LangHandler/LangHandler";
import { useMainStore } from "../../app/stores/mainStore";
import WordsHandler from "../../shared/ui/TimerHandler/TimerHandler";
export const Header: React.FC = () => {
  const { isTypeActive } = useMainStore();
  return (
    <>
      <header
        className={
          !isTypeActive
            ? "flex justify-around items-center m-5 transition"
            : "flex justify-around items-center m-5 opacity-0 transition"
        }
      >
        <Logo />
        <div className="gap-2 flex">
          <LangHandler />
          <WordsHandler />
        </div>
      </header>
    </>
  );
};

export default Header;
