import Link from "next/link";

export default function ResourcesPage() {
    return (
        <div className="grid grid-cols-2 min-h-[calc(100vh-114px)] gap-8 p-8 bg-neutral-200">
            {/* Homeowners Section */}
            <div className="bg-[url(/1.webp)] bg-cover shadow-lg rounded-xl p-8 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4 text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Welcome Homeowners</h1>
                <p className="text-lg text-white mb-8 text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="flex space-x-4">
                    <button className="bg-brand-maroon text-brand-yellow px-4 py-2 rounded-md hover:bg-brand-darkmaroon">
                        Why Sparq?
                    </button>
                    <Link href="/resources/design" className="bg-brand-maroon text-brand-yellow px-4 py-2 rounded-md hover:bg-brand-darkmaroon">
                        Design Your System
                    </Link>
                </div>
            </div>
            {/* Installers Section */}
            <div className="bg-[url(/SLC/001.JPG)] bg-cover shadow-lg rounded-xl p-8 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4 text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">Welcome Installers</h1>
                <p className="text-lg text-white mb-8 text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8),0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="flex space-x-4">
                    <Link href="/contact" className="bg-brand-maroon text-brand-yellow px-4 py-2 rounded-md hover:bg-brand-darkmaroon">
                        Become an Installer
                    </Link>
                    <button className="bg-brand-maroon text-brand-yellow px-4 py-2 cursor-pointer rounded-md hover:bg-brand-darkmaroon">
                        Installer Resources
                    </button>
                </div>
            </div>
        </div>
    );
}
