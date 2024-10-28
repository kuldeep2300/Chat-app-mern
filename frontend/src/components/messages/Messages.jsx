import { useEffect, useRef } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { Message } from "./Message";
import { useListenMessages } from "../../hooks/useListenMessages";

export const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef(null);

  // console.log("messages", messages);

  // Scoll to the last message when it's loaded
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to the last message when it's loaded
    }, 100);
  }, [messages]);

  return (
    <div className="sm:w-[60vw] md:w-[70vw] lg:w-[80vw] px-4 flex-1 overflow-auto message-container mt-16 ">
      {/* Render messages or skeletons based on loading state */}
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}{" "}
      {/* loading &&: If loading is true, then proceed to the rest of the code. This part makes sure the skeletons only show up when loading is happening.[...Array(3)]: This creates a new array with 3 empty items. It’s like saying, “I want 3 placeholders.” .map((_, idx) => <MessageSkeleton key={idx} />): This part goes through each of the 3 empty items in the array and creates a <MessageSkeleton /> for each one, using key={idx} to uniquely identify each skeleton component (important for React). So, this line is creating 3 placeholder <MessageSkeleton /> components to show up when loading is true, making it clear to users that content is still loading. */}
      {!loading && messages.length === 0 && (
        <p className="text-center text-black mt-12 text-xl">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
