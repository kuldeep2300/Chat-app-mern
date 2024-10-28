import { useEffect, useState } from "react";
import { useConversation } from "../zustand/useConversation";
import toast from "react-hot-toast";

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          // Development Level :  `http://localhost:5000/api/messages/${selectedConversation._id}`,
          `https://chat-app-mern-dh70.onrender.com/api/messages/${selectedConversation._id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        console.log(data);
        if (data.error) throw new Error(data.error);

        setMessages(data);
      } catch (error) {
        toast.error(error.messages);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]); // Here we have to also pass setMessages in the dependency array because when selected user id changed then the new messages will appear and this new messages will also changes the setMessages and setMessages is also changed in useEffect hook, that's why we have to pass setMessages also.

  return { loading, messages };
};
