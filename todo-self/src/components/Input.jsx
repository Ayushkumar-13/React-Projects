import React, { useState } from 'react';

const Input = ({ addTask }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;
    addTask(inputText);
    setInputText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col sm:flex-row gap-2 sm:gap-4">
      <input
        type="text"
        placeholder="Enter Your Task Here"
        value={inputText}
        autoFocus
        onChange={(e) => setInputText(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg sm:w-64"
        style={{ fontFamily: 'Kaushan Script, cursive' }}
      />
      <button
        type="submit"
        className="cursor-pointer px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 font-medium sm:w-32 mt-4 sm:mt-0"
      >
        Add Task
      </button>
    </form>
  );
};

export default Input;
