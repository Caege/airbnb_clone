"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter();
    return (
        <Image
            alt="logo"
            className=" cursor-pointer"
            height="100"
            width="100"
            src="/Images/logo.png"
            onClick={() => {
                router.push("/")
            }}
        />
    )
}


export default Logo;