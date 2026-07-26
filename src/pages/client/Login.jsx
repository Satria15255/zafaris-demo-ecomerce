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
            <div className="inset-0  flex h-screen">
                <div className="w-2/5 md:w-2/5 h-screen flex flex-col justify-around items-center bg-white rounded-xl p-1 md:p-4 px-7">
                    <div className="flex flex-col gap-2 items-center justify-around h-4/5 pb-4 pt-6">
                        <div className="flex flex-col gap-2">
                            <p className="text-lg md:text-2xl xl:text-4xl text-center font-bold mb-2 md:mb-4">
                                Welcome Back!👋
                            </p>
                            <p className="text-sm text-gray-700 lorem21 max-w-sm text-center">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Corrupti tempore itaque
                                facere.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-2 flex px-3 flex-col justify-center w-130"
                        >
                            <label className="font-semibold">Email</label>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                value={email}
                                className="w-full text-sm md:text-lg rounded-lg p-2 border border-gray-300 rounded-2xl"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="pt-4 font-semibold">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                className="w-full text-sm md:text-lg rounded-lg p-2 border border-gray-300 rounded-2xl"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <p className="font-semibold py-4">
                                Forget Password?
                            </p>
                            <button
                                type="submit"
                                className="text-sm md:text-lg border border-black bg-gray-900 text-white hover:text-black hover:bg-white transition duration-100 font-bold px-4 py-2 rounded-2xl"
                            >
                                Login
                            </button>
                        </form>
                        <div className="flex items-center justify-center mt-2 md:mt-4">
                            <p className="text-center text-xs md:text-sm text-gray-500">
                                Don't have an account?
                            </p>
                            <p
                                onClick={() => {
                                    navigate("/register");
                                }}
                                className="text-gray-900 text-center text-xs md:text-sm mb-3 hover:underline font-bold"
                            >
                                Create Account
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
