"use client";

const { default: Container } = require("@/components/Container");
const { default: Heading } = require("@/components/Heading");
const { default: ListingCard } = require("@/components/listings/ListingCard");
const { default: axios } = require("axios");
const { useRouter } = require("next/navigation");
const { useState, useCallback } = require("react");
const { default: toast } = require("react-hot-toast");

const TripsClient = ({ reservations, currentUser , title, subtitle, cancelGuest}) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");

	const onCancel = useCallback(
		(id) => {
			setDeletingId(id);
			axios
				.delete(`/api/reservations/${id}`)
				.then(() => {
					toast.success("Reservation cancelled");
					router.refresh();
				})
				.catch((e) => {
					toast.error("something went wrong while cancelling the reservation");
				})
				.finally(() => {
					setDeletingId("");
				});
		},
		[router]
	);
	return (
		<Container>
			<div className=" mt-20"></div>
			<Heading
				title={title ? title : "Trips"}
				subtitle={subtitle ? subtitle :"Where you've been and where you're going"}
			/>

			<div
				className=" mt-10 grid grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6 gap-8 "
			>
				{reservations.map((reservation) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={deletingId === reservation.id}
						actionLabel={cancelGuest ? "Cancel guest reservation" :"Cancel reservation"}
						currentUser={currentUser}
						reservation={reservation}
					/>
				))}
			</div>
		</Container>
	);
};


export default TripsClient;