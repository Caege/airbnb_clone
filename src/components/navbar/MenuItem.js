"use client";
import React from "react";

function MenuItem({ onClick, label }) {
	return (
		<div
			className=" cursor-pointer    px-4 
        py-3 "
			onClick={onClick}
		>
			{label}
		</div>
	);
}

export default MenuItem;
