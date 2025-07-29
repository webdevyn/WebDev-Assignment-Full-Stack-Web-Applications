"use client";
import React from "react";
import { useState, useEffect } from "react";

const AddMovieForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [actors, setActors] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !actors || !releaseYear) {
      alert("Please fill in all fields.");
      return;
    }

    // Validate release year
    if (releaseYear < 1888 || releaseYear > new Date().getFullYear()) {
      alert("Please enter a valid release year.");
      return;
    }

    const newMovie = {
      id: Date.now().toString(), // Temporary ID, will be replaced by the server
      title,
      actors: actors.split(",").map((actor) => actor.trim()),
      releaseYear: parseInt(releaseYear),
    };

    const res = await fetch("/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });

    if (res.ok) {
      const addedMovie = await res.json();
      onAdd(addedMovie);
      setTitle("");
      setActors("");
      setReleaseYear("");
    } else {
      console.error("Failed to add movie");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-[50%] space-y-4">
      <input
        className="w-full p-2 border border-gray-300 rounded"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="w-full p-2 border border-gray-300 rounded"
        type="text"
        placeholder="Actors (comma-separated)"
        value={actors}
        onChange={(e) => setActors(e.target.value)}
        required
      />
      <input
        className="w-full p-2 border border-gray-300 rounded"
        type="number"
        placeholder="Release Year"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Movie
      </button>
    </form>
  );
};

export default AddMovieForm;
