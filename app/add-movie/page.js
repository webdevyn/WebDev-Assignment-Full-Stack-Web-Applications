"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../components/navbar";
import AddMovieForm from "../components/add-movie-form";
import Footer from "../components/footer";

const AddMoviePage = () => {
  const [movies, setMovies] = useState([]);
  const router = useRouter();

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
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Add a New Movie</h1>
        <AddMovieForm onAdd={handleAddMovie} />
      </main>
      <Footer />
    </div>
  );
};

export default AddMoviePage;
