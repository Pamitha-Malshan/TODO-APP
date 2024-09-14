import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

export default function UpdateTodo() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

 
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos[id]) {
      setTodos(savedTodos);
      setTitle(savedTodos[id].title);
      setDescription(savedTodos[id].description);
      setDate(savedTodos[id].date);
    }
  }, [id]);


  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedTodos = [...todos];
    updatedTodos[id] = {
      title,
      description,
      date: new Date().toLocaleDateString(), 
    };

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    navigate("/fetchtodo");
  };

  return (
    <div  style={{
      background: "linear-gradient(to bottom right, #141E30, #243B55)",
    }}>
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-[85vh]">
        <div data-aos="fade-up" className="w-full lg:w-[60%]  xl:w-[40%] px-6 lg:px-20 py-6 lg:py-12 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-[2rem] uppercase text-[#4CAF50] Lexend-Medium">Update Todo</h2>
          <form onSubmit={handleUpdate}>
            <label className="block mb-2 text-left font-bold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 outline-none border border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50] rounded"
            />
            <br />
            <label className="block my-2 text-left font-bold">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 outline-none border border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50] rounded"
            />
            <br />
            <button
              type="submit"
              className="bg-[#4CAF50] text-white py-2 px-4 rounded w-full mt-4 transition-all hover:bg-[#388E3C]"
            >
              Update Todo
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}
