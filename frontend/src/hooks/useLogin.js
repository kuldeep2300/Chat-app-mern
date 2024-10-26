import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (email, password) => {
    const success = handleInputError(email, password);
    if (!success) return;

    setLoading(true);

    try {
      console.log('inside login sending request to the server..');
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: 'include', // Ensures cookies are sent
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log('Login sever data: ', data);
      if (data.error) {
        throw new Error(data.error);
      }

      // Localstorage store the user
      localStorage.setItem("chat-user", JSON.stringify(data));
      // Context for authentication
      setAuthUser(data);
      toast.success("Login Successfully");
    } catch (error) {
      toast.error(error.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

const handleInputError = (email, password) => {
  if (!email || !password) {
    toast.error("Please fill in the all fields!");
    return false; // We have to return this else the post request will not work and it will not send the request to the server and our server will not get the data from the frontend, and server have many errors that will occur if we don't return this false..
  }
  return true;
};
