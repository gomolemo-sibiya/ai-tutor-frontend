import React, { useState } from "react";
import { User } from "../../pages/Index";
import {
  User as UserIcon,
  Mail,
  Lock,
  Shield,
  BookOpen,
  Users,
} from "lucide-react";

interface LoginPageProps {
  onLogin: (user: User) => void;
}

// Dummy credentials for testing
const DUMMY_CREDENTIALS = {
  student: { email: "student@example.com", password: "password" },
  educator: { email: "educator@example.com", password: "password" },
  admin: { email: "admin@example.com", password: "password" },
};

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "student" as "student" | "educator" | "admin",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock authentication with dummy credentials
    const roleCredentials = DUMMY_CREDENTIALS[formData.role];

    if (
      formData.email === roleCredentials.email &&
      formData.password === roleCredentials.password
    ) {
      const user: User = {
        id: Date.now().toString(),
        name: isRegister
          ? formData.fullName
          : `Demo ${
              formData.role.charAt(0).toUpperCase() + formData.role.slice(1)
            }`,
        email: formData.email,
        role: formData.role,
      };
      onLogin(user);
    } else {
      alert("Invalid credentials. Use the dummy credentials provided.");
    }
  };

  const handleRoleClick = (role: "student" | "educator" | "admin") => {
    const credentials = DUMMY_CREDENTIALS[role];
    const user: User = {
      id: Date.now().toString(),
      name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      email: credentials.email,
      role: role,
    };
    onLogin(user);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-[#0046cf] p-8 flex flex-col">
        {/* AI Tutor and Logo at the top */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-bold">AI TUTOR</h1>
          {/* Add your logo component or img tag here if you have one */}
        </div>

        {/* Big and medium text in the middle */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Big text */}
          <p className="text-[#e6f2ff] text-xl font-medium mb-2 leading-snug">
            {" "}
            {/* Increased size, changed color, reduced margin */}
            AI Tutor platform by Tshwane University of Technology and merSETA
            Chair in Tech-Enabled TVET
          </p>

          {/* Medium text */}
          <p className="text-[#b2c7f1] text-base leading-relaxed">
            {" "}
            {/* Increased size, changed color */}
            Discover the future of education with our AI-driven platform.
            Personalize your learning, enhance your skills, and achieve your
            goals quickly with the tools you need to succeed.
          </p>
        </div>

        {/* Demo Credentials */}
        {/* <div className="bg-blue-900 rounded-lg p-4 mt-6">
          <h3 className="text-white font-semibold mb-2 text-sm">
            Demo Credentials
          </h3>
          <div className="text-xs text-blue-200 space-y-1">
            <p>
              <strong>Student:</strong> student@example.com / password
            </p>
            <p>
              <strong>Educator:</strong> educator@example.com / password
            </p>
            <p>
              <strong>Admin:</strong> admin@example.com / password
            </p>
          </div>
        </div> */}

        {/* Icons and text at the bottom - now aligned left */}
        <div className="mt-auto pt-6">
          <div className="grid grid-cols-2 gap-4">
            {/* First icon-text pair */}
            <div className="flex flex-col">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-[#30B0C7] mr-2" />
              </div>
              <span className="text-xs text-[#b2c7f1] font-300 mt-3">
                Transform Your Learning Experience with AI
              </span>
            </div>
            {/* Second icon-text pair */}
            <div className="flex flex-col">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-[#30B0C7] mr-2" />
              </div>
              <span className="text-xs text-[#b2c7f1] font-300 mt-3">
                Unlock your potential with our AI-powered platform
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Center Area */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#f7f8f9]">
        <div className="w-full max-w-md">
          <div className="bg-[#f7f8f9] rounded-lg p-8">
            <h2 className="text-gray-800 text-2xl font-bold mb-6 text-center">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 text-gray-800 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  {isRegister ? "Email" : "Email or Student Number"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 text-gray-800 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 text-gray-800 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {isRegister && (
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 text-gray-800 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="student">Student</option>
                    <option value="educator">Educator</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200"
              >
                {isRegister ? "Create Account" : "Login"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {isRegister
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Clickable Role Blocks */}
      <div className="w-80 bg-[#edeff1] p-8 backdrop-blur-sm">
        <div className="space-y-4">
          <button
            onClick={() => handleRoleClick("student")}
            className="w-full bg-[#f8fafb] hover:bg-blue-100 focus:bg-blue-100 text-black border-2 border-transparent hover:border-blue-500 focus:border-blue-500 rounded-lg p-4 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-gray-800 group-hover:text-[#007aff] group-focus:text-[#007aff]" />
              <h3 className="font-semibold group-hover:text-[#007aff] group-focus:text-[#007aff]">
                Student
              </h3>
            </div>
            <p className="text-gray-700 text-sm text-left mt-2">
              Access learning modules, AI-powered quizzes, and personalized
              study tools
            </p>
          </button>

          <button
            onClick={() => handleRoleClick("educator")}
            className="w-full bg-[#f8fafb] hover:bg-blue-100 focus:bg-blue-100 text-black border-2 border-transparent hover:border-blue-500 focus:border-blue-500 rounded-lg p-4 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-800 group-hover:text-[#007aff] group-focus:text-[#007aff]" />
              <h3 className="font-semibold group-hover:text-[#007aff] group-focus:text-[#007aff]">
                Educator
              </h3>
            </div>
            <p className="text-gray-700 text-sm text-left mt-2">
              Upload and manage educational content, track student progress
            </p>
          </button>

          <button
            onClick={() => handleRoleClick("admin")}
            className="w-full bg-[#f8fafb] hover:bg-blue-100 focus:bg-blue-100 text-black border-2 border-transparent hover:border-blue-500 focus:border-blue-500 rounded-lg p-4 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-800 group-hover:text-[#007aff] group-focus:text-[#007aff]" />
              <h3 className="font-semibold group-hover:text-[#007aff] group-focus:text-[#007aff]">
                Administrator
              </h3>
            </div>
            <p className="text-gray-700 text-sm text-left mt-2">
              Manage system data, users, and platform configuration
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
