"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "@/components/navbar/Categories";
import Container from "@/components/Container";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "@/components/listings/ListingReservation";

const initialDataRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: "selection", //why?
};

function ListingClient({ listing, currentUser, reservations = [] }) {
	const category = useMemo(() => {
		return categories.find((item) => item.label === listing.category);
	}, [listing.category]);
	const loginModal = useLoginModal();
	const router = useRouter();

	const disabledDates = useMemo(() => {
		let dates = [];

		reservations.forEach((reservation) => {
			const range = eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate),
			});

			dates = [...dates, ...range];
		});

		return dates;
	}, [reservations]);

	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(listing.price);
	const [dateRange, setDateRange] = useState(initialDataRange);
	const [navbarHeight, setNavbarHeight] = useState("90px")


const onCreateReservation = useCallback(() => {
	if(!currentUser) {
		return loginModal.onOpen();
	}

	setIsLoading(true);

	axios.post("/api/reservations", {
		totalPrice, startDate : dateRange.startDate, endDate : dateRange.endDate, listingId: listing?.id
	}).then(() => {
		toast.success("Listing reserved")
		setDateRange(initialDataRange)
		router.push("/trips")
	}).catch(( e) => {
		toast.error("Something went wrong when reserving listing");

		console.log(e)
	}).finally(() => {
		setIsLoading(false)
	})
}, [currentUser,dateRange,listing?.id,router, loginModal ])

useEffect(() => {
if(dateRange.startDate && dateRange.endDate) {
	const dayCount = differenceInCalendarDays( dateRange.endDate, dateRange.startDate)
	if(dayCount && listing.price) {
		setTotalPrice(dayCount * listing.price)
	} else {
		setTotalPrice(listing.price)
	}
}
}, [ dateRange,listing.price])




	return (
		<div
			className={`max-w-screen-lg mx-auto pt-[90px] sm:pt-[110px]`}
		>
			<div className=" flex flex-col gap-6">
				<ListingHead
					title={listing.title}
					imageSrc={listing.imageSrc}
					locationValue={listing.locationValue}
					id={listing.id}
					currentUser={currentUser}
				/>
				<div className=" grid md:grid-cols-7 md:gap-10 grid-cols-1">
					<ListingInfo
						user={listing.user}
						category={category}
						description={listing.description}
						roomCount={listing.roomCount}
						guestCount={listing.guestCount}
						bathroomCount={listing.bathroomCount}
						locationValue={listing.locationValue}
					/>
					<div className="order-first mb-10 md:col-span-3 md:order-last ">
						<ListingReservation
							price={listing.price}
							totalPrice={totalPrice}
							onChangeDate={(value) => setDateRange(value)}
							onSubmit={onCreateReservation}
							disabled={isLoading}
							disabledDates={disabledDates}
							dateRange={dateRange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListingClient;
