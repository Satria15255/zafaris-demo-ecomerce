import { useContext, createContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
import { getUserProfile } from "../api/Api"
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    // Check Session
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) return

        try {
            const decode = jwtDecode(token)
            const now = Date.now() / 1000

            if (decode.exp < now) {
                logout()
            } else {
                const storedUser = localStorage.getItem("user")
                if (storedUser) {
                    setUser(JSON.parse(storedUser))
                }
            }
        } catch (err) {
            navigate("/")
            logout()
        }
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) return

        const fetchUser = async () => {
            try {
                const { data } = await getUserProfile()
                setUser(data)
            } catch (error) {
                console.log(error)
                localStorage.removeItem("token")
            }
        }

        fetchUser()
    }, [])

    const login = (userData, token) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)