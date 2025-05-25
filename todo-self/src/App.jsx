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
      completed: false,
      createdAt: new Date().toLocaleString(),
      completedAt: null,
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
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toLocaleString() : null,
          }
        : task
    ));
  };

  const pendingTasks = taskArr.filter(task => !task.completed);
  const completedTasks = taskArr.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-yellow-50 p-8">
      <div className="max-w-2xl mx-auto">
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

      <div className="flex flex-col lg:flex-row gap-10 mt-6 lg:mx-10">

  {/* Pending Tasks */}
  <div className="w-full lg:w-1/2">
    <h2 className="text-2xl font-semibold text-blue-700 text-center mb-2">Pending Tasks</h2>
    <ul className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
      {pendingTasks.map((ele) => (
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
      {pendingTasks.length === 0 && (
        <p className="text-gray-500 px-4 py-2">No pending tasks.</p>
      )}
    </ul>
  </div>

  {/* Completed Tasks */}
  <div className="w-full lg:w-1/2">
    <h2 className="text-2xl font-semibold text-green-700 text-center mb-2">Completed Tasks</h2>
    <ul className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
      {completedTasks.map((ele) => (
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
      {completedTasks.length === 0 && (
        <p className="text-gray-500 px-4 py-2">No completed tasks.</p>
      )}
    </ul>
  </div>
</div>


      
      </div>
    </div>
  );
};

export default App;
