import Link from "next/link"

const footerContet = {
    place:[
        {
            key: 1,
            href: "#",
            label: 'contries'
        },
        {
            key: 2,
            href: "#",
            label: 'cities'
        },
        {
            key: 3,
            href: "#",
            label: 'regions'
        },
        {
            key: 4,
            href: "#",
            label: 'districts'
        },
    ],

    categories:[
        {
            key: 1,
            href: "#",
            label: 'hotels'
        },
        {
            key: 2,
            href: "#",
            label: 'motels'
        },
        {
            key: 3,
            href: "#",
            label: 'villas'
        },
        {
            key: 4,
            href: "#",
            label: 'appartemant'
        },
    ],

    services:[
        {
            key: 1,
            href: "#",
            label: 'curtomer service'
        },
        {
            key: 2,
            href: "#",
            label: 'partner help'
        },
        {
            key: 3,
            href: "#",
            label: 'careers'
        },
        {
            key: 4,
            href: "#",
            label: 'term & conditions'
        },
    ],
}

export default function Footer(){
    return(
        <div className="pt-10 text-sm ">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-3 pb-20 text-blue-900">
                    <ul>
                    {footerContet.place.map((el)=>{
                        return(
                            <li key={el.key}>
                                <Link href={el.href}>{el.label}</Link>
                            </li>
                        )
                    })}
                    </ul>
                    <ul>
                    {footerContet.categories.map((el)=>{
                        return(
                            <li key={el.key}>
                                <Link href={el.href}>{el.label}</Link>
                            </li>
                        )
                    })}
                    </ul>
                    <ul>
                    {footerContet.services.map((el)=>{
                        return(
                            <li key={el.key}>
                                <Link href={el.href}>{el.label}</Link>
                            </li>
                        )
                    })}
                    </ul>
                </div>
                <p className="pb-4 text-gray-700">Copyright © 2024 Akrambooking</p>
            </div>
        </div>
    )

}