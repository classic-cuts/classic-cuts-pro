import prisma from "@/libs/prismadb";
import {NextResponse} from "next/server";
import {getCurrentUser} from '@/actions/getCurrentUser';

export async function POST(request: Request){
    const body = await request.json();
    const {name, email, password} = body;

    
}