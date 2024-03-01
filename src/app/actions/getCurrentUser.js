import { getServerSession } from "next-auth/next";

import { authOptions } from "../../pages/api/auth/[...nextauth]";
import prisma from "../../../lib/prismadb";

export async function getSession() {
	return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
	try {
		const session = await getSession();
        console.log("this is the session", session)
		if (!session?.user?.email) {
			return null;
		}

		const currentUser = await prisma.user.findUnique({
			where: {
				email: session?.user?.email,
			},
		});

		if (!currentUser) {
			return null;
		}

		return currentUser;
	} catch (e) {
		//if I throw an error here somehow it would break the apo
		return null;
	}
}
