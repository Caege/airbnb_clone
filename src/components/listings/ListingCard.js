"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useCountries from "@/hooks/useCountries";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import HeartButton from "../HeartButton";
import Button from "../Button";
import {format} from "date-fns"
function ListingCard({
	data,
	reservation,
	onAction,
	disabled,
	actionLabel,
	actionId = "",
	currentUser,
}) {

	console.log("this is the reservation", reservation)
	const router = useRouter();
	const { getByValue } = useCountries();
	const location = getByValue(data.locationValue);
	//price and reservation dates

	const price = useMemo(() => {
		if (reservation) {
			return reservation.totalPrice;
		}

		return data.price;
	}, [reservation, data.price]);

	const reservationDate = useMemo(() => {
		if (!reservation) {
			return null;
		}

		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		console.log("this is start and end", start, end)

		return `${format(start, "PP")} - ${format(end, "PP")}`;
	}, [reservation]);

//this just runs onAction with actionId as input
const handleCancel = useCallback((e) => {
  e.stopPropagation();
  if(disabled) {
    return;
  }

  onAction?.(actionId);

},[onAction, actionId])



	return (
		<div
			className=" col-span-1 cursor-pointer group w-full "
			onClick={() => router.push(`/listings/${data.id}`)}
		>
			<div className=" flex flex-col gap-2 w-full ">
				<div className=" w-full relative rounded-xl aspect-square overflow-hidden ">
					<Image
						fill
						className=" object-cover h-full w-full group-hover:scale-110 transition -z-10  "
						src={data.imageSrc}
						alt="Listing"
					/>
					<div className=" absolute top-3 right-3 z-[1] ">
						<HeartButton listingId={data.id} currentUser={currentUser} />
					</div>
				</div>

				<div className="font-semibold text-lg">
					{location?.region}, {location?.label}
				</div>
				<div className="font-light text-neutral-500">
					{reservationDate || data.category}
				</div>
				<div className="flex flex-row items-center gap-1">
					<div className="font-semibold">$ {price}</div>
					{!reservation && <div className="font-light">night</div>}
				</div>
				{onAction && actionLabel && (
					<Button
						disabled={disabled}
						small
						label={actionLabel}
						onClick={handleCancel}
					/>
				)}
			</div>
		</div>
	);
}

export default ListingCard;
