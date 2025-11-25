import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Login() {

  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {

      if (state === 'Sign Up') {
        const {data} = await axios.post(backendUrl + '/api/user/register', {name,password,email})
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const {data} = await axios.post(backendUrl + '/api/user/login', {password,email})
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
      
    } catch (error) {
      toast.error(error.message)
    }

  };

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <div
      onSubmit={onSubmitHandler}
      className="flex h-[700px] w-80% mt-10 mb-10 overflow-hidden rounded-lg"
      style={{
        backgroundImage: `url(${assets.regImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full hidden md:inline-block relative">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <img className="h-12" src={assets.logo} alt="logo" />
          <p className="text-l font-bold text-primary mt-1">Stazia</p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center backdrop-blur-md bg-white/30 rounded-r-lg">
        <form className="md:w-96 w-80 flex flex-col items-center justify-center">
          <h2 className="text-4xl text-gray-900 font-medium">
            {state === "Sign Up" ? "Create Account" : "Log In"}
          </h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Welcome back! Please {state === "Sign Up" ? "Sign Up" : "Log In"} to
            continue
          </p>

          <button
            type="button"
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              or {state === "Sign Up" ? "Sign Up" : "Log In"} with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          {state === "Sign Up" && (
            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 8.5C10.7091 8.5 12.5 6.70914 12.5 4.5C12.5 2.29086 10.7091 0.5 8.5 0.5C6.29086 0.5 4.5 2.29086 4.5 4.5C4.5 6.70914 6.29086 8.5 8.5 8.5Z"
                  fill="#6B7280"
                />
                <path
                  d="M8.5 10.2C5.18629 10.2 2.5 12.5195 2.5 15.35C2.5 15.6866 2.76339 15.95 3.1 15.95H13.9C14.2366 15.95 14.5 15.6866 14.5 15.35C14.5 12.5195 11.8137 10.2 8.5 10.2Z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>
          )}

          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="email"
              placeholder="Email id"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
            <div className="flex items-center gap-2">
              <input className="h-5" type="checkbox" id="checkbox" />
              <label className="text-sm" htmlFor="checkbox">
                Remember me
              </label>
            </div>
            <a className="text-sm underline" href="#">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity"
          >
            {state === "Sign Up" ? "Create Account" : "Log In"}
          </button>
          {state === "Sign Up" ? (
            <p className="text-gray-500/90 text-sm mt-4">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-indigo-500 hover:underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-gray-500/90 text-sm mt-4">
              Create an new account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-indigo-500 hover:underline cursor-pointer"
              >
                click here
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
