import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "@/api/Api";
import { useAuth } from "@/context/AuthContext";
import background from "@/assets/heroSection/hero2.jpg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);
            toast.success("Login success");
            navigate("/");
        } catch (err) {
            toast.error("Login Failed");
            console.log(err.response?.data?.message || "Login Failed");
        }
    };
    return (
        <div
            className="fixed inset-0 z-50 bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="inset-0 bg-black/50 flex items-center justify-center h-screen">
                <div className="w-4/5 md:w-2/5 h-auto border bg-white rounded-xl p-1 md:p-4 mx-auto mt-10">
                    <button
                        onClick={() => {
                            navigate("/");
                        }}
                        className="text-gray-500 -mt-6 text-lg hover:text-gray-700 text-xl font-bold top-0"
                    >
                        ×
                    </button>
                    <p className="text-lg md:text-2xl text-center font-bold mb-2 md:mb-4">
                        Login
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-2 md:space-y-4 flex px-3 flex-col justify-center"
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            className="w-full text-sm md:text-lg rounded-lg p-2 border"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            className="w-full text-sm md:text-lg rounded-lg p-2 border"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="text-sm md:text-lg border border-black hover:text-white hover:bg-gray-900 transition duration-100 font-bold px-4 py-2 rounded"
                        >
                            Login
                        </button>
                    </form>
                    <div className="flex flex-col items-center mt-2 md:mt-4">
                        <p className="text-center text-xs md:text-sm">
                            Don't have an account?
                        </p>
                        <button
                            onClick={() => {
                                navigate("/register");
                            }}
                            className="text-gray-900 text-center text-xs md:text-sm mb-3 hover:underline"
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
