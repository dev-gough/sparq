type gridDivProps = {
    children: React.ReactNode
    id?: string
    className?: string
}

export default function GridDiv({ children, id, className }: gridDivProps){
    return (
        <div id={id} className={`flex flex-col pb-2 items-center cursor-pointer transform transition duration-300 w-full md:w-80 lg:w-96 border-b-2 border-transparent hover:scale-110 hover:z-100 hover:border-b-brand-yellow ${className} `}>
            {children}
        </div>
    )
}