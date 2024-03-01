"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import qs from "query-string"
function CategoryBox({icon : Icon, label, selected}) {
    const router = useRouter();
    const params = useSearchParams();
    const handleClick = useCallback(() => {
let currentQuery = {};

if(params) {
    currentQuery  = qs.parse(params.toString());
}

const updatedQuery = {
    ...currentQuery, category: label
}

if(params?.get("category") === label){
    delete updatedQuery.category
}

const url = qs.stringifyUrl({
    url: "/",
    query : updatedQuery
}, { skipNull : true})

router.push(url)
    }, [label, params, router])
  return (
		<div
			className={`flex flex-col items-center justify-center gap-2 p-2 md:p-3 px-4 border-b-2 hover:text-neutral-800 transition ${selected ? "border-b-neutral-800 text-neutral-800" : " border-transparent text-neutral-500"} relative`}
            onClick={handleClick}
		>
        <div className=' absolute -inset-1 hover:bg-neutral-400/20 rounded-full'>

        </div>
			<Icon size={20}/>
           <div className=' font-medium text-sm '>{label}</div>
		</div>
	);
}

export default CategoryBox