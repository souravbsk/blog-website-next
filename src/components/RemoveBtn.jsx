"use client"
import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";
const RemoveBtn = ({id,setReFetch,reFecth}) => {
  const handleBlogDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://blog-website-express.vercel.app/blogs/${id}`,{
          method:"DELETE",
        })
        .then(res => res.json())
        .then(data => {
          if(data.deletedCount > 0){
            setReFetch(!reFecth)
            Swal.fire(
              'Deleted!',
              'Your blog has been deleted.',
              'success'
            )
          }
 
        })


     
      }
    })  }
  return (
    <button onClick={() => handleBlogDelete(id)} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
};

export default RemoveBtn;
