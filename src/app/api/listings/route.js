import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../../../lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
	const currentUser = await getCurrentUser();
    console.log("running listings api");

    console.log(currentUser)
	if (!currentUser) {
		return NextResponse.error();
	}
	const body = await request.json();
    console.log("this is the body in listings api", body)
	const {
		title,
		description,
		imageSrc,
		category,
		roomCount,
		bathroomCount,
		guestCount,
		location,
		price,
	} = body;

    const listing = await prisma.listing.create({
			data: {
				title,
				description,
				imageSrc,
				category,
				roomCount,
				bathroomCount,
				guestCount,
				locationValue : location.value,
				price: parseInt(price, 10),
                userId: currentUser.id
			},
		});

        console.log("this is the result of listing" , listing)

        return NextResponse.json(listing)
}
