import EmptyState from "@/components/EmptyState";
import getListings from "./actions/getListings";
import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

export const dynamic = "force-dynamic";
export default async function Home({ searchParams }) {
	const listings = await getListings(searchParams);
	const currentUser = await getCurrentUser();
	const isEmpty = true;
	if (listings.length === 0) {
		return <EmptyState showReset />;
	}


	return (
		<Container>
			<div
				className=" md:pt-[185px] pt-[168px] grid grid-cols-1    sm:grid-cols-2  md:grid-cols-3 gap-8  lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            "
			>
				{listings.map((listing) => {
					return (
						<ListingCard
							key={listing.id}
							data={listing}
							currentUser={currentUser}
						/>
					);
				})}
			</div>
		</Container>
	);
}
