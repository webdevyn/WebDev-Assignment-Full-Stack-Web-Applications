"use client";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditMoviePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/movies/${id}`);
        if (res.ok) {
          const data = await res.json();
          setMovie(data);
        } else {
          console.error("Failed to fetch movie");
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
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

    if (res.ok) {
      router.push("/");
    } else {
      console.error("Failed to update movie");
    }
  };

  //stop access to movie.title before movie is fetched
  if (!movie) return <p>Loading...</p>;

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
