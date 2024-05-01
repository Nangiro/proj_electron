export function Button ({
    onClick,
    label,
    className
} : {
    onClick?: () => void
    label?: string
    className?: string
}) 
: React.ReactElement<HTMLInputElement> {
    return (
        <button
            onClick={onClick}
            className={`rounded-lg text-white bg-[#7E2553] active:bg-[#7E2553]/90 ${className}`}
        >
            {label}
        </button>
    )
}