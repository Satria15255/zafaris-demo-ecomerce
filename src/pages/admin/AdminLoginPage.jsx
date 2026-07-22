import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "@/api/Api";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning("");

    try {
      const res = await login({ email, password });

      const { token, user } = res.data;

      if (user.role === "admin") {
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email || email,
            role: user.role,
            token,
          }),
        );
        toast.success("Login successful");
        navigate("/admin");
      } else {
        setWarning("Acces denied: You are not an admin");
      }
    } catch (err) {
      setWarning("Login failed, please check your credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-2xl border border-gray-300 w-2/5 h-3/5 space-y-4"
      >
        <h2 className="text-lg font-bold   text-center">Welcome Back!</h2>
        <p className="text-sm text-gray-700 pb-7 text-center ">
          Please log in with an admin account.
        </p>
        <input
          type="email"
          placeholder="emailadmin@gmail.com"
          className="w-full border border-gray-400 px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-400 px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {warning && (
          <p className="text-red-500 text-sm text-center">{warning}</p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
