import React, { useState } from 'react';

const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <h2 className="text-6xl font-bold mb-3 text-center text-white">StatCheck</h2>
      <div className="w-full max-w-md p-6">
        {isLogin ? (
          // Login Form
          <div className="space-y-4 flex flex-col">
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full p-2 rounded bg-gray-800 text-white border-gray-700 border placeholder-gray-500 focus:border-efbf04 focus:ring-1 focus:ring-efbf04 outline-none"
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-2 rounded bg-gray-800 text-white border-gray-700 border placeholder-gray-500 focus:border-efbf04 focus:ring-1 focus:ring-efbf04 outline-none"
            />
            
            <div className="flex justify-between items-center text-gray-300">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="bg-gray-800 border-gray-700"
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <button className="text-[#efbf04] hover:text-[#dfab04]">
                Forgot password?
              </button>
            </div>

            <button className="w-full bg-[#efbf04] hover:bg-[#dfab04] text-white p-2 rounded transition-colors">
              Sign in
            </button>

            <div className="text-center text-gray-300">
              <span>Not a member? </span>
              <button 
                onClick={handleToggleForm}
                className="text-[#efbf04] hover:text-[#dfab04]"
              >
                Register
              </button>
            </div>
          </div>
        ) : (
          // Register Form
          <div className="space-y-4 flex flex-col">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full p-2 rounded bg-gray-800 text-white border-gray-700 border placeholder-gray-500 focus:border-efbf04 focus:ring-1 focus:ring-efbf04 outline-none"
            />
            <input 
              type="text" 
              placeholder="Username" 
              className="w-full p-2 rounded bg-gray-800 text-white border-gray-700 border placeholder-gray-500 focus:border-efbf04 focus:ring-1 focus:ring-efbf04 outline-none"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-2 rounded bg-gray-800 text-white border-gray-700 border placeholder-gray-500 focus:border-efbf04 focus:ring-1 focus:ring-efbf04 outline-none"
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-2 rounded bg-gray-800 text-white border-gray-700 border placeholder-gray-500 focus:border-efbf04 focus:ring-1 focus:ring-efbf04 outline-none"
            />
            <input 
              type="password" 
              placeholder="Repeat password" 
              className="w-full p-2 rounded bg-gray-800 text-white border-gray-700 border placeholder-gray-500 focus:border-efbf04 focus:ring-1 focus:ring-efbf04 outline-none"
            />

            <div className="flex items-center gap-2 text-gray-300">
              <input 
                type="checkbox" 
                id="terms" 
                className="bg-gray-800 border-gray-700"
              />
              <label htmlFor="terms">
                I have read and agree to the terms
              </label>
            </div>

            <button className="w-full bg-[#efbf04] hover:bg-[#dfab04] text-white p-2 rounded transition-colors">
              Register
            </button>

            <div className="text-center text-gray-300">
              <span>Already a member? </span>
              <button 
                onClick={handleToggleForm}
                className="text-[#efbf04] hover:text-[#dfab04]"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRegisterForm;
