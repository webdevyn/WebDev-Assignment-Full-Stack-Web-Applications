"use client";
import React, { useEffect, useState } from "react";

import Navbar from "./components/navbar";
import MovieList from "./components/movie-list";
import Footer from "./components/footer";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies");
      const data = await res.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  const handleAddMovie = (newMovie) => {
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };

  const handleDeleteMovie = async (id) => {
    const res = await fetch(`/api/movies/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Movie App</h1>
        <p className="mb-4">
          This is a simple application to manage your movie collection.
        </p>
        <MovieList movies={movies} onDelete={handleDeleteMovie} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
