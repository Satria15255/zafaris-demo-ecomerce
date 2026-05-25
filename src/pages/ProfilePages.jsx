import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { updateProfile } from "../api/Api"
import { toast } from "react-toastify";

const ProfilePages = () => {
    const { user, setUser } = useAuth()
    const [updateForm, setUpdateForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        address: user?.address || "",
    })

    const handleChange = (e) => {
        setUpdateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {

        if (user) {
            setUpdateForm({
                name: user.name || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                address: user.address || ""
            })
        }
    }, [user])

    const handleUpdateForm = async (e) => {
        e.preventDefault()
        try {
            const inputForm = {
                name: updateForm.name,
                email: updateForm.email,
                phoneNumber: updateForm.phoneNumber,
                address: updateForm.address,
            }

            const res = await updateProfile(inputForm)
            setUser(res.data.user)
            toast.success("Profile updated!")
        }
        catch (error) {
            toast.error("Failed Update Profile")
            console.error("Error updating profile:", error)
        }
    }
    return (
        <div className="flex flex-col gap-10 px-16 h-full">
            <div className="flex justify-start items-center gap-2 px-16">
                <div className="text-7xl">
                    <FaUserCircle />
                </div>
                <div>
                    <p className="text-4xl font-bold">{user?.name}</p>
                </div>
            </div>

            {/* User Details & Upate Form*/}
            <div >
                <form onSubmit={handleUpdateForm} className="grid grid-cols-2 gap-14 w-full px-16">
                    <div className="w-full flex flex-col ">
                        <h2 className="text-left">Username</h2>
                        <input
                            type="text"
                            name="name"
                            value={updateForm.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-xl"
                        />
                    </div>
                    <div className="w-full flex flex-col ">
                        <h2>Email</h2>
                        <input
                            type="email"
                            name="email"
                            value={updateForm.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-xl"

                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <h2>Phone</h2>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={updateForm.phoneNumber}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-xl"

                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <h2>Address</h2>
                        <input
                            type="text"
                            name="address"
                            value={updateForm.address}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-xl"

                        />
                    </div>
                </form>
                <div className="w-full flex justify-center mt-10">
                    <button onClick={handleUpdateForm} className="bg-black w-1/5 text-white border border-gray-300 hover:bg-white hover:text-black transition durationn-300 px-4 py-3 rounded-xl mt-4">Update Profile</button>
                </div>

            </div>

        </div>
    )
}

export default ProfilePages