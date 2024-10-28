import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import logo from '../../assets/logo.svg';

/* eslint-disable react/no-unknown-property */
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="h-[100vh] p-4 flex flex-col items-center justify-center w-[100vw] mx-auto max-w-md transition-all duration-75">
      <div className="w-full p-6 rounded-lg shadow-md bg-white ">
      <div className="brand flex flex-raw justify-center items-center gap-3">
                <img src={logo} alt="logo-png" className="h-12" />
                <h1 className="text-3xl font-semibold text-center text-black">SNAPPY</h1>
      </div>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="email" className="label py-1">
              <span className="text-base label-text text-black font-medium">
                Email
              </span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full h-12 bg-slate-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary focus:bg-blue-100 rounded-md shadow-lg transition-all duration-300 ease-in-out"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label htmlFor="password" className="label py-1">
              <span className="text-base label-text text-black font-medium">
                Password
              </span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full h-12 bg-slate-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary focus:bg-blue-100 rounded-md shadow-sm transition-all duration-300 ease-in-out"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
            />
          </div>

          <style jsx>{`
            input:-webkit-autofill {
              background-color: #fff !important; /* Light background for autofill */
              -webkit-text-fill-color: #000 !important; /* Black text color */
              transition: background-color 5000s ease-in-out 0s;
            }

            input:hover {
              box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            }

            input:valid,
            input:focus {
              background-color: #dbeafe;
            }
          `}</style>

          
            <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide w-full" disabled={loading}>
              {loading ? <span className="mt-2 loading loading-spinner"></span> : "Login" }
            </button>

        </form>
        <Link
          to="/signup"
          className="hover:underline hover:text-blue-600 mt-3 inline-block w-full text-center"
        >
          {"Don't"} have an account?
        </Link>
      </div>
    </div>
  );
};
