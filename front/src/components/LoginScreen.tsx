import { useState } from "react";
import { InputText } from "./Inputs/InputsText";
import { Button } from "./Buttons/Button";

export default function LoginScreen () {

    const [user, setUser] = useState("")
    const [pwd, setPwd] = useState("")

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="bg-white/10 rounded-xl w-[30%] h-[30%] shadow-sm flex flex-col justify-start items-center p-12 gap-4">
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
                    />
                </div>
                <Button label="Entrar"/>
            </div>
        </div>
    )
}