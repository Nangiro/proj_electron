export function InputText({
    label,
    className,
    onChange,
    value,
    type = 'text',
    rest
} : {
    label?: string
    className?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
    value?: string
    type?: string
    rest?: any
}) {
    return (
        <div className={`w-full flex flex-col text-white gap-1 ${className}`}>
            <span>{label}</span>
            <input 
                type={type}
                className="rounded-lg border-2 border-black w-full h-9 text-black p-2 bg-white"
                onChange={onChange}
                value={value}
                {...rest}
            />
        </div>
    )
}
