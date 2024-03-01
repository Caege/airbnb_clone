const { default: EmptyState } = require("@/components/EmptyState");
const { default: getCurrentUser } = require("../actions/getCurrentUser");
const { default: getReservation } = require("../actions/getReservations");
import TripsClient from "../trips/TripsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();
    if(!currentUser) {
        return (
            <EmptyState title = "Unauthorized" subtitle="Please login"/>
        )
    }

    const reservations = await getReservation({ authorId : currentUser.id})

    if(reservations.length === 0) {
        return (
					<EmptyState
						title="No reservations found"
						subtitle="Looks like you have no reservations on your properties."
					/>
				);
    }


    return (
        <TripsClient reservations={reservations} currentUser={currentUser} title="Reservations" subtitle="List of all your reservations" cancelGuest/>
    )
}


export default ReservationsPage;