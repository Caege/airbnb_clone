"use client";
import React from "react";
import { BiDollar } from "react-icons/bi";

function Input({
	id,
	label,
	type,
	disabled,
	formatPrice,
	required,
	register,
	errors,
}) {
	return (
		<div className=" relative w-full ">
			{formatPrice && <BiDollar size={18} className=" absolute top-5 left-2" />}
			<input
				id={id}
				disabled={disabled}
				{...register(id, { required })}
				placeholder=" "
				type={type}
				className={`peer w-full outline-none transition pl-4 border border-slate-800 p-4 rounded-md pt-5 ${
					formatPrice ? "pl-9" : "pl-4"
				}`}
			/>
			<label
				className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-4
          top-5 
          z-10 
          origin-[0] 
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-5
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
			>
				{label}
			</label>
		</div>
	);
}

export default Input;
