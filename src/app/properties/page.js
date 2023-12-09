import EmptyState from "@/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import TripsClient from "@/app/trips/TripsClient"
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";
const TripsPage = async () => {
    const currentUser = await getCurrentUser();
    if(!currentUser) {
        return <EmptyState title="Unauthorized" subtitle="Please login" />;
    }

    const listings = await getListings({userId : currentUser.id});
    console.log(listings)

    if(listings.length === 0) {
        return (
					<EmptyState
						title="No properties found"
						subtitle="Looks like you don't have any "
					/>
				);
    }


    return (
			<PropertiesClient listings={listings} currentUser={currentUser} />
		);
}

export default TripsPage;


