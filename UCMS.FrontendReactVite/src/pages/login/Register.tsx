import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDefaultState, type User } from "../../models/User";
import { nameof } from "../../common/nameof";
import axios from "axios";

const Register : React.FC = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User>(UserDefaultState);
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

    const setUserProperty = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value,
        });
    };

    const signUp = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post<User>('api/user', user);
            console.log('Registered:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
            setDisplayErrorMessage(true);
        }
    };

    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-gray-400 text-xl mb-8">Sign in</h1>
        <div className="bg-white p-10 rounded shadow-md w-full max-w-md">
          <form className="space-y-6">
            {displayErrorMessage && (
                <div>
                    <label className="block bg-red-500 text-white text-center font-semibold mb-2 shadow-lg">
                        Registration failed!
                    </label>
                </div>
            )}

            <div>
              <label className="block text-black font-semibold mb-2">
                <span className="text-red-500 mr-1">*</span>
                Enter your name
              </label>
              <input
                name={nameof<User>('name')}
                type="text"
                className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                placeholder="Your name"
                onChange={(e) => setUserProperty(e) }
                value={user?.name}
              />
            </div>

            <div>
              <label className="block text-black font-semibold mb-2">
                <span className="text-red-500 mr-1">*</span>
                Enter your email
              </label>
              <input
                name={nameof<User>('email')}
                type="email"
                className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                placeholder="Your login"
                onChange={(e) => setUserProperty(e)}
                value={user.email}
              />
            </div>

            <div>
              <label className="block text-black font-semibold mb-2">
                <span className="text-red-500 mr-1">*</span>
                Enter your login
              </label>
              <input
                name={nameof<User>('login')}
                type="text"
                className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                placeholder="Your login"
                onChange={(e) => setUserProperty(e)}
                value={user.login}
              />
            </div>

            <div>
              <label className="block text-black font-semibold mb-2">
                <span className="text-red-500 mr-1">*</span>
                Enter your password
              </label>
              <input
                name={nameof<User>('password')}
                type="password"
                className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                placeholder="Your password"
                onChange={(e) => setUserProperty(e)}
                value={user.password}
              />
            </div>
  
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-gray-200 px-6 py-2 rounded text-black hover:bg-gray-300 transition"
                onClick={signUp}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Register;