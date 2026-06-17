import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { changePassword } from "../api/Api"
import { toast } from "react-toastify";

const ChangePassword = () => {
    const { user, setUser } = useAuth()
    const [updateForm, setUpdateForm] = useState({
        currentPassword: "",
        newPassword: "",
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUpdateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleForm = async (e) => {
        e.preventDefault()
        try {
            if (!updateForm.currentPassword || !updateForm.newPassword) {
                return toast.error("Please fill in all fields")
            }

            const inputForm = {
                currentPassword: updateForm.currentPassword,
                newPassword: updateForm.newPassword,
            }

            const res = await changePassword(inputForm)
            navigate("/")
            toast.success("Password Changed!")
        }
        catch (error) {
            toast.error("Failed to Change Password")
            console.error("Error changing password:", error)
        }
    }
    return (
        <div className="flex flex-col gap-10 lg:px-16 h-auto lg:h-full pb-4">
            {/* Form*/}
            <div >
                <form onSubmit={handleForm} className="gap-14 flex flex-col gap-7 w-full px-4 text-sm lg:text-lg lg:px-16">
                    <div className="w-full flex flex-col">
                        <h2 className="text-left">Current Password</h2>
                        <input
                            type="text"
                            name="currentPassword"
                            value={updateForm.currentPassword}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-xl"
                        />
                    </div>
                    <div className="w-full flex flex-col ">
                        <h2>New Password</h2>
                        <input
                            type="text"
                            name="newPassword"
                            value={updateForm.newPassword}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-xl"

                        />
                    </div>

                </form>
                <div className="w-full flex justify-center mt-10">
                    <button onClick={handleForm} className="bg-black w-1/2 text-sm lg:w-1/5 text-white border border-gray-300 hover:bg-white hover:text-black transition durationn-300 px-4 py-3 rounded-xl mt-4">Change Password</button>
                </div>

            </div>

        </div>
    )
}

export default ChangePassword