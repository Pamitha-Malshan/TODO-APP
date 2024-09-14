import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const Addtodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date().toLocaleString();

    const newTodo = {
      title,
      description,
      date: currentDate,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    navigate('/fetchtodo')

    setTitle("");
    setDescription("");
  };

  return (
    <div  style={{
      background: "linear-gradient(to bottom right, #141E30, #243B55)",
    }}>
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-[85vh]">
        <div data-aos="fade-up" className="w-full lg:w-[60%] xl:w-[40%] px-5 lg:px-20  py-5 lg:py-12 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8 text-[2rem] uppercase text-[#4CAF50] Lexend-Medium">Add Todo</h1>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="mb-4">
              <label className="block mb-2 text-left font-bold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 border rounded outline-none border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]"
                placeholder="Enter title"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-left  font-bold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-2 border rounded outline-none border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]"
                placeholder="Enter description"
              ></textarea>
            </div>
            <button
              type="submit"
                className="bg-[#4CAF50] text-white py-2 px-4 rounded w-full mt-4 transition-all hover:bg-[#388E3C]"
            >
              Add Todo
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Addtodo;
