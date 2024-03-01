"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";

function EmptyState({
	title = "No exact matches",
	subtitle = "Try changing or removing some of your filters",
	showReset,
}) {
	const router = useRouter();

	return (
		<div className=" md:h-[60vh] h-[100vh] flex flex-col gap-2 justify-center items-center">
			<Heading title={title} subtitle={subtitle} center />
			<div className=" w-48 mt-5">
				{showReset && (
					<Button
						label="Remove all filters"
						onClick={() => {
							router.push("/");
						}}
						bg
					/>
				)}
			</div>
		</div>
	);
}

export default EmptyState;
