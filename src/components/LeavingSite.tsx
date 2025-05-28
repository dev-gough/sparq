import Link from "next/link";

interface Props {
    href: string;
    setShown: (s: boolean) => void;
}

export default function LeavingSite({ href, setShown }: Props) {
    return (
        <div className="fixed inset-0 bg-black/60 z-40">
            <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-md bg-white p-6 rounded-xl shadow-lg transform -translate-x-1/2 -translate-y-1/2 overflow-hidden border-2 border-brand-maroon">
                <h2 className="text-2xl xl:text-3xl font-bold text-brand-maroon">
                    Third-Party Content Disclaimer
                </h2>
                <p className="mt-4 text-gray-700 lg:text-lg">
                    Sparqsys.com is not responsible for the content or privacy practices of
                    third-party websites. You are about to visit:
                </p>
                <p className="mt-2 break-all font-mono text-sm lg:text-base text-gray-600">{href}</p>
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={() => setShown(false)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition cursor-pointer lg:text-lg"
                    >
                        Cancel
                    </button>
                    <Link href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brand-maroon text-white px-4 py-2 rounded-lg hover:opacity-90 transition lg:text-lg"
                    >
                        Proceed
                    </Link>
                </div>
            </div>
        </div >
    );
}
