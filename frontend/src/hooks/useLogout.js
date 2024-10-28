import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);

  // To set authUser to null after logout
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);

    try {
      // Development Level : const res = await fetch("http://localhost:5000/api/auth/logout", {
      const res = await fetch("/api/auth/logout", {
        method: "GET", // Ensure this matches the method used in your route
        credentials: "include" // Include credentials to send cookies
      })

      const data = await res.json(); // Await the JSON response
      console.log(data);

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem('chat-user');
      setAuthUser(null);
      toast.success("Logged out successfully");
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return {loading, logout};
};
