import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDefaultState, type User } from "../../models/siteContentCreation/User";
import { nameof } from "../../common/nameof";
import axios from "axios";

const Login : React.FC = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User>(UserDefaultState);
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

    const setUserProperty = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value,
        });
    };

    const signIn = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
          const response = await axios.post(`api/user/login`, {
            login : user.login,
            password: user.password,
          });
          console.log('Logined user:', response.data);
          console.log('User:', (response.data as User));
          console.log('UserId:', (response.data as User).userId);
          navigate(`/sites?userId=${(response.data as User).userId}`);
        } catch (error) {
            console.error("Can't find user", error);
            setDisplayErrorMessage(true);
        }
    };

    const signUp = (_ : React.MouseEvent<HTMLButtonElement>) => {
      navigate('/register');
    };

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
  
            <div className="flex justify-around pt-4">
              <button
                type="submit"
                className="bg-gray-200 px-6 py-2 rounded text-black hover:bg-gray-300 transition"
                onClick={signIn}
              >
                Sign in
              </button>
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

export default Login;