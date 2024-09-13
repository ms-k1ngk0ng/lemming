import { NextResponse } from 'next/server';
import  prisma from '@/lib/prisma'; // Adjust the import based on your setup
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'; // Ensure correct import

interface UserData {
  name: string;
  email: string;
  password: string;
  profilePicture?: string; // Add other fields if needed
}

export async function POST(request: Request) {
  try {
    const reqBody: UserData = await request.json();

    // Example validation (add your own as needed)
    if (!reqBody.name || !reqBody.email || !reqBody.password) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const newUser = await prisma.user.create({ data: reqBody });

    return new Response(
      JSON.stringify(newUser),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    // Optionally, handle different types of errors more specifically
    if (error instanceof PrismaClientKnownRequestError) {
      
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Failed to create user." }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
