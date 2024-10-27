import { Link } from "react-router-dom";
import { GenderCheckBox } from "./Gender";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import logo from '../../assets/logo.svg';


/* eslint-disable react/no-unknown-property */
export const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  // Signup Hook
  const { signup, loading } = useSignup();

  // Handle Form Submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  // Handle CheckBoxGender
  const handleCheckBoxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center w-full mx-auto max-w-md transition-all duration-75">
      <div className="w-full p-4 rounded-lg shadow-md bg-white ">
      <div className="brand flex flex-raw justify-center items-center gap-3">
                <img src={logo} alt="logo-png" className="h-12" />
                <h1 className="text-3xl font-semibold text-center text-black">SNAPPY</h1>
      </div>

        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-1 mb-2">
            <label htmlFor="fullname" className="label py-1">
              <span className="text-base label-text text-black font-medium">
                Full Name
              </span>
            </label>
            <input
              type="text"
              id="fullname"
              placeholder="Enter your full name"
              className="w-full h-12 bg-slate-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary focus:bg-blue-100 rounded-md shadow-lg transition-all duration-300 ease-in-out"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-1 mb-2">
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
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1 mb-2">
            <label htmlFor="password" className="label">
              <span className="text-base label-text text-black font-medium">
                Password
              </span>
            </label>
            <input
              type="password"
              className="w-full h-12  bg-slate-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary focus:bg-blue-100 rounded-md shadow-sm transition-all duration-300 ease-in-out"
              id="password"
              placeholder="Enter password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-1 mb-2">
            <label htmlFor="confirmPassword" className="label">
              <span className="text-base label-text text-black font-medium">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              className="w-full h-12 bg-slate-100 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary focus:bg-blue-100 rounded-md shadow-sm transition-all duration-300 ease-in-out"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              autoComplete="off"
            />
          </div>

          <style jsx>{`
            input:-webkit-autofill {
              background-color: #000 !important; /* Light background for autofill */
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

          <GenderCheckBox
            onCheckBoxChange={handleCheckBoxChange}
            selectedGender={inputs.gender}
          />

          <Link
            to="/login"
            className="hover:underline hover:text-blue-600 my-1 inline-block w-full text-center"
          >
            Already have an account?
          </Link>

          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide w-full" disabled={loading}>
            {loading ? <span className="mt-2 loading loading-spinner"></span> : "Sign Up" }
          </button>
        </form>
      </div>
    </div>
  );
};
