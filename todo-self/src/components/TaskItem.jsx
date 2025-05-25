import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TaskItem = ({ ele, deleteTask, editTask, isEditing, setIsEditing, toggleCompleted }) => {
  const [editText, setEditText] = useState(ele.task);
  const textareaRef = useRef(null);

 useEffect(() => {
  if (textareaRef.current && isEditing === ele.id) {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length); // Move cursor to end
  }
}, [isEditing, ele.id]);


  const handleSave = () => {
    if (editText === "") return;
    editTask(editText, ele.id);
    setIsEditing('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="p-4 hover:bg-gray-50 transition-colors duration-200 relative overflow-x-hidden"
    >
      <div className="flex items-start gap-3 min-h-[46px]">
        <input
          type="checkbox"
          checked={ele.completed}
          onChange={() => toggleCompleted(ele.id)}
          className="mt-1 h-4 w-4 flex-shrink-0"
        />

        {isEditing === ele.id ? (
          <div className="flex flex-col w-full gap-2 pr-20">
            <motion.textarea
              ref={textareaRef}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              autoFocus
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-1 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden whitespace-pre-wrap"
              rows={1}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleSave}
              className="self-end px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer text-sm"
            >
              Save
            </motion.button>
          </div>
        ) : (
          <>
            <p
              className={`flex-1 text-gray-800 text-lg pr-35 break-words whitespace-pre-wrap ${ele.completed ? 'line-through opacity-75' : ''
                }`}
            >
              {ele.task}
              <br />
              <span className="text-sm text-gray-500 block mt-1">
                {ele.completed
                  ? `Completed: ${ele.completedAt}`
                  : `Added: ${ele.createdAt}`}
              </span>
            </p>

            <div className="flex gap-2 absolute right-4 top-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                disabled={isEditing !== ''}
                onClick={() => setIsEditing(ele.id)}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-100"
              >
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                disabled={isEditing !== ''}
                onClick={() => deleteTask(ele.id)}
                className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-100"
              >
                Delete
              </motion.button>
            </div>
          </>
        )}
      </div>
    </motion.li>
  );
};

export default TaskItem;
