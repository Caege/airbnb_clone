import { NextResponse } from "next/server"
import prisma from "../../../../lib/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"

export async function POST(request) {
    console.log("tried posting to reservation")
    const currentUser  = await getCurrentUser()
    if(!currentUser) {
        return NextResponse.error()
    }

   
    const body = await request.json();
    const {listingId, startDate, endDate, totalPrice} = body


    if(!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error()
    }

    const listingAndReservation = await prisma.listing.update ( {
        where : {
            id : listingId
        },

        data : {
            reservations : {
                create : {
                    userId : currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })


    return NextResponse.json(listingAndReservation)
}