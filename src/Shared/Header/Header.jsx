import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="flex container justify-between items-center bg-slate-800 px-8 py-3">
      <Link className="text-white font-bold" href={"/"}>
        Blog.
      </Link>
      <Link className="bg-white p-2" href={"/add-blog"}>
        Add Blog
      </Link>
    </nav>
  );
};

export default Header;
