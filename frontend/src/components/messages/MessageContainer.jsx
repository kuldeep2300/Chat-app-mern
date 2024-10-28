import { useEffect } from "react";
import { useConversation } from "../../zustand/useConversation";
import { MessageInput } from "./MessageInput";
import { Messages } from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { IoArrowBackSharp } from "react-icons/io5";

export const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    //cleanup function that will run when the component unmounts - unmounts meaning the component is no longer visible on the screen
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const handleBack = () => {
    setSelectedConversation(null); // Set selected conversation to null so that NoChatComponent will render
  };  

  return (
    <div className={` flex h-screen flex-col duration-1000 transition-all`} >
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="px-4 py-3 flex items-center gap-2 message-navbar w-full fixed z-10">
            {/* Back button to navigate to the previous page */}
            <button
              onClick={handleBack}
              className="text-blue-500 hover:text-blue-800 font-semibold "
            >
              <IoArrowBackSharp size={25} />
            </button>
            <span className="text-black font-semibold">To : </span>
            <span className="text-black font-bold">
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="sm:w-[40vw] md:w-[60vw] lg:w-[80vw] flex-1 md:flex flex-col items-center justify-center hidden bg-gray-100  duration-1000 transition-all">
      <div className="text-center sm:text-sm  md:text-xl text-black font-semibold md:flex hidden flex-col items-center gap-1 no-chat-shadow  ">
        <p>Welcome 🙏 {authUser.fullName} 🫡</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-5xl text-center" />
      </div>
    </div>
  );
};
