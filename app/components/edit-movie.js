"use client";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditMoviePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`/api/movies/${id}`);
      const data = await res.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
  };

  if (!movie) return <p>Movie not found</p>;

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        value={movie.title}
        onChange={(e) => setMovie({ ...movie, title: e.target.value })}
        required
      />
      <input
        type="text"
        value={movie.actors.join(", ")}
        onChange={(e) =>
          setMovie({
            ...movie,
            actors: e.target.value.split(",").map((actor) => actor.trim()),
          })
        }
        required
      />
      <input
        type="number"
        value={movie.releaseYear}
        onChange={(e) =>
          setMovie({ ...movie, releaseYear: parseInt(e.target.value) })
        }
        required
      />
      <button type="submit">Update Movie</button>
    </form>
  );
};

export default EditMoviePage;
