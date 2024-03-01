"use client"
import React from 'react'

function CategoryInput( {label, icon : Icon, onClick, selected }) {
  return (
    <div onClick={() => onClick(label)} className={` rounded-xl border-2 p-4 flex gap-3 hover:border-black transition cursor-pointer ${selected ? "border-black" : " border-neutral-200"}`}>
        <Icon size={30}/>
        <div>{label}</div>
    </div>
  )
}

export default CategoryInput