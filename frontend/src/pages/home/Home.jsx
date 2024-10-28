import { MessageContainer } from "../../components/messages/MessageContainer";
import { Sidebar } from "../../components/sidebar/Sidebar";

export const Home = () => {
  return (
    // <div className="w-full flex max-h-screen bg-white ">
    //   <Sidebar />
    //   <MessageContainer />
    // </div>
    <div className="w-full flex full-container bg-white ">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
