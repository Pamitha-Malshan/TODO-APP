import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className='bg-[#27404D] h-[4rem] flex items-center'>
      <div className='container mx-auto'>
        <div className='flex justify-end'>
          <div className='flex gap-5 lg:gap-10'>
            
            <NavLink
              to="/addtodo"
              className={({ isActive }) =>
                isActive ? 'font-bold text-[1rem] lg:text-[1.2rem] Lexend  text-[#6aa18f]' : 'font-bold text-[1rem] lg:text-[1.2rem] Lexend hover:text-[#6aa18f] text-[white]'
              }
            >
              ADD TODO
            </NavLink>
            
            <NavLink
              to="/fetchtodo"
              className={({ isActive }) =>
                isActive ? 'font-bold text-[1rem] lg:text-[1.2rem] Lexend text-[#6aa18f]' : 'font-bold text-[1rem] lg:text-[1.2rem] Lexend hover:text-[#6aa18f] text-[white]'
              }
            >
              VIEW TODO
            </NavLink>

          </div>
        </div>
      </div>
    </div>
  );
}