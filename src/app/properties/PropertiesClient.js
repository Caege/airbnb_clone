"use client";

const { default: Container } = require("@/components/Container");
const { default: Heading } = require("@/components/Heading");
const { default: ListingCard } = require("@/components/listings/ListingCard");
const { default: axios } = require("axios");
const { useRouter } = require("next/navigation");
const { useState, useCallback } = require("react");
const { default: toast } = require("react-hot-toast");

const PropertiesClient = ({ listings, currentUser }) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");

	const onCancel = useCallback(
		(id) => {
			setDeletingId(id);
			axios
				.delete(`/api/listings/${id}`)
				.then(() => {
					toast.success("listing deleted");
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
			<Heading title="Properties" subtitle="List of your properties" />

			<div
				className=" mt-10 grid sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6 gap-8"
			>
				{listings.map((listing) => (
					<ListingCard
						key={listing.id}
						data={listing}
						actionId={listing.id}
						onAction={onCancel}
						disabled={deletingId === listing.id}
						actionLabel="Delete property"
						currentUser={currentUser}
						// reservation={reservation}
					/>
				))}
			</div>
		</Container>
	);
};


export default PropertiesClient;