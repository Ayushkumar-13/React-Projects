import React, { useState } from 'react';
import Input from './components/Input';
import TaskItem from './components/TaskItem';
import './App.css';

const App = () => {
  const [taskArr, setTaskArr] = useState([]);
  const [isEditing, setIsEditing] = useState('');

  const addTask = (inputText) => {
    const newTask = {
      id: Date.now(),
      task: inputText,
      completed: false
    };
    setTaskArr([...taskArr, newTask]);
  };

  const deleteTask = (taskId) => {
    setTaskArr(taskArr.filter((ele) => ele.id !== taskId));
  };

  const editTask = (editText, id) => {
    setTaskArr(taskArr.map((ele) => 
      ele.id === id ? { ...ele, task: editText } : ele
    ));
  };

  const toggleCompleted = (id) => {
    setTaskArr(taskArr.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Sticky Header Section */}
        <div className="sticky top-0 z-10 bg-yellow-50">
          <h1 
            className="text-4xl text-gray-600 text-center mb-4 pt-4"
            style={{ fontFamily: 'Permanent Marker, cursive' }}
          >
            To Do List
          </h1>
          <div className="px-2">
            <Input addTask={addTask} />
          </div>
        </div>

        {/* Scrollable Task List */}
        <ul className="bg-white rounded-lg shadow-md divide-y divide-gray-200 mt-4 max-h-[calc(100vh-220px)] overflow-y-auto">
          {taskArr.map((ele) => (
            <TaskItem
              key={ele.id}
              ele={ele}
              deleteTask={deleteTask}
              editTask={editTask}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              toggleCompleted={toggleCompleted}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;