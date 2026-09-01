import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateProfile } from "@/features/auth/authService";
import { toast } from "react-toastify";
import { MdCheckCircleOutline } from "react-icons/md";
import { PiUserCircle } from "react-icons/pi";

const ProfilePages = () => {
    const { user, setUser } = useAuth();
    const [updateForm, setUpdateForm] = useState({
        name: user?.name || "Your Fullname",
        birthDay: user?.birthDay || "dd/mm/yy",
        gender: user?.gender || "Male/Female",
        email: user?.email || "example@gmail.com",
        phoneNumber: user?.phoneNumber || "0123456778",
        address: user?.address || "Your Address",
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
        <div className="flex flex-col bg-[#FAFAFA] gap-10 p-5 h-full">
            <div className="flex flex-row bg-white items-center border border-gray-100 shadow-lg rounded-xl  gap-2 py-7 px-2 lg:p-9 ">
                <div className="text-5xl lg:text-6xl">
                    <PiUserCircle />
                </div>
                <div className="w-60 flex flex-col justify-center">
                    <p className="text-xl lg:text-3xl  font-montserrat">
                        {user?.name}
                    </p>
                    <p className=" text-[10px] md:text-xs font-ysabeau bg-green-200 flex gap-1 w-25 md:w-35 justify-center items-center rounded-full">
                        <MdCheckCircleOutline size={15} />
                        Verified Account
                    </p>
                </div>
            </div>

            {/* User Details & Upate Form*/}
            <div className="w-full">
                <form
                    onSubmit={handleUpdateForm}
                    className="grid grid-cols-1 text-sm gap-7 md:gap-14 w-full"
                >
                    {/* Personal Information */}
                    <section>
                        <header>
                            <p className="text-xl  font-montserrats">
                                {" "}
                                Personal Information
                            </p>
                        </header>
                        <div className="border bg-white mt-3 border-gray-100 shadow-lg p-3 py-5 flex font-ysabeau flex-col gap-3 rounded-2xl">
                            <div className="w-full flex flex-col ">
                                <h3 className="text-left font-semibold">
                                    Full Name
                                </h3>
                                <input
                                    type="text"
                                    name="name"
                                    value={updateForm.name}
                                    onChange={handleChange}
                                    className="w-full border-b border-gray-100 text-gray-600 pb-3 text-lg  "
                                />
                            </div>
                            <div className="w-full flex flex-col ">
                                <h3 className="text-left font-semibold">
                                    Gender
                                </h3>
                                <input
                                    type="text"
                                    name="name"
                                    value={updateForm.gender}
                                    onChange={handleChange}
                                    className="w-full border-b border-gray-100 text-gray-600 pb-3 text-lg "
                                />
                            </div>
                            <div className="w-full flex flex-col ">
                                <h3 className="text-left  font-semibold">
                                    Birth Day
                                </h3>
                                <input
                                    type="text"
                                    name="name"
                                    value={updateForm.birthDay}
                                    onChange={handleChange}
                                    className="w-full   text-gray-600  pb-3  text-lg "
                                />
                            </div>
                        </div>
                    </section>

                    {/* Account Information */}
                    <section>
                        <header>
                            <p className="text-xl  font-montserrats">
                                {" "}
                                Accounts Details
                            </p>
                        </header>
                        <div className="border bg-white mt-3 border-gray-100 shadow-lg p-3 font-ysabeau flex flex-col gap-3 rounded-2xl">
                            <div className="w-full flex flex-col ">
                                <h3 className="text-left  font-semibold">
                                    Email
                                </h3>
                                <input
                                    type="email"
                                    name="email"
                                    value={updateForm.email}
                                    onChange={handleChange}
                                    className="w-full border-b border-gray-100 text-gray-600 pb-3 text-lg  "
                                />
                            </div>
                            <div className="w-full flex flex-col">
                                <h3 className="text-left  font-semibold">
                                    Phone
                                </h3>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={updateForm.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full border-b border-gray-100 text-gray-600 pb-3 text-lg  "
                                />
                            </div>
                            <div className="w-full flex flex-col">
                                <h3 className="text-left  font-semibold">
                                    Address
                                </h3>
                                <input
                                    type="text"
                                    name="address"
                                    value={updateForm.address}
                                    onChange={handleChange}
                                    className="w-full   text-gray-600 text-lg "
                                />
                            </div>
                        </div>
                    </section>
                </form>
                <div className="w-full flex justify-end    px-4 my-4 lg:my-10">
                    <button
                        onClick={handleUpdateForm}
                        className="bg-black w-1/2 lg:w-1/5 text-white font-ysabeau border border-gray-300 hover:bg-white hover:text-black transition durationn-300 px-4 py-3 rounded-xl mt-4"
                    >
                        Save Change
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePages;
