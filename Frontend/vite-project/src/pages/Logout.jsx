import React from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await API.post("/user/logout");
      if (res.data.success) {
        alert("Logged out")
        navigate("/login"); 
      }else{
        console.error(res.data.message);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={handleLogout}
        className="px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
