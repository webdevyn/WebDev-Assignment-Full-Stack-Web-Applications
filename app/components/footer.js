const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4">
      <div className="text-center text-white">
        &copy; {new Date().getFullYear()} IMR Movie App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
