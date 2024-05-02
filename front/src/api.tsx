import { useMutation, useQuery, useQueryClient } from "react-query";
import { del, get, getWithNotCORS, post } from "./fetch";


export function useCEP(cep: string, enabled: boolean) {
    const response = useQuery(['cep', cep], () => getWithNotCORS<any>(`https://viacep.com.br/ws/${cep}/json/`).then((res) => res), {enabled: enabled, retry: 0})

    return response
}

export function useGetUsuarios() {
    const response = useQuery(['usuarios'], () => get<any[]>('http://localhost:3001/users').then((res) => res))

    return response
}

export function useAddUser() {
    const queryClient = useQueryClient()
    
    return useMutation((data: object) => post(`http://localhost:3001/AddUser`, data).then(res => res), {
        onSuccess: () => {
            queryClient.invalidateQueries(['usuarios'])
        },
    })
}

export function useDeleteuser() {
    const queryClient = useQueryClient()
    
    return useMutation((id: number) => del(`http://localhost:3001/users/${id}`).then(res => res), {
        onSuccess: () => {
            queryClient.invalidateQueries(['usuarios'])
        },
    })
}