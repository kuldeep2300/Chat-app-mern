import { useEffect } from "react";
import { useConversation } from "../../zustand/useConversation";
import { MessageInput } from "./MessageInput";
import { Messages } from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

export const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    //cleanup function that will run when the component unmounts - unmounts meaning the component is no longer visible on the screen
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="px-4 py-3 flex items-center gap-2 message-navbar">
            <span className="text-black font-semibold">To : </span>
            <span className="text-black font-bold">
              {" "}
              {selectedConversation.fullName}{" "}
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
    <div className="flex items-center justify-center w-full h-full bg-gray-100">
      <div className="px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2 no-chat-shadow">
        <p>Welcome 🙏 {authUser.fullName} 🫡</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-5xl text-center" />
      </div>
    </div>
  );
};
