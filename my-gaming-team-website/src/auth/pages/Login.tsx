import React from "react";
import LoginForm from "../components/LoginForm";
import "./login.css"; // Optional if you have additional styles

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg animate-fadeIn">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
