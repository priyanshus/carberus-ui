import Link from "next/link";

export default async function SideBarComponent() {
    const availableService = ['Quick Summary', 'Class Room', 'Schedule', 'Login'];

    return (
        <div className="flex flex-col w-full border-r-2 border-white shadow-right ">

            <div className="flex flex-col items-start flex-1 ">
                {availableService.map((service, index) => (
                    <div key={index} className="flex flex-inline h-10 w-full items-center hover:bg-blue-400 rounded-xl">
                        <Link href={service.toLowerCase()} className=" ml-5 font-semibold cursor-pointer hover:text-white hover:font-extrabold">{service}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}