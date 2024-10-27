import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useConversation } from "../zustand/useConversation";
import ReceiveMessage from "/sounds/ReceiveMessage.mp3";

export const useListenMessages = () => {
  const { socket } = useSocketContext(); // returning the online users value
  const { messages, setMessages } = useConversation();
  const { onlineUsers } = useSocketContext();

  const audio = new Audio(ReceiveMessage); // Create a new Audio object for the sound

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if(onlineUsers.includes(newMessage.senderId)){
        audio.play(); // Play sound when a new message is received
      }
      setMessages([...messages, newMessage]);
    });

    // clean up function
    return () => socket?.off("newMessage") // this code help us to avoid memory leaks, we are using this code because we don't want to listen to the event again and again, we want to listen to the event only once, here off is use to remove the event listener, it will remove the event listener when the component unmounts.
  }, [socket, onlineUsers, setMessages, messages]);
};
