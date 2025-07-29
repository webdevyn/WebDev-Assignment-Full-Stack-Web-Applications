import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="w-full">
        <h1 className="text-center text-white text-[30px] font-bold">
          Movie App
        </h1>
      </div>

      <div className="flex flex-col space-y-2 mt-2">
        <Link href="/" className="text-white hover:text-gray-300">
          Movies List
        </Link>
        <Link href="/add-movie" className="text-white hover:text-gray-300">
          Add Movie
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
