import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login : React.FC = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

    const signIn = (e: any) => {
        e.preventDefault();

        if (login === "Ustych" && password === "123") {
            navigate("/sites");
        }
        else {
            setDisplayErrorMessage(true);
        }
    }

    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-gray-400 text-xl mb-8">Sign in</h1>
        <div className="bg-white p-10 rounded shadow-md w-full max-w-md">
          <form className="space-y-6">
            {displayErrorMessage && (
                <div>
                    <label className="block bg-red-500 text-white text-center font-semibold mb-2 shadow-lg">
                        The login or the password is incorrect!
                    </label>
                </div>
            )}

            <div>
              <label className="block text-black font-semibold mb-2">
                <span className="text-red-500 mr-1">*</span>
                Enter your login
              </label>
              <input
                type="text"
                className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                placeholder="Your login"
                onChange={(e) => setLogin(e.target.value)}
                value={login}
              />
            </div>

            <div>
              <label className="block text-black font-semibold mb-2">
                <span className="text-red-500 mr-1">*</span>
                Enter your password
              </label>
              <input
                type="password"
                className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
  
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-gray-200 px-6 py-2 rounded text-black hover:bg-gray-300 transition"
                onClick={signIn}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Login;