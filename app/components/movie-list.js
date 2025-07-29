"use client";
import React from "react";
import Link from "next/link";

const MovieList = ({ movies = [], onDelete }) => {
  return (
    //make a ternary operator to check if movies is empty
    <div className="space-y-4 bg-blue-800 p-4 rounded-lg">
      <h1 className="text-2xl font-bold">Movie List</h1>
      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="flex justify-between items-center py-4"
            >
              <div>
                <h2 className="text-lg font-semibold">Title: {movie.title}</h2>
                <p>Actors: {movie.actors.join(", ")}</p>
                <p>Release Year: {movie.releaseYear}</p>
              </div>
              <div className="flex gap-2 p-2 rounded-lg">
                <Link
                  href={`/movies/${movie.id}`}
                  className="text-blue-500 hover:underline bg-gray-700 p-2 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(movie.id)}
                  className="text-red-500 hover:underline bg-gray-700 p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieList;
