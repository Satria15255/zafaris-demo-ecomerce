import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateProfile } from "@/api/Api";
import { toast } from "react-toastify";
import { MdCheckCircleOutline } from "react-icons/md";

const ProfilePages = () => {
    const { user, setUser } = useAuth();
    const [updateForm, setUpdateForm] = useState({
        name: user?.name || "",
        birthDay: user?.birthDay || "",
        gender: user?.gender,
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        address: user?.address || "",
    });

    const handleChange = (e) => {
        setUpdateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        if (user) {
            setUpdateForm({
                name: user.name || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                address: user.address || "",
            });
        }
    }, [user]);

    const handleUpdateForm = async (e) => {
        e.preventDefault();
        try {
            const inputForm = {
                name: updateForm.name,
                email: updateForm.email,
                phoneNumber: updateForm.phoneNumber,
                address: updateForm.address,
            };

            const res = await updateProfile(inputForm);
            setUser(res.data.user);
            toast.success("Profile updated!");
        } catch (error) {
            toast.error("Failed Update Profile");
            console.error("Error updating profile:", error);
        }
    };
    return (
        <div className="flex flex-col  gap-10 lg:px-16 h-full">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 lg:px-16">
                <div className="text-5xl lg:text-7xl">
                    <FaUserCircle />
                </div>
                <div className="w-60 flex flex-col items-center justify-center">
                    <p className="text-3xl lg:text-4xl font-bold">
                        {user?.name}
                    </p>
                    <p className="text-xs lg:text-sm bg-green-200 flex gap-1  px-2 w-40 justify-center items-center rounded-full">
                        <MdCheckCircleOutline size={20} />
                        Verified Account
                    </p>
                </div>
            </div>

            {/* User Details & Upate Form*/}
            <div className="w-full">
                <form
                    onSubmit={handleUpdateForm}
                    className="grid grid-cols-1 md:grid-cols-2 text-sm gap-7 md:gap-14 w-full px-2 lg:px-16"
                >
                    {/* Personal Information */}
                    <div className="border border-gray-200 p-3 py-5 flex flex-col gap-3 rounded-2xl">
                        <div className="w-full flex flex-col ">
                            <h3 className="text-left">Username</h3>
                            <input
                                type="text"
                                name="name"
                                value={updateForm.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded-xl text-sm"
                            />
                        </div>
                        <div className="w-full flex flex-col ">
                            <h3 className="text-left">Gender</h3>
                            <input
                                type="text"
                                name="name"
                                value={updateForm.gender}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2  text-sm  rounded-xl"
                            />
                        </div>
                        <div className="w-full flex flex-col ">
                            <h3 className="text-left">Birth Day</h3>
                            <input
                                type="text"
                                name="name"
                                value={updateForm.birthDay}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2  text-sm rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="border border-gray-200 p-3 py-5 flex flex-col gap-3 rounded-2xl">
                        <div className="w-full flex flex-col ">
                            <h3>Email</h3>
                            <input
                                type="email"
                                name="email"
                                value={updateForm.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2  text-sm rounded-xl"
                            />
                        </div>
                        <div className="w-full flex flex-col">
                            <h3>Phone</h3>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={updateForm.phoneNumber}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2  text-sm rounded-xl"
                            />
                        </div>
                        <div className="w-full flex flex-col">
                            <h3>Address</h3>
                            <input
                                type="text"
                                name="address"
                                value={updateForm.address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2  text-sm rounded-xl"
                            />
                        </div>
                    </div>
                </form>
                <div className="w-full flex justify-end lg:justify-center px-4 my-4 lg:my-10">
                    <button
                        onClick={handleUpdateForm}
                        className="bg-black w-1/2 lg:w-1/5 text-white border border-gray-300 hover:bg-white hover:text-black transition durationn-300 px-4 py-3 rounded-xl mt-4"
                    >
                        Save Change
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePages;
