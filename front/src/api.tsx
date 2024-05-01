import { useMutation, useQuery, useQueryClient } from "react-query";
import { get, post } from "./fetch";


export function useCEP(cep: string, enabled: boolean) {
    const response = useQuery(['cep', cep], () => get<any>(`https://viacep.com.br/ws/${cep}/json/`).then((res) => res), {enabled: enabled, retry: 0})

    return response
}

export function useGetUsuarios() {
    const response = useQuery(['usuarios'], () => get<any[]>('https://dmsmecanica.com/api/usuarios').then((res) => res))

    return response
}

export function useAddUser() {
    const queryClient = useQueryClient()
    
    return useMutation((data: object) => post(`https://dmsmecanica.com/api/create`, data).then(res => res), {
        onSuccess: () => {
            queryClient.invalidateQueries(['usuarios'])
        },
    })
}

export function useDeleteuser() {
    const queryClient = useQueryClient()
    
    return useMutation((data: object) => post(`https://dmsmecanica.com/api/create`, data).then(res => res), {
        onSuccess: () => {
            queryClient.invalidateQueries(['usuarios'])
        },
    })
}