import Image from 'next/image';

interface BoardMemberProps {
    imgSrc: string;
    right: boolean;
    name: string;
    location: string;
    title: string;      // must be of the form {label}: {date} ||| e.g. Director since: February 24, 2022
    blurb: string;
}

export default function BoardMember(member: BoardMemberProps) {

    const [label, date] = member.title.split(': ');

    return (
        <div className={`flex ${member.right ? 'flex-row' : 'flex-row-reverse'} items-center`}>
            <div className={`w-64 ${member.right ? 'ml-6' : 'mr-6'} mx-16`}>
                <Image
                    src={member.imgSrc}
                    alt={member.name}
                    width={256}
                    height={256}
                />
            </div>
            <div className="flex-1">
                <h3 className="text-2xl text-brand-maroon">{member.name}</h3>
                <p className="text-base mt-2 font-bold">{member.location}</p>
                <p className="text-base mt-2">
                    <span className="font-bold">{label}:</span> {date}
                </p>
                <p className="text-base mt-4">{member.blurb}</p>
            </div>
        </div>
    )
}