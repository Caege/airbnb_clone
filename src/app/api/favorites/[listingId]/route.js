import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../../../../lib/prismadb";

export async function POST(req, { params }) {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return NextResponse.error();
	}
	//you can get the dynamic segment , which is the same as the folder you created for the dynamic segment
	const { listingId } = params;

	if (!listingId || typeof listingId !== "string") {
		throw new Error("Invalid ID");
	}

	let favoriteIds = [...(currentUser.favoriteIds || [])];

	favoriteIds.push(listingId);

	const user = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			favoriteIds,
		},
	});

	return NextResponse.json(user);
}

export async function DELETE(req, { params }) {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return NextResponse.error();
	}

	const { listingId } = params;

	if (!listingId || typeof listingId !== "string") {
		throw new Error("Invalid ID");
	}

	let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data : {
            favoriteIds
        }
    })
	return NextResponse.json(user)
}
