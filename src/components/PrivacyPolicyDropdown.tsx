'use client'

import Link from "next/link"
import { useState, useEffect } from "react"

interface PPProps {
    isOpen?: boolean
    className?: string
}

export default function PrivacyPolicyDropdown({ isOpen, className }: PPProps) {

    const [open, setOpen] = useState<boolean>(isOpen? true : false)

    useEffect(() => {
        if (!open) {
            window.scrollTo({top: 0})
        }
    }, [open])

    return (
        <div className={`w-full ${className}`}>
            {/* Dropdown menu button */}
            <div
                className={`p-4 cursor-pointer bg-gray-100 rounded-xl border hover:bg-gray-200 ${open? 'sticky top-0 z-10':''}`}
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                <div className="flex flex-row justify-between items-center">
                    <span>Privacy Policy</span>
                    <svg
                        fill="#000000"
                        height="20"
                        width="20"
                        version="1.1"
                        id="Layer_1"
                        viewBox="0 0 330.00 330.00"
                        className={`transform transition-transform duration-300 ${open ? 'scale-y-[-1]' : ''
                            }`}
                    >
                        <path
                            id="XMLID_225_"
                            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                        />
                    </svg>
                </div>
            </div>
            {open && (
                <div className="flex flex-col gap-4 p-10 mt-2">
                    <p>Sparq is committed to collecting, using and disclosing the Personal Information provided to it by visitors to our website found at: sparqsys.com (the &quot;Site&quot;) in compliance with all applicable federal and provincial privacy laws in Canada (&quot;Privacy Legislation&quot;).</p>
                    <h2 className="font-bold">What is Personal Information?</h2>
                    <p>Federal privacy legislation, the Personal Information Protection and Electronic Documents Act (PIPEDA), applies to &quot;personal information&quot; about an &quot;identifiable individual&quot; but does not include name, title, business address and business phone number used for business purposes.</p>
                    <p>Accordingly, the term &quot;Personal Information&quot; within this Privacy Policy means information about an identifiable individual, but does not include publicly available information such as a public directory listing of an individual&apos;s name, position name or title, business telephone number, business address, business e-mail, business fax number and other similar business information (as long as such information is used for contacting the individual in relation to the individual&apos;s business responsibilities and for no other purpose); or aggregated information that cannot be associated with a specific individual.</p>
                    <p>Sparq does not does not sell or lend Personal Information it may collect to any third-party.</p>
                    <h2 className="font-bold">Personal Information Collected Through Website</h2>
                    <p>A visitor to the Site does not automatically provide Sparq with Personal Information. However, the web server that Sparq is located on may collect and retain certain information related to a computer&apos;s visit to the Site such as the IP address and domain used to access the Site, the type and version of the browser used to access the Site, the date and time of the visit, the page that the Site was entered and exited by; and, the address of any referrer website if the visiting computer was referred to the Site by a search engine or other website.</p>
                    <p>The Site uses Google Analytics™ to record the IP addresses of computers that connect to the Site. Google Analytics™ uses these addresses to generate geographically related statistics which assist Sparq with the administration of the Site. Sparq does not attempt to link the IP addresses of the computers that have visited the Site with the identities of individuals.</p>
                    <p>More information regarding Google Analytics™ can be found at <Link href="https://policies.google.com/privacy" className="text-blue-400 cursor-pointer hover:underline" target="_blank">https://policies.google.com/privacy</Link>.</p>
                    <p>The Site also uses &quot;cookies&quot; which are small data files transferred to a user&apos;s hard drive by the web browser when a user visits the Site. A transferred cookie can only be read by the Site when a user returns to the Site. Cookies are used to identify users and track their preferences so that a user&apos;s experience with the Site may be customized accordingly. If a user does not want to have a cookie placed upon their hard drive by the Site most web browsers allow users to change this preference to disallow cookies; however, note that this could change the functionality of the Site.</p>
                    <h2 className="font-bold">Linking to Third Party Websites</h2>
                    <p>The Site may contain links to third-party websites. These links are provided solely as a convenience to visitors to the Site and not as an endorsement by Sparq of the contents of such third-party sites. Sparq disclaims all responsibility for the privacy practices, policies, or other privacy related matters associated with the third-party websites to which the Site is linked.</p>
                    <p>Sparq recommends that visitors who link to third-party websites through the Site thoroughly review the privacy policies of those third-party websites prior to providing personal information. </p>
                    <h2 className="font-bold">When Does Sparq Collect, Use and Disclose Personal Information?</h2>
                    <p>Sparq does not collect Personal Information on its site. Personal Information transmitted to Sparq through direct email is used by Sparq to establish or manage its relationship with clients, to respond to the queries of visitors and to facilitate receipt of Sparq&apos;s information and services. Sparq restricts the collection of personal information to that which is necessary for the identified purposes.</p>
                    <h2 className="font-bold">Providing Consent</h2>
                    <p>By providing Personal Information to Sparq through direct email, the individual&apos;s consent to Sparq using that Personal Information for the identified purposes is implied by Privacy Legislation.</p>
                </div>
            )}
        </div>
    )
}