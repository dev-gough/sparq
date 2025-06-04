import TOSDropdown from "@/components/TOSDropdown"
import PrivacyPolicyDropdown from "@/components/PrivacyPolicyDropdown"

export default function LegalPage() {
    return (
        <div className="container mx-auto py-8 px-4 pb-4">
            <h1 className="sm:text-5xl text-3xl font-bold text-brand-maroon text-center sm:mb-32 mb-8">Legal</h1>
            <TOSDropdown />
            <PrivacyPolicyDropdown className='mt-8' />
        </div>
    )
}