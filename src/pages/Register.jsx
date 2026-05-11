import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../api/Api";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password });

            toast.success("Register success, please Login");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Register Failed");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800">
            <div className="w-4/5 md:w-2/5 h-auto border bg-white rounded-xl p-2 md:p-4 mx-auto mt-10">
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                    className="text-gray-500 -mt-6 text-lg hover:text-gray-700 text-xl font-bold top-0"
                >
                    ×
                </button>
                <p className="text-lg md:text-2xl text-center font-bold mb-2 md:mb-4">Register</p>
                <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4 flex flex-col justify-center">
                    <input type="text" placeholder="Name" value={name} className="w-full text-sm md:text-lg rounded-lg p-2 border" onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="Email" value={email} className="w-full text-sm md:text-lg rounded-lg p-2 border" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} className="w-full text-sm md:text-lg rounded-lg p-2 border" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="text-sm md:text-lg border border-black hover:bg-gray-900 hover:text-white transition duration-100 px-4 py-2 rounded">
                        Register
                    </button>
                </form>
                <div className="flex flex-col items-center mt-2 md:mt-4 ">
                    <p className="text-center text-xs md:text-sm">Already have an account?</p>
                    <button
                        onClick={() => {
                            navigate("/login");
                        }}
                        className="text-gray-900 text-center hover:underline mb-3 text-xs md:text-sm"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
