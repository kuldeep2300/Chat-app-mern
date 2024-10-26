import { useGetConversations } from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../services/emojis";
import { Conversation } from "./Conversation";

export const Conversations = ({ conversationRefs }) => {
  const { loading, conversations } = useGetConversations();
  console.log("Conversations:", conversations);
  return (
    <div className="py-2 pb-5 flex flex-col overflow-auto">
      {conversations.map((conversation, index) => (
        <div 
        key={conversation._id} 
        ref={(curConversation) => (conversationRefs.current[conversation._id] = curConversation)} // Assing each conversations its own reference in conversationRefs.current based on its unique conversation._id.
        >
          <Conversation
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={index === conversations.length - 1}
          />
        </div>
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
