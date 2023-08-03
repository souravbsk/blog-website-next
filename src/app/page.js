"use client";
import RemoveBtn from "@/components/RemoveBtn";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiPencilAlt } from "react-icons/hi";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [reFecth, setReFetch] = useState(true);
  useEffect(() => {
    fetch("https://blog-website-express.vercel.app/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      });
  }, [reFecth]);
  return (
    <main className="container">
      <div className=" grid md:grid-cols-2 gap-4 space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="p-4 border border-slate-300 my-3   justify-between gap-5 items-start"
          >
            <div>
              <Image
                alt="blog image"
                width={1100}
                height={200}
                className="w-full h-full"
                src={blog?.blogImage}
              ></Image>
              <h2 className="font-bold text-2xl">{blog?.title}</h2>
              <p>{blog?.description}</p>
            </div>

            <div className="flex justify-end gap-2">
              <RemoveBtn
                reFecth={reFecth}
                setReFetch={setReFetch}
                id={blog?._id}
              />
              <Link href={`/edit-blog/${blog?._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
