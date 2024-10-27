import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        // Development Level :  const res = await fetch("http://localhost:5000/api/users", {
        const res = await fetch("https://chat-app-eobh.onrender.com/api/users", {
          method: "GET",
          credentials: "include", // Include credentials (cookie) in the request
        });
        
        const data = await res.json();
        console.log(data);
        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, []);

  return { loading, conversations };
};
