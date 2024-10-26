import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../services/extractTime";
import { useConversation } from "../../zustand/useConversation";

export const Message = ({ message }) => {
  // Now we have to check that message is send by us or the other party that's why we use this useAuthConext() to get the value which we can pass any component directly using ContextAPI.
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const formattedTime = extractTime(message.createdAt);
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-green-200" : "bg-gray-200";

  return (
    <div className={`chat mb-2 ${chatClassName}`}>
      <div className={`chat-image avatar`}>
        <div className="w-10 rounded-full">
          <img src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-black  font-normal ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer text-xs flex gap-1 items-center text-black pt-1 pb-2">
       {formattedTime}
      </div>
    </div>
  );
};
