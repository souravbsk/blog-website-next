'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const EditBlog = ({params}) => {
  const [reFecth,setRefetch] = useState(true)
  console.log(params);
  const [blog,setBlog] = useState({});
  useEffect(() => {
    fetch(`https://blog-website-express.vercel.app/blogs/${params?.id}`)
    .then(res => res.json())
    .then(data => {
      setBlog(data);
    })
  },[params?.id,reFecth])


  const handleUpdateBlog = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const updateBlog = {title,description}

    fetch(`https://blog-website-express.vercel.app/blogs/${params.id}`,{
          method:"PUT",
          headers:{
            'content-type':'application/json',
          },
          body:JSON.stringify(updateBlog)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
         if(data.modifiedCount > 0){
          setRefetch(!reFecth)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your blog has been updated',
            showConfirmButton: false,
            timer: 1500
          })
         }
        })

   
  }
   
  return (
    <div className="container">
      <Image src={blog?.blogImage} alt="blog Image" width={100} height={100} className="w-44 h-40"></Image>
      <form onSubmit={handleUpdateBlog} className="">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Blog Title</span>
          </label>
          <input
            type="text"
            name="title"
            defaultValue={blog?.title}
            placeholder="title"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Blog Description</span>
          </label>
          <textarea
            type="text"
            defaultValue={blog?.description}
            name="description"
            placeholder="description"
            className="input resize-none p-5 h-40 input-bordered"
          ></textarea>
        </div>
        <div className="form-control mt-6">
          <button className="btn hover:text-[#1E293B] text-white bg-[#1E293B]">
            Add Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
