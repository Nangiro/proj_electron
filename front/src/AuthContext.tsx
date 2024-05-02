import React, { useContext, useState } from "react"
import { post } from "./fetch"

interface Auth {
    auth: string | null,
    username: string,
    Login : (data: any) => void
    Logout: () => void
}

const AuthContext = React.createContext<Auth>({} as Auth)

export function AuthProvider({children} : {children: React.ReactNode}) {
    const [auth, setAuth] = useState(window.localStorage.getItem('jwt'))
    const [username, setUsername] = useState('')

    async function Login(data: any) {
        const response = await post<{auth: boolean, username: string, token: string}, any>('http://localhost:3001/login', data).then(res => res).catch(() => {
            console.error('Usuário ou Senha incorretos.')
        })
        setAuth(response.token)
        setUsername(response.username)
        window.localStorage.setItem('jwt', response.token)
    }

    async function Logout() {
        setAuth(null)
        setUsername('')
        window.localStorage.removeItem('jwt')
    }


    return (
        <AuthContext.Provider value={{auth : auth, username: username, Login: Login, Logout: Logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext);
  };

export default AuthContext