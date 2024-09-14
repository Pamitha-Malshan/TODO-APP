import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos'; 
import 'aos/dist/aos.css';

export default function FetchTodo() {
  const [todos, setTodos] = useState([]);
  const [expandedIndexes, setExpandedIndexes] = useState(new Set()); 
  const [showCompletedOnly, setShowCompletedOnly] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(''); 

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

 
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

 
  const handleDelete = (index) => {
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

 
  const handleEdit = (index) => {
    navigate(`/updatetodo/${index}`);
  };


  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

 
  const toggleDetails = (index) => {
    const newExpandedIndexes = new Set(expandedIndexes); 
    if (newExpandedIndexes.has(index)) {
      newExpandedIndexes.delete(index); 
    } else {
      newExpandedIndexes.add(index); 
    }
    setExpandedIndexes(newExpandedIndexes);
  };

 
  const handleShowCompletedToggle = () => {
    setShowCompletedOnly(!showCompletedOnly); 
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCompleted = !showCompletedOnly || todo.completed;
    return matchesSearch && matchesCompleted;
  });

  return (
    <div  style={{
      background: "linear-gradient(to bottom right, #141E30, #243B55)",
    }}>
    <div className="container mx-auto pb-20">
      <div className="flex justify-center">
        <div className="w-full xl:w-[60%]">
          <h2 className="text-2xl font-bold mt-12 mb-10 text-[2rem] uppercase text-[#4CAF50] Lexend-Medium">Todo List</h2>

          <div className="lg:flex justify-between mb-6">
            <button
              className={`px-4 py-2 rounded mt-2 mb-4 lg:mb-0 ${
                showCompletedOnly ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'
              }`}
              onClick={handleShowCompletedToggle}
            >
              {showCompletedOnly ? 'Show All Todos' : 'Show Completed Todos'}
            </button>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title..."
              className="px-4 py-2 rounded border border-gray-400 w-[100%] lg:w-[30%] outline-none"
            />
          </div>

          {todos.length === 0 ? (
            <p>No todos added yet.</p>
          ) : (
            <ul>
              {filteredTodos.map((todo, index) => (
                <li
                  key={index}
                
                  className={`mb-4 p-4 border  rounded ${
                    todo.completed ? 'bg-[#82ee82] border-[#4CAF50]' : 'bg-white border-gray-300'
                  }`}
                >
                
                  <h3
                    className={`font-bold cursor-pointer text-left text-[1.7rem] Lexend `}
                    onClick={() => toggleDetails(index)} 
                  >
                    {todo.title}
                  </h3>

                  {expandedIndexes.has(index) && (
                    <>
                      <p className={`text-left Lexend`}>
                        {todo.description}
                      </p>
                     <div className='block lg:flex'>
                     <div className='lg:w-[50%] flex items-center'>
                      <p className="text-sm text-gray-500 text-start">Added on: {todo.date}</p>
                      </div>
                      <div className='lg:w-[50%]'>
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded mt-2 mr-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => toggleComplete(index)}
                        className={`px-4 py-2 rounded mt-2 ${
                          todo.completed
                            ? 'bg-gray-500 text-white'
                            : 'bg-green-500 text-white'
                        }`}
                      >
                        {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                      </button>
                      </div>
                      </div> 
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}