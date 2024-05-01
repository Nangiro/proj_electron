import { useState } from "react";
import { InputText } from "./Inputs/InputsText";
import { Button } from "./Buttons/Button";
import { useAuth } from "../AuthContext";
import { Navigate } from "react-router-dom";

export default function LoginScreen () {

    const { Login, auth} = useAuth()

    const [user, setUser] = useState("")
    const [pwd, setPwd] = useState("")

    const onSubmit = () => {
        Login({username: user, password: pwd})
    }

    if(auth) return <Navigate to={'/users'}/>

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="bg-white/10 rounded-xl w-[30%] shadow-sm flex flex-col justify-start items-center p-12 gap-4">
                <div className="flex flex-col gap-6 w-full">
                    <InputText 
                        label="Usuário"
                        onChange={(ev) => {
                            setUser(ev.target.value)
                        }}
                        value={user}
                    />
                    <InputText 
                        label="Senha"
                        onChange={(ev) => {
                            setPwd(ev.target.value)
                        }}
                        value={pwd}
                        type="password"
                    />
                </div>
                <Button label="Entrar" onClick={onSubmit}/>
            </div>
        </div>
    )
}