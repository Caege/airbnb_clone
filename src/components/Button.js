"use client"

import React from 'react'

function Button({ label, onClick, disabled, Icon, bg}) {
  return (
    <button className={` relative disabled:opacity-70 disabled:cursor-not-allowed w-full transition bg-rose-500  p-3 ${bg ? "bg-white text-black border-black" :"bg-rose-500 text-white" } border rounded-md`} onClick={onClick} disabled={disabled}>{Icon && (
        <Icon size={24}  className =" absolute left-4 top-3"/>
    )}
{label}
    </button>
  )
}

export default Button