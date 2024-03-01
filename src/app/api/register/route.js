import bcrypt from "bcrypt";
import prisma from "../../../../lib/prismadb"
import toast from "react-hot-toast";
export async function POST(request) {
const body = await request.json();
const { email,name, password} = body;
const hashedPassword = await bcrypt.hash(password, 12);
const user = await prisma.user.create({
    data : {
        email,
        name,
        hashedPassword
    }
})

console.log("new user created")
return Response.json(user)
}