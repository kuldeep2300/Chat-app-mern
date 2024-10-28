import { useState } from "react";
import { useConversation } from "../zustand/useConversation";
import toast from "react-hot-toast";

import SendMessage from "/sounds/SendMessage.mp3";

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const audio = new Audio(SendMessage);

  const sendMesssage = async (message) => {
    setLoading(true);
    try {
      audio.play(); // Play sound after sending the message successfully
      const res = await fetch(
        //Development level : `http://localhost:5000/api/messages/send/${selectedConversation._id}`,
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMesssage, loading };
};
