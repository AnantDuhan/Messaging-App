import bcrypt from 'bcrypt';

import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
            },
        });
        console.log(hashedPassword)
        console.log(user);

        return NextResponse.json(user);
    } catch (error) {
        console.log("ERROR:- ", error);
        return NextResponse.json(error);
    }
}
