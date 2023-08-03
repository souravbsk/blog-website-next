'use client'
import React from "react";
import Swal from "sweetalert2";

const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API}`;

const AddBlog = () => {
  const handAddBlog = (e) => {
    e.preventDefault()
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const imageData = form.file.files[0];

    const formData = new FormData();
    formData.append("image",imageData);
    fetch(url,{
      method:"POST",
      body:formData
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.success){
        const newBlog = {
          title,description,blogImage: data?.data?.display_url,
        }

        fetch("https://blog-website-express.vercel.app/blogs",{
          method:"POST",
          headers:{
            'content-type':'application/json',
          },
          body:JSON.stringify(newBlog)
        })
        .then(res => res.json())
        .then(data => {
         if(data.insertedId){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your blog has been added',
            showConfirmButton: false,
            timer: 1500
          })
          form.reset()

         }
        })
      }
    })

    
  }
  return (
    <div className="container">
      <form onSubmit={handAddBlog} className="">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Blog Title</span>
          </label>
          <input
            type="text"
            name="title"
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
            name="description"
            placeholder="description"
            className="input resize-none p-5 h-40 input-bordered"
          ></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Blog Image</span>
          </label>
          <input
            type="file"
            name="file"
            className="file-input file-input-bordered w-full"
          />
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

export default AddBlog;
