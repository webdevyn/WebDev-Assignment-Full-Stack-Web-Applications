import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const movies = await prisma.movie.findMany();
  return NextResponse.json(movies);
}

export async function POST(req) {
  try {
    const data = await req.json();

    //validate data
    if (!data.title || !data.actors || !data.releaseYear) {
      return new Response("Invalid data", { status: 400 });
    }

    const newMovie = await prisma.movie.create({
      data: {
        // Use the data from the request to create a new movie
        title: data.title,
        actors: data.actors,
        releaseYear: data.releaseYear,
      },
    });

    return NextResponse.json(newMovie);
  } catch (error) {
    console.error("Error adding movie:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
