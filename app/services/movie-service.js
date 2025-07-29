// services/movie-service.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getMovies() {
  return await prisma.movie.findMany();
}

export async function addMovie(data) {
  return await prisma.movie.create({
    data,
  });
}

export async function updateMovie(id, data) {
  return await prisma.movie.update({
    where: { id },
    data,
  });
}

export async function deleteMovie(id) {
  return await prisma.movie.delete({
    where: { id },
  });
}
