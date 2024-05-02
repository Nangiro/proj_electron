import { ColumnDef, flexRender, getCoreRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { XSquare } from "react-feather"
import { Button } from "./Buttons/Button"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../AuthContext"
import { useDeleteuser, useGetUsuarios } from "../api"

export default function Users() {

    const { Logout } = useAuth()
    const navigate = useNavigate()
    const [textFilter, setTextFilter] = useState<any>('')
    const users = useGetUsuarios().data || []
    const deleteUser = useDeleteuser()

    const columns = useMemo<ColumnDef<any>[]>(() => [
                {
                    id: 'username',
                    accessorKey: 'username',
                    enableGlobalFilter: true,
                    header: () => "Username"
                },
                {
                    id: 'logradouro',
                    accessorKey: 'logradouro',
                    enableGlobalFilter: true,
                    header: () => "Logradouro"
                },
                {
                    id: 'bairro',
                    accessorKey: 'bairro',
                    enableGlobalFilter: true,
                    header: () => "Bairro"
                },
                {
                    id: 'estado',
                    accessorKey: 'estado',
                    enableGlobalFilter: true,
                    header: () => "Estado"
                },
                {
                    id: 'cep',
                    accessorKey: 'cep',
                    enableGlobalFilter: true,
                    header: () => "CEP"
                },
                {
                    id: 'numero',
                    accessorKey: 'numero',
                    enableGlobalFilter: true,
                    header: () => "Número"
                },
                {
                    id: 'actions',
                    enableGlobalFilter: false,
                    header: () => "Ações",
                    cell: (row: any) => {
                        return (
                            <button 
                                className="bg-transparent hover:border-0 focus:border-0 active:border-0 focus:text-[#FF004D]/60 hover:text-[#FF004D]/40 active:text-[#FF004D]/80"
                                onClick={() => {
                                    deleteUser.mutate(row.row.original.id)
                                }}
                            >
                                <XSquare/>
                            </button>
                        )
                    }
                },
            ], [])

    const table = useReactTable({
        data: users,
        columns,
        state: {
            globalFilter: textFilter
        },
        initialState:{
            pagination: {
                pageSize: 15
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setTextFilter,
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
    })

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-20 gap-4 overflow-auto">
            <div className="flex gap-4 w-full justify-between items-end">
                <Button label="Sair" className="h-9 w-40 flex justify-center items-center" onClick={Logout}/>
                <Button label="Criar Usuário" className="h-9 w-40 flex justify-center items-center" onClick={() => navigate("/AddUser")}/>
            </div>
            <table className="text-white text-center w-full p-10 bg-white/10">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} >
                        {headerGroup.headers.map((header,index) => (
                            <th key={header.id} className={`${Number(index.toFixed(2)) % 2.0 == 0 ? " bg-[#7E2553]" : " bg-[#7E2553]/70"} font-normal px-16`}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-white/40 text-sm [&>*:first-child]:border-transparent flex-grow">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className=" border-t border-white h-14">
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}