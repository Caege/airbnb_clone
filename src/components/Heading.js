"use client"
import React from 'react'

function Heading({title, subtitle, center}) {
  return (
		<div>
			<div className={`text-lg font-bold ${center ? " text-center" : ""} `}>
				{title}
			</div>
			<div className={` text-slate-500 ${center ? " text-center" : ""}`}>
				{subtitle}
			</div>
		</div>
	);
}

export default Heading