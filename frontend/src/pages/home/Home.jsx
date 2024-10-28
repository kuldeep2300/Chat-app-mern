import { MessageContainer } from "../../components/messages/MessageContainer";
import { Sidebar } from "../../components/sidebar/Sidebar";

export const Home = () => {
  return (
    <div className="w-[100vw] flex h-[100vh] bg-white ">
      <Sidebar />
      <MessageContainer />
    </div>
    
  );
};
