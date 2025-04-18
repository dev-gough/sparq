import Image from 'next/image';
import Link from 'next/link';

type gridDivProps = {
    children: React.ReactNode
    id?: string
    className?: string
}

const GridDiv:React.FC<gridDivProps> = ({ children, id, className }: gridDivProps) => {
    return (
        <div id={id} className={`flex flex-col pb-2 items-center cursor-pointer transform transition duration-300 w-full sm:w-1/2 lg:w-96 border-b-2 border-transparent hover:scale-110 hover:z-100 hover:border-b-brand-yellow ${className} `}>
            {children}
        </div>
    )
}

export default function ProductPage() {
    return (
        <div className="sm:px-20 px-4 sm:my-10 container mx-auto">
            <section id="inverters">
                <h1 className='text-5xl font-bold text-brand-maroon text-center mt-12 mb-32'>Our Family of Inverters</h1>
                <div className='flex flex-wrap justify-center gap-16'>
                    <Link href="products/quad2">
                        <GridDiv id="q2000">
                            <Image className='w-full h-full object-cover' width={1920} height={1084} src='/q2000.webp' alt='q2000 Microinverters'/>
                            <h2 className='text-2xl font-bold text-brand-maroon mt-8'>Quad 2 Microinverters</h2>
                        </GridDiv>
                    </Link>
                    <Link href="products/quad3">
                        <GridDiv>
                            <Image className='w-full h-full object-cover' width={1920} height={1084} src='/quad3.webp' alt='Quad 3 Microinverter'/>
                            <h2 className='text-2xl font-bold text-brand-maroon mt-8'>Quad 3</h2>
                        </GridDiv>
                    </Link>
                    <Link href="products/legacy">
                        <GridDiv>
                            <Image className='w-full h-full' width={1920} height={1084} src='/q2000.webp' alt='q2000 Microinverter'/>
                            <h2 className='text-2xl font-bold text-brand-maroon mt-8'>Legacy Products</h2>
                        </GridDiv>
                    </Link>
                </div>
            </section>
            <section id="monitoring">
                <h1 className='text-5xl font-bold text-brand-maroon text-center mt-32 mb-32'>Power Management & Monitoring</h1>
                <div className="flex flex-wrap justify-center gap-16">
                    <Link href="products/sparqlinq">
                        <GridDiv id='#sparqlinq'>
                            <Image className='w-full h-full rounded-xl shadow-lg' width={768} height={512} src="/SparqLinq.jpg" alt="SparqLinq Monitoring Interface"/>
                            <h2 className='text-2xl font-bold text-brand-maroon mt-8'>SparqLink</h2>
                        </GridDiv>
                    </Link>
                    <Link href="products/sparqvu">
                        <GridDiv id='#sparqvu'>
                            <Image className="w-full h-[256px] rounded-xl shadow-lg" src="/SparqVu.jpg" width={768} height={512} alt='SparqVu Performance Management System'/>
                            <h2 className='text-2xl font-bold text-brand-maroon mt-8'>SparqVu</h2>
                        </GridDiv>
                    </Link>
                    <Link href="products/app">
                        <GridDiv>
                            <Image className="w-full h-full rounded-xl shadow-lg" src="/SparqApp.png" width={768} height={512} alt="Sparq App Splash Image"/>
                            <h2 className="text-2xl font-bold text-brand-maroon mt-8">Sparq App</h2>
                        </GridDiv>
                    </Link>
                </div>
            </section>
            <section id="accessories">
                <h1 className='text-5xl font-bold text-brand-maroon text-center mt-32 mb-32'>Accessories</h1>
                <div className='flex flex-wrap justify-center gap-16'>
                    <Link href="products/accessories">
                        <GridDiv id="cables">
                            <Image src="/cables.jpg" width={671} height={409} alt="Types of Cables Offered"/>
                            <h2 className='text-2xl font-bold text-brand-maroon mt-8'>Cables</h2>
                        </GridDiv>
                    </Link>
                </div>
            </section>
        </div>
    );
}