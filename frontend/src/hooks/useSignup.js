import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (inputs) => {
    // console.log(inputs);
    const { fullName, email, password, confirmPassword, gender } = inputs;

    const success = handleInputErrors(inputs);
    if (!success) return;

    setLoading(true);

    try {
      // Development level : const res = await fetch("http://localhost:5000/api/auth/signup", {
      const res = await fetch("/api/auth/signup", {
        method: "POST", // POST request - Here we are first set same proxy in the vite.config.js file so the cors (cross-origin resource sharing) error will not occur, then this method send the post request to the server and we are parsing the data from javascript object to JSON object string and after that server return res.json() data in server side res.json() data is json string so we have to convert into javascript object that's why in frontend we use res.json() to parse the data from JSON string to javascript object.
        headers: { "Content-Type": "application/json" }, // this telling the server that we are sending JSON data
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
          gender,
        }), // this telling us that the server should expect JSON data
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Localstorage
      // localStorage.setItem("chat-user", JSON.stringify(data));
      // Context
      // setAuthUser(data);
      toast.success("Signup Successfully"); // Display success toast message
      navigate('/login');
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

const handleInputErrors = (inputs) => {
  const { fullName, email, password, confirmPassword, gender } = inputs;
  if (!fullName || !email || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all the fields!");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password and Confirm Password do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
};
