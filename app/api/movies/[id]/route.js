import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const movie = await prisma.movie.findUnique({
    where: { id: params.id },
  });
  return NextResponse.json(movie);
}

export async function PUT(req, context) {
  const { params } = await context; //wait for context to get params
  const data = await req.json();

  const updatedMovie = await prisma.movie.update({
    where: { id: params.id },
    data: {
      title: data.title,
      actors: data.actors,
      releaseYear: data.releaseYear,
    },
  });
  return NextResponse.json(updatedMovie);
}

export async function DELETE(req, { params }) {
  await prisma.movie.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ message: "Movie deleted successfully" });
}
