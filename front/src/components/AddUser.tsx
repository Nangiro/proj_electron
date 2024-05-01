import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCEP } from "../api";
import { useNavigate } from "react-router-dom";

export default function AddUser () {

    const navigate = useNavigate()

    const [cep, setCep] = useState("")

    const getCep = useCEP(cep, cep != "")

    const { register, handleSubmit, formState: { isValid }, resetField, setValue } = useForm({
        defaultValues: {
            username: '',
            password: '',
            cep: '',
            logradouro: '',
            numero: '',
            bairro: '',
            estado: '',
        }
    });
    
    const [cepAux, setCepAux] = useState("")

    const onSubmit = (data: any) => {
        console.log(data)
    }
    
    useEffect(() => {
        if(getCep.data){
            if(getCep.data.erro) {
                resetField("logradouro", {keepDirty: false, defaultValue: ""})
                resetField("numero", {keepDirty: false, defaultValue: ""})
                resetField("bairro", {keepDirty: false, defaultValue: ""})
                resetField("estado", {keepDirty: false, defaultValue: ""})
            } else {
                setValue("logradouro", getCep.data.logradouro)
                setValue("bairro", getCep.data.bairro)
                setValue("estado", getCep.data.uf)
                setValue("cep", cep)
                resetField("numero", {keepDirty: false, defaultValue: ""})
            }
        }
    }, [getCep.data])

    useEffect(() => {
        if(getCep.isError){
            resetField("logradouro", {keepDirty: false, defaultValue: ""})
            resetField("numero", {keepDirty: false, defaultValue: ""})
            resetField("bairro", {keepDirty: false, defaultValue: ""})
            resetField("estado", {keepDirty: false, defaultValue: ""})
        }
    }, [getCep.isError])


    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="bg-white/10 rounded-xl w-[90%] shadow-sm flex flex-col justify-start items-center p-12">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-[60%]">
                    <div className="w-full flex gap-4">
                        <div className={`w-full flex flex-col text-white gap-1`}>
                            <span>Usuário</span>
                            <input 
                                className="rounded-lg border-2 border-black w-full h-9 text-black p-2"
                                {...register("username", {required: true})}
                            />
                        </div>
                        <div className={`w-full flex flex-col text-white gap-1`}>
                            <span>Senha</span>
                            <input 
                                className="rounded-lg border-2 border-black w-full h-9 text-black p-2"
                                {...register("password", {required: true})}
                            />
                        </div>
                    </div>
                    <div className="w-full flex gap-4 items-end justify-end">
                        <div className={`w-full flex flex-col text-white gap-1`}>
                            <span>Cep</span>
                            <input 
                                className="rounded-lg border-2 border-black w-full h-9 text-black p-2"
                                value={cepAux}
                                onChange={(ev) => setCepAux(ev.target.value)}
                            />
                        </div>
                        <button 
                            className={`rounded-lg text-white bg-[#7E2553] active:bg-[#7E2553]/90 disabled:bg-gray-400 h-9 justify-center items-center flex`} type="button"
                            onClick={() => {
                                setCep(cepAux)
                            }}
                            disabled={getCep.isLoading}
                        >
                            <span>Buscar</span>
                        </button>
                    </div>
                    <div>
                        <div className={`w-full flex flex-col text-white gap-1`}>
                            <span>Logradouro</span>
                            <input 
                                className="rounded-lg border-2 border-black w-full h-9 text-black p-2"
                                {...register("logradouro", {required: true})}
                                disabled
                            />
                        </div>
                        <div className={`w-full flex flex-col text-white gap-1`}>
                            <span>Bairro</span>
                            <input 
                                className="rounded-lg border-2 border-black w-full h-9 text-black p-2"
                                {...register("bairro", {required: true})}
                                disabled
                            />
                        </div>
                        <div className={`w-full flex flex-col text-white gap-1`}>
                            <span>Estado</span>
                            <input 
                                className="rounded-lg border-2 border-black w-full h-9 text-black p-2"
                                {...register("estado", {required: true})}
                                disabled
                            />
                        </div>
                        <div className={`w-full flex flex-col text-white gap-1`}>
                            <span>Número</span>
                            <input 
                                className="rounded-lg border-2 border-black w-full h-9 text-black p-2"
                                {...register("numero", {required: true})}
                                type="number"
                            />
                        </div>
                    </div>
                    
                    <div className="w-full flex justify-around p-4 gap-4">
                        <button className={`rounded-lg text-white bg-[#7E2553] active:bg-[#7E2553]/90 disabled:bg-gray-400 w-full`} type="button" onClick={() => navigate("/users")}>
                            Voltar
                        </button>
                        <button className={`rounded-lg text-white bg-[#7E2553] active:bg-[#7E2553]/90 disabled:bg-gray-400 w-full`} type="submit" disabled={!isValid}>
                            Criar
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}