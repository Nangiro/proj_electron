export function InputText({
    label,
    className,
    onChange,
    value
} : {
    label?: string
    className?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
    value?: string
}) {
    return (
        <div className={`w-full flex flex-col text-white gap-1 ${className}`}>
            <span>{label}</span>
            <input 
                type="text"
                className="rounded-lg border-2 border-black w-full h-9 text-black p-2"
                onChange={onChange}
                value={value}
            />
        </div>
    )
}