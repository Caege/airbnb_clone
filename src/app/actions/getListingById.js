import { list } from "postcss";
import prisma from "../../../lib/prismadb"


export default async function getListingById (params) {
try {

    const { listingId} = params;
    console.log(listingId)
    const listing = await prisma.listing.findUnique({
        where: {
            id : listingId,
        }, 
        include : {
            user: true
        }
    })

    if(!listing) {
        return null;
    }

    return listing
} catch (e) {
    throw new Error(e)
}


}