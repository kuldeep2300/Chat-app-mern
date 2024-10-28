import { MessageContainer } from "../../components/messages/MessageContainer";
import { Sidebar } from "../../components/sidebar/Sidebar";

export const Home = () => {
  return (
    <div className="w-full flex h-screen bg-white ">
      <Sidebar />
      <MessageContainer />
    </div>
    
  );
};
