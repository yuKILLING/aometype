import Header from "../widgets/Header/Header";
import TypeArea from "../widgets/TypeArea/ui/TypeArea";

const TypePage: React.FC = () => (
  <div className="flex flex-col h-screen">
    <Header />
    <section className="flex flex-1 items-center justify-center">
      <TypeArea />
    </section>
  </div>
);

export default TypePage;
